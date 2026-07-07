"use client";

import { useState } from "react";
import { CldImage, getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import Lightbox, { type Slide } from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export type GalleryItem = {
  id: string;
  publicId: string;
  kind: "IMAGE" | "VIDEO";
  width: number;
  height: number;
  alt: string | null;
  caption: string | null;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const slides: Slide[] = items.map((item) =>
    item.kind === "VIDEO"
      ? {
          type: "video",
          width: item.width,
          height: item.height,
          poster: getCldImageUrl({
            src: item.publicId,
            assetType: "video",
            format: "jpg",
            width: 1280,
          }),
          sources: [
            {
              src: getCldVideoUrl({ src: item.publicId, width: 1920 }),
              type: "video/mp4",
            },
          ],
          description: item.caption ?? undefined,
        }
      : {
          src: getCldImageUrl({ src: item.publicId, width: 2000 }),
          width: item.width,
          height: item.height,
          alt: item.alt ?? undefined,
          description: item.caption ?? undefined,
        }
  );

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 [&>*]:mb-3">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative block w-full break-inside-avoid transition-opacity hover:opacity-85"
            aria-label={item.alt ?? "Open in lightbox"}
          >
            <CldImage
              src={item.publicId}
              alt={item.alt ?? ""}
              width={640}
              height={Math.round((640 * item.height) / item.width) || 480}
              crop="limit"
              quality="auto"
              format="auto"
              assetType={item.kind === "VIDEO" ? "video" : "image"}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-auto w-full"
            />
            {item.kind === "VIDEO" && (
              <span className="instrument absolute bottom-2 left-2 bg-ink/80 px-2 py-1 text-sunny">
                Film
              </span>
            )}
          </button>
        ))}
      </div>
      <Lightbox
        open={openIndex !== null}
        index={openIndex ?? 0}
        close={() => setOpenIndex(null)}
        slides={slides}
        plugins={[Video, Captions]}
        styles={{
          container: { backgroundColor: "rgb(15 23 34 / 0.97)" },
        }}
      />
    </>
  );
}
