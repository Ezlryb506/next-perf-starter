'use client'

import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./simple-chart'), {
  ssr: false,
  loading: () => <p>Loading chart…</p>
})

export default function ChartPanel() {
  return <HeavyChart />
}
