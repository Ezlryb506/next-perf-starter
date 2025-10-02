import pg from 'pg'
import fs from 'node:fs/promises'
import { faker } from '@faker-js/faker'
import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' }) // pastikan baca .env.local

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

async function main() {
  // init schema & index
  const initSql = await fs.readFile(new URL('../sql/init.sql', import.meta.url), 'utf8')
  await pool.query(initSql)

  const total = 1000
  console.log('Seeding products…', total)

  for (let i = 0; i < total; i++) {
    const name = faker.commerce.productName() + ' ' + faker.number.int({ min: 1000, max: 9999 })
    await pool.query(
      `INSERT INTO products(name, created_at)
       VALUES ($1, now() - ($2 || ' minutes')::interval)`,
      [name, i]
    )
  }

  console.log('Done.')
  await pool.end()
}

main().catch((e) => { console.error(e); process.exit(1) })
