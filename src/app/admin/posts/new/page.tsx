import type { Metadata } from "next";
import { db } from "@/lib/db";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = {
  title: "New story",
  robots: { index: false },
};

export default async function NewPostPage() {
  const [destinations, media] = await Promise.all([
    db.destination.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    db.media.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, publicId: true, kind: true, alt: true },
    }),
  ]);

  return <PostEditor post={null} destinations={destinations} media={media} />;
}
