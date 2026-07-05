import type { Metadata } from "next";
import { db } from "@/lib/db";
import DestinationManager from "@/components/admin/DestinationManager";

export const metadata: Metadata = {
  title: "Destinations",
  robots: { index: false },
};

export default async function AdminDestinationsPage() {
  const [destinations, media] = await Promise.all([
    db.destination.findMany({
      orderBy: { name: "asc" },
      include: {
        coverMedia: { select: { publicId: true, kind: true, alt: true } },
        _count: { select: { posts: true, media: true } },
      },
    }),
    db.media.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, publicId: true, kind: true, alt: true },
    }),
  ]);

  return <DestinationManager destinations={destinations} media={media} />;
}
