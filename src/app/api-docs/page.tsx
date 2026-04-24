import ApiDocsClient from './api-docs-client'

export const dynamic = 'force-static'

export const metadata = {
  title: 'API Reference — Stumbl Assessment',
  description: 'OpenAPI 3.0 reference for the Stumbl assessment backend.',
}

export default function ApiDocsPage() {
  return <ApiDocsClient />
}
