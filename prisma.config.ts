import { defineConfig } from "prisma/config";

// The Prisma CLI does not load Next.js env files on its own.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // file may not exist yet (e.g. fresh clone before setup)
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Migrations need the direct (unpooled) Neon connection.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
