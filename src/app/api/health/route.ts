import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [System]
 *     summary: Liveness + DB reachability check.
 *     description: Returns `ok` when the process is up and Postgres answers a trivial query. Use this as the pattern for documenting every endpoint you add.
 *     responses:
 *       200:
 *         description: Service healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [status, database]
 *               properties:
 *                 status:   { type: string, example: ok }
 *                 database: { type: string, example: up }
 *                 uptime:   { type: number, example: 12.345 }
 *       503:
 *         description: Database unreachable.
 */
export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`
    return NextResponse.json({
      status: 'ok',
      database: 'up',
      uptime: process.uptime(),
    })
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        database: 'down',
        message: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 503 },
    )
  }
}
