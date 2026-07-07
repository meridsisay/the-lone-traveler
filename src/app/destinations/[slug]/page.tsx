import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LogLine from "@/components/site/LogLine";
import PostCard from "@/components/site/PostCard";
import GalleryGrid from "@/components/site/GalleryGrid";
import CldVideo from "@/components/markdown/CldVideo";
import Stamp from "@/components/site/Stamp";
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

function formatCoords(lat: number | null, lon: number | null) {
  if (lat == null || lon == null) return null;
  return `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"} ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`;
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
    <div className="pb-24">
      <header className="mx-auto max-w-6xl px-6 pt-14">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <LogLine
              parts={[
                "Destination",
                destination.country,
                formatCoords(destination.latitude, destination.longitude),
              ]}
            />
            <h1 className="mt-4 font-punch text-6xl font-extrabold tracking-tight sm:text-8xl">
              {destination.name}
            </h1>
            {destination.summary && (
              <p className="mt-6 max-w-xl font-reader text-xl leading-relaxed text-inksoft">
                {destination.summary}
              </p>
            )}
          </div>
          <div className="h-32 w-32 rotate-12 opacity-90 sm:h-40 sm:w-40">
            <Stamp text={destination.name} color="#e4572e" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        {destination.posts.length > 0 && (
          <section className="mt-16 border-t-2 border-hairline pt-10">
            <h2 className="font-punch text-3xl font-extrabold tracking-tight">
              Stories
            </h2>
            <div className="mt-4 divide-y-2 divide-hairline">
              {destination.posts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </section>
        )}

        {photos.length > 0 && (
          <section className="mt-16 border-t-2 border-hairline pt-10">
            <h2 className="font-punch text-3xl font-extrabold tracking-tight">
              Photographs
            </h2>
            <div className="mt-8">
              <GalleryGrid items={photos} />
            </div>
          </section>
        )}

        {films.length > 0 && (
          <section className="mt-16 border-t-2 border-hairline pt-10">
            <h2 className="font-punch text-3xl font-extrabold tracking-tight">
              Films
            </h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {films.map((film) => (
                <figure key={film.id} className="postcard">
                  <CldVideo publicId={film.publicId} />
                  {film.caption && (
                    <figcaption className="instrument pt-3 text-inksoft">
                      {film.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {destination.posts.length === 0 && destination.media.length === 0 && (
          <p className="mt-16 border-t-2 border-hairline pt-10 font-reader text-xl italic text-inksoft">
            Nothing logged from here yet.
          </p>
        )}
      </div>
    </div>
  );
}
