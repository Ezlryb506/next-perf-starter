import { getProductsPage } from '@/lib/data'
import ProductsClient from './products-client'

type Props = {
  searchParams?: { q?: string; cursor?: string }
}

export const revalidate = 30

export default async function ProductsPage({ searchParams }: Props) {
  const q = searchParams?.q ?? ''
  const cursor = searchParams?.cursor ?? null
  const page = await getProductsPage({ q, cursor, limit: 20 })

  return (
    <section className="card">
      <h2 className="text-lg font-semibold">Products</h2>
      <p className="text-sm opacity-70">Server-rendered list with keyset pagination. Search is client-side debounced.</p>
      <ProductsClient initialQuery={q} page={page} />
    </section>
  )
}
