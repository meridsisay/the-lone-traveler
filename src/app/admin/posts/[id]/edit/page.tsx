import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = {
  title: "Edit story",
  robots: { index: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, destinations, media] = await Promise.all([
    db.post.findUnique({
      where: { id },
      include: {
        coverMedia: { select: { publicId: true, kind: true, alt: true } },
      },
    }),
    db.destination.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    db.media.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, publicId: true, kind: true, alt: true },
    }),
  ]);

  if (!post) notFound();

  return <PostEditor post={post} destinations={destinations} media={media} />;
}
