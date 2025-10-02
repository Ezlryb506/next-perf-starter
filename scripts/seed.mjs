import pg from 'pg'
import { faker } from 'https://esm.sh/@faker-js/faker@8.4.1'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

async function main() {
  await pool.query(await (await fetch(new URL('../sql/init.sql', import.meta.url))).text())

  const total = 1000
  console.log('Seeding products…', total)
  for (let i=0;i<total;i++) {
    const name = faker.commerce.productName() + ' ' + faker.number.int({min:1000, max:9999})
    await pool.query('INSERT INTO products(name, created_at) VALUES ($1, now() - ($2 || ' minutes')::interval)', [name, i])
  }
  console.log('Done.')
  await pool.end()
}

main().catch((e)=>{ console.error(e); process.exit(1) })
