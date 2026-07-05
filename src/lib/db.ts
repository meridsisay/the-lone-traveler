import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Neon's driver speaks WebSocket; Node needs an implementation supplied.
neonConfig.webSocketConstructor = ws;

function createClient() {
  return new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createClient>;
};

export const db = globalForPrisma.prisma ?? createClient();

// Reuse one client across dev hot reloads so Neon connections don't pile up.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
