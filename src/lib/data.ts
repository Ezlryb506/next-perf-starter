import { query } from './db'

export type Product = {
  id: number
  name: string
  created_at: string
}

export async function getProductsPage({ q, cursor, limit = 20 }:{ q: string; cursor: string|null; limit?: number }) {
  const params: Array<string | number | Date> = []
  let where = ''
  if (q) {
    params.push(`%${q}%`)
    where += ` AND name ILIKE $${params.length} `
  }

  const cursorClause = (() => {
    if (!cursor) return ''
    const tokens = parseCursor(cursor)
    if (!tokens) return ''
    params.push(tokens.createdAt, tokens.id)
    return ` AND (created_at, id) < ($${params.length-1}, $${params.length}) `
  })()

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
  const lastRow: Product | null = rows.length > 0 ? rows[rows.length - 1] ?? null : null
  const nextCursor = lastRow ? `${new Date(lastRow.created_at).toISOString()}_${lastRow.id}` : null

  // For total (rough), avoid COUNT(*) over entire table if q is empty on large tables in real systems;
  // Here it's fine for demo.
  const totalResult = await query<{ count: number }>(
    `SELECT COUNT(*)::int AS count FROM products ${q ? 'WHERE name ILIKE $1' : ''}`,
    q ? [`%${q}%`] : []
  )
  const total = totalResult.rows[0]?.count ?? 0

  return { items: rows, nextCursor, total }
}

type ParsedCursor = { createdAt: Date; id: number }

function parseCursor(raw: string): ParsedCursor | null {
  const parts = raw.split('_')
  if (parts.length !== 2) return null
  const [createdAtRaw, idRaw] = parts
  if (!createdAtRaw || !idRaw) return null

  // Validate createdAtRaw is not empty before creating Date
  if (!createdAtRaw.trim()) return null
  const createdAt = new Date(createdAtRaw)
  const id = Number(idRaw)
  if (Number.isNaN(createdAt.getTime()) || Number.isNaN(id)) return null
  return { createdAt, id }
}
