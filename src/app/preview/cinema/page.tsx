import type { Metadata } from "next";
import Link from "next/link";
import { CldImage } from "@/components/cld";
import CinemaReel from "@/components/site/CinemaReel";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Preview · Cinema",
  robots: { index: false },
};

export default async function CinemaPreview() {
  const [media, hero] = await Promise.all([
    safeQuery([], () =>
      db.media.findMany({
        where: { inGallery: true },
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { destination: { select: { name: true } } },
      })
    ),
    safeQuery(null, () =>
      db.post.findFirst({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        select: { slug: true, title: true, excerpt: true },
      })
    ),
  ]);

  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const frameCount = media.length + (hero ? 1 : 0) + 2;

  return (
    <CinemaReel>
      {/* Title card */}
      <section className="cinema-frame flex flex-col items-center justify-center bg-night px-6 text-center">
        <p className="instrument text-lowsun">A field log in frames</p>
        <h1 className="mt-6 font-display text-6xl font-extralight sm:text-8xl">
          The Lone
          <br />
          Traveler
        </h1>
        <p className="instrument mt-16 animate-pulse text-haze">
          Scroll → · frame 1 / {frameCount}
        </p>
      </section>

      {/* One frame per photograph or film */}
      {media.map((m, i) => (
        <section key={m.id} className="cinema-frame bg-night">
          {m.kind === "VIDEO" ? (
            <video
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              poster={`https://res.cloudinary.com/${cloud}/video/upload/q_auto,f_jpg,so_0/${m.publicId}.jpg`}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src={`https://res.cloudinary.com/${cloud}/video/upload/q_auto/${m.publicId}.mp4`}
                type="video/mp4"
              />
            </video>
          ) : (
            <CldImage
              src={m.publicId}
              alt={m.alt ?? ""}
              fill
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent px-8 pt-24 pb-8">
            <p className="instrument log-line text-moonstone">
              {[
                m.caption ?? m.alt,
                m.destination?.name,
                `frame ${i + 2} / ${frameCount}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </section>
      ))}

      {/* Latest story interleaved as a text card */}
      {hero && (
        <section className="cinema-frame flex flex-col items-center justify-center bg-fathom px-6 text-center">
          <p className="instrument text-lowsun">Latest entry</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-extralight leading-tight sm:text-6xl">
            {hero.title}
          </h2>
          {hero.excerpt && (
            <p className="mt-6 max-w-md leading-relaxed text-haze">
              {hero.excerpt}
            </p>
          )}
          <Link
            href={`/stories/${hero.slug}`}
            className="instrument mt-10 border border-hairline px-6 py-3 text-moonstone transition-colors hover:border-lowsun hover:text-lowsun"
          >
            Read the story
          </Link>
        </section>
      )}

      {/* End card */}
      <section className="cinema-frame flex flex-col items-center justify-center bg-night px-6 text-center">
        <p className="font-display text-4xl font-extralight italic text-haze">
          More frames coming.
        </p>
        <div className="mt-10 flex gap-8">
          <Link
            href="/stories"
            className="instrument text-haze transition-colors hover:text-lowsun"
          >
            Stories
          </Link>
          <Link
            href="/destinations"
            className="instrument text-haze transition-colors hover:text-lowsun"
          >
            Destinations
          </Link>
        </div>
      </section>
    </CinemaReel>
  );
}
