import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const getDatabaseUrl = () => {
  const databaseUrl =
    process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL no está configurada. Añádela en Vercel Project Settings > Environment Variables."
    );
  }

  try {
    return new URL(databaseUrl);
  } catch {
    throw new Error(
      "DATABASE_URL no es una URL PostgreSQL válida. Revisa el valor configurado en Vercel."
    );
  }
};

const buildConnectionString = (url: URL) => {
  const cleanUrl =
    new URL(url.toString());

  cleanUrl.searchParams.delete("sslmode");
  cleanUrl.searchParams.delete("pgbouncer");

  return cleanUrl.toString();
};

const globalForPrisma =
  globalThis as unknown as {
    prisma?: PrismaClient;
    prismaPool?: Pool;
  };

const createPrismaClient = () => {
  const databaseUrl =
    getDatabaseUrl();

  const isPgBouncer =
    databaseUrl.searchParams.get("pgbouncer") === "true" ||
    databaseUrl.port === "6543";

  const pool =
    globalForPrisma.prismaPool ??
    new Pool({
      connectionString:
        buildConnectionString(databaseUrl),
      ssl: {
        rejectUnauthorized: false,
      },
      max: isPgBouncer ? 1 : 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });

  globalForPrisma.prismaPool = pool;

  return new PrismaClient({
    adapter: new PrismaPg(pool),
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });
};

export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient();

globalForPrisma.prisma = prisma;
