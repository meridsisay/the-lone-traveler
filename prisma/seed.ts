import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const iceland = await prisma.destination.upsert({
    where: { slug: "iceland" },
    update: {},
    create: {
      slug: "iceland",
      name: "Iceland",
      country: "Iceland",
      summary:
        "Black sand, white steam, and weather that changes its mind every hour.",
    },
  });

  await prisma.post.upsert({
    where: { slug: "first-light-in-iceland" },
    update: {},
    create: {
      slug: "first-light-in-iceland",
      title: "First light in Iceland",
      excerpt: "A draft entry to test the journal end to end.",
      content:
        "The wind met me before the country did.\n\nThis is a **draft** seeded for development. Replace it with a real story.",
      status: "DRAFT",
      destinationId: iceland.id,
    },
  });

  console.log("Seeded: 1 destination, 1 draft post");
}

main().finally(() => prisma.$disconnect());
