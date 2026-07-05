import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, destinations] = await Promise.all([
    safeQuery([], () =>
      db.post.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      })
    ),
    safeQuery([], () =>
      db.destination.findMany({ select: { slug: true, updatedAt: true } })
    ),
  ]);

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/stories`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gallery`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/destinations`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.5 },
    ...posts.map((p) => ({
      url: `${base}/stories/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.7,
    })),
    ...destinations.map((d) => ({
      url: `${base}/destinations/${d.slug}`,
      lastModified: d.updatedAt,
      priority: 0.6,
    })),
  ];
}
