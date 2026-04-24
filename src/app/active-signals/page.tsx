import { signals } from '@/lib/data/signals'

export const metadata = {
  title: 'Active Signals — Stumbl',
  description:
    'Browse signals from the Stumbl community — support requested, support offered, and general updates.',
}

export default function ActiveSignalsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Active Signals
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start building the feed here. This page currently lists{' '}
          {signals.length} placeholder signal{signals.length === 1 ? '' : 's'}{' '}
          from <code className="rounded bg-muted px-1 py-0.5 text-xs">
            src/lib/data/signals.ts
          </code>
          .
        </p>
      </header>

      <ul className="space-y-3">
        {signals.map((signal) => (
          <li
            key={signal.id}
            className="rounded-md border border-border bg-card p-4 text-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{signal.title}</span>
              <span className="text-xs text-muted-foreground">
                {signal.type}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{signal.description}</p>
          </li>
        ))}
      </ul>

      <footer className="mt-10 rounded-md border border-dashed border-border p-4 text-xs text-muted-foreground">
        <strong>Your job:</strong> replace this placeholder with a proper feed
        — signal cards, type filter, search, empty state, responsive layout.
        Full brief in{' '}
        <code className="rounded bg-muted px-1 py-0.5">Docs/ASSESSMENT.md</code>.
      </footer>
    </main>
  )
}
