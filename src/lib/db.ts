import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('Missing DATABASE_URL')
}

// Keep pool small and efficient for local dev
export const db = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 5_000
})

// Tiny helper
db.on('error', (err) => {
  console.error('PG Pool Error', err)
})

export async function query<T = any>(text: string, params: any[] = []) {
  const start = Date.now()
  const res = await db.query(text, params)
  const dur = Date.now() - start
  if (dur > 50) {
    console.warn(`[slow-query ${dur}ms] ${text}`)
  }
  return res as unknown as { rows: T[] }
}
