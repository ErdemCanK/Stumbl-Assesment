import { PrismaClient } from '@prisma/client'

// Singleton Prisma client for Next.js dev mode (HMR would otherwise create
// many connections). Candidates can import `db` from anywhere in /src.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
