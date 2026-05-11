import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const rawUrl = process.env.DATABASE_URL ?? "";
const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, "").replace(/[?&]pgbouncer=[^&]*/g, "");
const url = new URL(rawUrl);
const pgbouncer = url.searchParams.get("pgbouncer") === "true";
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  ...pgbouncer && { max: 1 }
  // PgBouncer requiere max: 1 en modo transaction
});
const adapter = new PrismaPg(pool);
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma as p };
