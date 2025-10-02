'use client'

import { useDebouncedValue } from '@/components/use-debounced'
import { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProductsClient({ initialQuery, page }: { initialQuery: string; page: any }) {
  const [q, setQ] = useState(initialQuery)
  const dq = useDebouncedValue(q, 300)
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const currentQ = params.get('q') ?? ''
    if (currentQ === dq) return
    const next = new URLSearchParams(params.toString())
    if (dq) next.set('q', dq); else next.delete('q')
    next.delete('cursor')
    startTransition(() => router.replace(`/products?${next.toString()}`))
  }, [dq, params, router])

  const nextHref = (() => {
    const nextCursor = page?.nextCursor as string | null | undefined
    if (!nextCursor) return null
    const sp = new URLSearchParams()
    if (dq) sp.set('q', dq)
    sp.set('cursor', nextCursor)
    return `/products?${sp.toString()}`
  })()

  return (
    <div className="mt-4">
      <input className="input mb-3" placeholder="Search name..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="text-sm opacity-60 mb-2">{isPending ? 'Loading...' : page.total} results</div>
      <ul className="divide-y divide-neutral-800 rounded-xl border border-neutral-800 overflow-hidden">
        {page.items.map((p: any) => (
          <li key={p.id} className="p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs opacity-60">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'UTC' }).format(new Date(p.created_at))}</div>
            </div>
            <span className="text-sm opacity-80">#{p.id}</span>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-3">
        {nextHref ? (
          <a className="btn" href={nextHref}>
            Next Page -
          </a>
        ) : (
          <button className="btn opacity-50 cursor-not-allowed" disabled>
            No more results
          </button>
        )}
      </div>
    </div>
  )
}
