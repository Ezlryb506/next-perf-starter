import dynamic from 'next/dynamic'
const HeavyChart = dynamic(() => import('./simple-chart'), { ssr: false, loading: () => <p>Loading chart…</p> })

export default function MetricsPage() {
  return (
    <section className="card">
      <h2 className="text-lg font-semibold">Metrics (client-only demo)</h2>
      <p className="text-sm opacity-70 mb-3">This chart is code-split and loaded only on this route.</p>
      <HeavyChart />
    </section>
  )
}
