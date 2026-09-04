import { PrismaClient } from '@prisma/client';

// Singleton PrismaClient pour éviter de multiplier les connexions en dev
// (hot-reload Next.js ré-exécute les modules).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}