import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next Perf Starter',
  description: 'Minimal performance-focused Next.js + Postgres starter'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Next Perf Starter</h1>
            <nav className="text-sm opacity-80">
              <a className="mr-4 link" href="/">Home</a>
              <a className="mr-4 link" href="/products">Products</a>
              <a className="link" href="/metrics">Metrics</a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
