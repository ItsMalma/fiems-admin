import { PrismaClient } from "@prisma/client";

// Singleton function to create prisma client
function createPrismaClient() {
  return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientSingleton;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
