import { createSwaggerSpec } from 'next-swagger-doc'

/**
 * Generates the OpenAPI 3.0 spec by scanning JSDoc `@swagger` blocks
 * inside `src/app/api/**`. Candidates should document every endpoint
 * they add with a `@swagger` block above the handler.
 *
 * The spec is served at `GET /api/docs` (JSON) and rendered as
 * Swagger UI at `/api-docs`.
 */
export function getApiSpec() {
  return createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Stumbl Assessment API',
        version: '0.1.0',
        description:
          'REST API for the Stumbl trainee take-home. Candidates extend this with signals, decisions, referral-contacts, and referrals endpoints.',
      },
      servers: [{ url: '/api', description: 'Local dev' }],
      tags: [
        { name: 'System', description: 'Health and meta routes' },
        { name: 'Signals', description: 'Swipeable signal deck' },
        { name: 'Decisions', description: 'Pass / Match actions' },
        { name: 'Referrals', description: 'Network / Refer flow' },
      ],
    },
  })
}
