import type { Metadata } from "next";
import GalleryGrid from "@/components/site/GalleryGrid";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs and films from the road.",
};

export default async function GalleryPage() {
  const items = await safeQuery([], () =>
    db.media.findMany({
      where: { inGallery: true },
      orderBy: { createdAt: "desc" },
    })
  );

  return (
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-24">
      <p className="instrument text-poppy">Gallery</p>
      <h1 className="mt-4 font-punch text-5xl font-extrabold tracking-tight sm:text-6xl">
        Light, collected
      </h1>
      {items.length === 0 ? (
        <p className="mt-14 font-reader text-xl italic text-inksoft">
          The gallery is still empty — photographs and films land here after
          the first upload.
        </p>
      ) : (
        <div className="mt-12">
          <GalleryGrid items={items} />
        </div>
      )}
    </div>
  );
}
