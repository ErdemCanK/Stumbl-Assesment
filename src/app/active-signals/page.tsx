import { signals } from '@/lib/data/signals'

export const metadata = {
  title: 'Active Signals — Stumbl',
  description:
    'Swipe through signals from the Stumbl community — pass, match, or refer to your network.',
}

export default function ActiveSignalsPage() {
  const first = signals[0]

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center px-4 py-8">
      <section className="w-full rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
          <span>Signal 1 / {signals.length}</span>
          <span aria-hidden>↺</span>
        </div>

        <div className="mb-4 h-0.5 w-full rounded bg-muted">
          <div className="h-0.5 w-1/3 rounded bg-primary" />
        </div>

        <header className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold">{first.author.displayName}</p>
              <p className="text-xs text-muted-foreground">
                📍 {first.location}  🕒{' '}
                {new Date(first.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
            <span className="rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
              {first.category}
            </span>
          </div>
          <span className="mt-3 inline-block rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
            ⚠ {first.priority.charAt(0) + first.priority.slice(1).toLowerCase()}
          </span>
        </header>

        <p className="mb-4 whitespace-pre-line text-sm leading-relaxed">
          {first.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {first.interests.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-8">
          {(['Pass', 'Network / Refer', 'Match'] as const).map((label) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background">
                •
              </div>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-4 text-xs text-muted-foreground">
        Swipe or tap buttons to take action
      </p>
      <p className="text-xs text-muted-foreground">
        ← Pass • → Match • ↓ Network / Refer
      </p>

      <footer className="mt-10 w-full rounded-md border border-dashed border-border p-4 text-xs text-muted-foreground">
        <strong>Your job:</strong> turn this static placeholder into a real
        swipeable deck with working Pass / Match / Network-Refer actions, a
        working Network/Refer modal, keyboard support, and a proper
        end-of-deck state. Full brief in{' '}
        <code className="rounded bg-muted px-1 py-0.5">Docs/ASSESSMENT.md</code>.
      </footer>
    </main>
  )
}
