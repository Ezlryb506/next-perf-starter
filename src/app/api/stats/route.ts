import { db } from '@/lib/db'

export const revalidate = 30

export async function GET() {
  const res = await db.query('SELECT COUNT(*)::int AS count FROM products', [])
  return Response.json({ products: res.rows[0].count })
}
