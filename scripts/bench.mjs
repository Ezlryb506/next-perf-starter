import autocannon from 'autocannon'

const url = process.env.BENCH_URL || 'http://localhost:3000/api/health'
console.log('Benchmarking', url)

autocannon({
  url,
  connections: 50,
  duration: 10,
  pipelining: 1
}, (err, res) => {
  if (err) { console.error(err); process.exit(1) }
  console.log('p95 latency (ms):', res.latency.p95)
  console.log('throughput (req/s):', res.requests.throughput)
})
