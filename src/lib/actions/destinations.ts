"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

function revalidateDestinationPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/destinations");
  if (slug) revalidatePath(`/destinations/${slug}`);
}

const destinationSchema = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and dashes"),
  country: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  coverMediaId: z.string().nullable().optional(),
});

export async function createDestination(input: unknown) {
  await requireAdmin();
  const data = destinationSchema.parse(input);
  await db.destination.create({ data });
  revalidateDestinationPages(data.slug);
}

export async function updateDestination(input: unknown) {
  await requireAdmin();
  const { id, ...data } = destinationSchema
    .extend({ id: z.string().min(1) })
    .parse(input);
  const before = await db.destination.findUniqueOrThrow({ where: { id } });
  await db.destination.update({ where: { id }, data });
  revalidateDestinationPages(before.slug);
  revalidateDestinationPages(data.slug);
}

export async function deleteDestination(input: { id: string }) {
  await requireAdmin();
  const { id } = z.object({ id: z.string().min(1) }).parse(input);
  const destination = await db.destination.delete({ where: { id } });
  revalidateDestinationPages(destination.slug);
}
