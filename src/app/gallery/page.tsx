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
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-24">
      <p className="instrument text-lowsun">Gallery</p>
      <h1 className="mt-5 font-display text-4xl font-extralight sm:text-5xl">
        Light, collected
      </h1>
      {items.length === 0 ? (
        <div className="mt-16 border-t border-hairline pt-16 text-center">
          <p className="font-display text-2xl font-extralight italic">
            The gallery is still empty.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-haze">
            Photographs and films will land here after the first upload.
          </p>
        </div>
      ) : (
        <div className="mt-12">
          <GalleryGrid items={items} />
        </div>
      )}
    </div>
  );
}
