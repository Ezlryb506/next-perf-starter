import { query } from './db'

export type Product = {
  id: number
  name: string
  created_at: string
}

export async function getProductsPage({ q, cursor, limit = 20 }:{ q: string; cursor: string|null; limit?: number }) {
  const params: any[] = []
  let where = ''
  if (q) {
    params.push(`%${q}%`)
    where += ` AND name ILIKE $${params.length} `
  }
  let cursorClause = ''
  if (cursor) {
    const [createdAt, id] = cursor.split('_')
    params.push(createdAt, Number(id))
    cursorClause = ` AND (created_at, id) < ($${params.length-1}, $${params.length}) `
  }
  params.push(limit)
  const sql = `
    SELECT id, name, created_at
    FROM products
    WHERE 1=1
      ${where}
      ${cursorClause}
    ORDER BY created_at DESC, id DESC
    LIMIT $${params.length};
  `
  const rows = (await query<Product>(sql, params)).rows

  // next cursor
  const nextCursor = rows.length
    ? `${rows[rows.length-1].created_at}_${rows[rows.length-1].id}`
    : null

  // For total (rough), avoid COUNT(*) over entire table if q is empty on large tables in real systems;
  // Here it's fine for demo.
  const total = (await query<{ count: number }>(
    `SELECT COUNT(*)::int AS count FROM products ${q ? 'WHERE name ILIKE $1' : ''}`,
    q ? [`%${q}%`] : []
  )).rows[0].count

  return { items: rows, nextCursor, total }
}
