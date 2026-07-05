"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { cloudinary } from "@/lib/cloudinary";

function revalidatePublicMedia() {
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/destinations");
}

const createMediaSchema = z.object({
  publicId: z.string().min(1),
  kind: z.enum(["IMAGE", "VIDEO"]),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  format: z.string().optional(),
});

export async function createMediaRecord(input: unknown) {
  await requireAdmin();
  const data = createMediaSchema.parse(input);
  await db.media.upsert({
    where: { publicId: data.publicId },
    update: {},
    create: data,
  });
  revalidatePublicMedia();
}

const updateMediaSchema = z.object({
  id: z.string().min(1),
  alt: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  inGallery: z.boolean().optional(),
  destinationId: z.string().nullable().optional(),
});

export async function updateMedia(input: unknown) {
  await requireAdmin();
  const { id, ...fields } = updateMediaSchema.parse(input);
  await db.media.update({ where: { id }, data: fields });
  revalidatePublicMedia();
}

export async function deleteMedia(input: {
  id: string;
  force?: boolean;
}): Promise<{ deleted: boolean; inUseBy?: string[] }> {
  await requireAdmin();
  const { id, force } = z
    .object({ id: z.string().min(1), force: z.boolean().optional() })
    .parse(input);

  const media = await db.media.findUniqueOrThrow({ where: { id } });

  // Post bodies reference media by publicId inside markdown, not by FK.
  const referencingPosts = await db.post.findMany({
    where: { content: { contains: media.publicId } },
    select: { title: true },
  });
  if (referencingPosts.length > 0 && !force) {
    return { deleted: false, inUseBy: referencingPosts.map((p) => p.title) };
  }

  await cloudinary.uploader.destroy(media.publicId, {
    resource_type: media.kind === "VIDEO" ? "video" : "image",
  });
  await db.media.delete({ where: { id } });
  revalidatePublicMedia();
  return { deleted: true };
}
