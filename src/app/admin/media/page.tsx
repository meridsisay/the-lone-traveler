import type { Metadata } from "next";
import { db } from "@/lib/db";
import MediaLibrary from "@/components/admin/MediaLibrary";

export const metadata: Metadata = {
  title: "Media",
  robots: { index: false },
};

export default async function AdminMediaPage() {
  const [media, destinations] = await Promise.all([
    db.media.findMany({ orderBy: { createdAt: "desc" } }),
    db.destination.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return <MediaLibrary media={media} destinations={destinations} />;
}
