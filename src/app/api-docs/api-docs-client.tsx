'use client'

import { useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function ApiDocsClient() {
  const [spec, setSpec] = useState<object | null>(null)

  useEffect(() => {
    fetch('/api/docs')
      .then((r) => r.json())
      .then(setSpec)
      .catch(() => setSpec({ error: 'Failed to load /api/docs' }))
  }, [])

  if (!spec) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted-foreground">
        Loading API reference…
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <SwaggerUI spec={spec} />
    </main>
  )
}
