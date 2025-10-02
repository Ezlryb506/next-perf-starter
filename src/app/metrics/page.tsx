import ChartPanel from './chart-panel'

export default function MetricsPage() {
  return (
    <section className="card">
      <h2 className="text-lg font-semibold">Metrics (client-only demo)</h2>
      <p className="text-sm opacity-70 mb-3">This chart is code-split and loaded only on this route.</p>
      <ChartPanel />
    </section>
  )
}
