export const revalidate = 60

export default async function Home() {
  return (
    <section className="card">
      <h2 className="text-lg font-semibold mb-2">Welcome</h2>
      <p className="opacity-80">
        This minimal template shows practical performance patterns: Server Components,
        cached route handlers, keyset pagination, debounced search, dynamic import for heavy UI,
        and a tiny API you can load test.
      </p>
      <ul className="list-disc ml-6 mt-3 opacity-80">
        <li>LCP friendly layout (server-rendered)</li>
        <li>Small client bundle per route</li>
        <li>Postgres + indexed queries</li>
      </ul>
    </section>
  )
}
