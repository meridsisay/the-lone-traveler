import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CldImage } from "next-cloudinary";
import LogLine from "@/components/site/LogLine";
import PostCard from "@/components/site/PostCard";
import GalleryGrid from "@/components/site/GalleryGrid";
import CldVideo from "@/components/markdown/CldVideo";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export async function generateStaticParams() {
  const destinations = await safeQuery([], () =>
    db.destination.findMany({ select: { slug: true } })
  );
  return destinations.map(({ slug }) => ({ slug }));
}

async function getDestination(slug: string) {
  return safeQuery(null, () =>
    db.destination.findUnique({
      where: { slug },
      include: {
        coverMedia: { select: { publicId: true, alt: true } },
        posts: {
          where: { status: "PUBLISHED" },
          orderBy: { publishedAt: "desc" },
          include: {
            coverMedia: { select: { publicId: true, alt: true } },
            destination: { select: { name: true, country: true } },
          },
        },
        media: { orderBy: { createdAt: "desc" } },
      },
    })
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) return {};
  return {
    title: destination.name,
    description: destination.summary ?? undefined,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) notFound();

  const photos = destination.media.filter((m) => m.kind === "IMAGE");
  const films = destination.media.filter((m) => m.kind === "VIDEO");

  return (
    <div>
      <header className="relative flex min-h-[60svh] flex-col justify-end">
        {destination.coverMedia && (
          <div className="absolute inset-0 -z-10">
            <CldImage
              src={destination.coverMedia.publicId}
              alt={destination.coverMedia.alt ?? destination.name}
              fill
              priority
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/20" />
          </div>
        )}
        <div className="mx-auto w-full max-w-6xl px-6 pt-36 pb-16">
          <LogLine parts={["Destination", destination.country]} />
          <h1 className="mt-5 font-display text-5xl font-extralight sm:text-6xl">
            {destination.name}
          </h1>
          {destination.summary && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-haze">
              {destination.summary}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        {destination.posts.length > 0 && (
          <section className="pt-16">
            <h2 className="instrument text-haze">Stories</h2>
            <div className="mt-6 divide-y divide-hairline border-t border-hairline">
              {destination.posts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </section>
        )}

        {photos.length > 0 && (
          <section className="pt-16">
            <h2 className="instrument text-haze">Photographs</h2>
            <div className="mt-6">
              <GalleryGrid items={photos} />
            </div>
          </section>
        )}

        {films.length > 0 && (
          <section className="pt-16">
            <h2 className="instrument text-haze">Films</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {films.map((film) => (
                <figure key={film.id}>
                  <CldVideo publicId={film.publicId} />
                  {film.caption && (
                    <figcaption className="instrument mt-3 text-haze">
                      {film.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {destination.posts.length === 0 && destination.media.length === 0 && (
          <div className="mt-16 border-t border-hairline pt-16 text-center">
            <p className="font-display text-2xl font-extralight italic">
              Nothing logged from here yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
