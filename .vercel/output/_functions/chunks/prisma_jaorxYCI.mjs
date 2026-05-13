import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const getDatabaseUrl = () => {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    console.error("[prisma] DATABASE_URL no configurada");
    return null;
  }
  try {
    return new URL(databaseUrl);
  } catch {
    console.error("[prisma] DATABASE_URL no es una URL válida");
    return null;
  }
};
const buildConnectionString = (url) => {
  const cleanUrl = new URL(url.toString());
  cleanUrl.searchParams.delete("sslmode");
  cleanUrl.searchParams.delete("pgbouncer");
  return cleanUrl.toString();
};
const globalForPrisma = globalThis;
const createPrismaClient = () => {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    throw new Error("No se puede inicializar Prisma: DATABASE_URL inválida o ausente");
  }
  const isPgBouncer = databaseUrl.searchParams.get("pgbouncer") === "true" || databaseUrl.port === "6543";
  const pool = globalForPrisma.prismaPool ?? new Pool({
    connectionString: buildConnectionString(databaseUrl),
    ssl: { rejectUnauthorized: false },
    max: isPgBouncer ? 1 : 5,
    idleTimeoutMillis: 1e4,
    connectionTimeoutMillis: 1e4
  });
  globalForPrisma.prismaPool = pool;
  return new PrismaClient({
    adapter: new PrismaPg(pool),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });
};
let prismaClient = null;
try {
  prismaClient = globalForPrisma.prisma ?? createPrismaClient();
  globalForPrisma.prisma = prismaClient;
  console.log("[prisma] Cliente inicializado correctamente");
} catch (error) {
  console.error("[prisma] Error al inicializar PrismaClient:", error);
}
const prisma = prismaClient;

export { prisma as p };
