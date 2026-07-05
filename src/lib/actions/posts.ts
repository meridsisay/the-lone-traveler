"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

async function revalidatePostPages(postId: string) {
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { slug: true, destination: { select: { slug: true } } },
  });
  revalidatePath("/");
  revalidatePath("/stories");
  if (post) {
    revalidatePath(`/stories/${post.slug}`);
    if (post.destination) revalidatePath(`/destinations/${post.destination.slug}`);
  }
}

const postSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and dashes"),
  excerpt: z.string().nullable().optional(),
  content: z.string(),
  destinationId: z.string().nullable().optional(),
  coverMediaId: z.string().nullable().optional(),
});

export async function createPost(input: unknown): Promise<{ id: string }> {
  await requireAdmin();
  const data = postSchema.parse(input);
  const post = await db.post.create({ data });
  await revalidatePostPages(post.id);
  return { id: post.id };
}

export async function updatePost(input: unknown) {
  await requireAdmin();
  const { id, ...data } = postSchema.extend({ id: z.string().min(1) }).parse(input);
  await revalidatePostPages(id); // old slug/destination
  await db.post.update({ where: { id }, data });
  await revalidatePostPages(id); // new slug/destination
}

export async function publishPost(input: { id: string }) {
  await requireAdmin();
  const { id } = z.object({ id: z.string().min(1) }).parse(input);
  const post = await db.post.findUniqueOrThrow({ where: { id } });
  await db.post.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: post.publishedAt ?? new Date(),
    },
  });
  await revalidatePostPages(id);
}

export async function unpublishPost(input: { id: string }) {
  await requireAdmin();
  const { id } = z.object({ id: z.string().min(1) }).parse(input);
  await db.post.update({ where: { id }, data: { status: "DRAFT" } });
  await revalidatePostPages(id);
}

export async function deletePost(input: { id: string }) {
  await requireAdmin();
  const { id } = z.object({ id: z.string().min(1) }).parse(input);
  await revalidatePostPages(id);
  await db.post.delete({ where: { id } });
}
