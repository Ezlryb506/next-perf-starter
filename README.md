# Next Perf Starter (Next.js + Postgres + TS)

Fokus ke **performance fundamentals**: Server Components, keyset pagination, cached API routes, code-splitting, dan tooling untuk mengukur.

## 🚀 Quick start

```bash
# 1) Clone unzip project, masuk folder
cp .env.example .env.local

# 2) Jalankan Postgres lokal (Docker)
docker compose up -d

# 3) Install deps
npm i

# 4) Init DB + seed data
npm run seed

# 5) Dev
npm run dev
# buka http://localhost:3000
```

## 🔧 Environment
- `DATABASE_URL=postgres://postgres:postgres@localhost:5432/next_perf` (lihat `.env.example`)

## 📦 Struktur
- `src/app/*` — App Router (Server Components default)
- `src/lib/db.ts` — Pool `pg` koneksi database
- `src/lib/data.ts` — Query dengan **keyset pagination**
- `src/app/api/*` — Route Handlers (cached via `export const revalidate`)
- `sql/init.sql` — schema + index
- `scripts/seed.mjs` — seed contoh data
- `scripts/bench.mjs` — load test kecil via `autocannon`

## 🧪 Ukur Performa
- **Lighthouse/Chrome** untuk LCP/INP.
- **Bundle analyze** per route:
  ```bash
  npm run analyze
  ```
- **API p95** cepat:
  ```bash
  npm run bench
  BENCH_URL=http://localhost:3000/api/stats npm run bench
  ```
- **EXPLAIN ANALYZE** untuk query (lihat `sql/sample_explain.sql`).

## 🧱 Pola Penting
- **Server Components** untuk daftar produk (minim JS di klien).
- **Keyset pagination** (berbasis `(created_at, id)`), bukan `OFFSET` besar.
- **Caching** via `export const revalidate` pada page & route handler.
- **Dynamic import** untuk UI berat (lihat `/metrics`).

## 🎨 UI (shadcn/Radix opsional)
Proyek ini pakai util CSS sederhana (`btn`, `input`, dst). Kalau mau **shadcn/ui**:
```bash
# Inisialisasi shadcn
npx shadcn@latest init

# Pilih Tailwind (sudah siap), lalu generate komponen:
npx shadcn@latest add button input card
```
Setelah itu, ganti import `Button` dengan komponen shadcn dari `@/components/ui/*`.

## ✅ Checklist "Definition of Done"
- LCP < 2.5s, INP < 200ms (simulasi 4G)
- p95 API < 150–200ms; error rate < 1%
- Tidak ada query tanpa index (cek `EXPLAIN`)
- Bundle per route < 120KB gz
- Keyset pagination; tidak ada N+1

---

Happy shipping! ✨
