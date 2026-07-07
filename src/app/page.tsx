import Link from "next/link";
import { CldImage } from "@/components/cld";
import PlaceholderScene from "@/components/site/PlaceholderScene";
import PostCard from "@/components/site/PostCard";
import DestinationCard from "@/components/site/DestinationCard";
import Stamp from "@/components/site/Stamp";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export default async function Home() {
  const [posts, destinations] = await Promise.all([
    safeQuery([], () =>
      db.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 4,
        include: {
          coverMedia: { select: { publicId: true, alt: true } },
          destination: { select: { name: true, country: true } },
        },
      })
    ),
    safeQuery([], () =>
      db.destination.findMany({
        orderBy: { createdAt: "asc" },
        include: {
          coverMedia: { select: { publicId: true, alt: true } },
          _count: { select: { posts: { where: { status: "PUBLISHED" } } } },
        },
      })
    ),
  ]);

  const hero = posts[0] ?? null;
  const rest = posts.slice(1);

  return (
    <>
      {/* Hero: headline + postcard collage */}
      <header className="mx-auto grid max-w-6xl items-center gap-14 px-6 pt-10 pb-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="instrument rise text-poppy">
            One traveler · one camera · no hurry
          </p>
          <h1 className="rise mt-6 font-punch text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
            Gone the{" "}
            <em className="font-reader font-medium italic text-cobalt">
              long way
            </em>{" "}
            around.
          </h1>
          <p className="rise-late mt-7 max-w-md font-reader text-xl leading-relaxed text-inksoft">
            Stories, photographs, and small films collected slowly, one
            country at a time.
          </p>
          <div className="rise-late mt-10 flex flex-wrap items-center gap-5">
            {hero ? (
              <Link
                href={`/stories/${hero.slug}`}
                className="rounded-full bg-sunny px-7 py-3.5 font-punch text-sm font-bold text-ink shadow-[0_10px_24px_rgb(239_169_46/0.45)] transition-transform hover:-translate-y-0.5"
              >
                Read the latest entry
              </Link>
            ) : (
              <span className="rounded-full bg-sunny px-7 py-3.5 font-punch text-sm font-bold text-ink">
                First entry coming soon
              </span>
            )}
            <Link
              href="/gallery"
              className="instrument text-cobalt underline decoration-2 underline-offset-8 hover:text-poppy"
            >
              Open the gallery
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          {hero ? (
            <Link href={`/stories/${hero.slug}`} className="block">
              <figure className="postcard tilt-b">
                {hero.coverMedia ? (
                  <CldImage
                    src={hero.coverMedia.publicId}
                    alt={hero.coverMedia.alt ?? hero.title}
                    width={800}
                    height={1000}
                    crop="fill"
                    gravity="auto"
                    quality="auto"
                    format="auto"
                    priority
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[4/5] w-full">
                    <PlaceholderScene seed={1} />
                  </div>
                )}
                <figcaption className="instrument flex items-baseline justify-between pt-3 text-[0.625rem] text-inksoft">
                  <span>{hero.destination?.name ?? "The road"}</span>
                  <span>
                    {hero.publishedAt?.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </figcaption>
              </figure>
            </Link>
          ) : (
            <figure className="postcard tilt-b">
              <div className="aspect-[4/5] w-full">
                <PlaceholderScene seed={1} />
              </div>
              <figcaption className="instrument pt-3 text-[0.625rem] text-inksoft">
                Awaiting the first print
              </figcaption>
            </figure>
          )}
          {hero?.destination && (
            <div className="absolute -top-10 -right-6 h-28 w-28 rotate-12 opacity-90 sm:h-32 sm:w-32">
              <Stamp text={hero.destination.name} color="#e4572e" />
            </div>
          )}
        </div>
      </header>

      {/* Latest stories */}
      <section className="border-t-2 border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-punch text-3xl font-extrabold tracking-tight">
              Latest from the road
            </h2>
            <Link
              href="/stories"
              className="instrument text-cobalt hover:text-poppy"
            >
              All stories →
            </Link>
          </div>
          {rest.length > 0 ? (
            <div className="mt-8 divide-y-2 divide-hairline">
              {rest.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          ) : (
            <p className="mt-10 font-reader text-xl italic text-inksoft">
              {hero
                ? "One entry logged so far — the next is being written."
                : "The first story is still being written."}
            </p>
          )}
        </div>
      </section>

      {/* The passport */}
      {destinations.length > 0 && (
        <section className="border-t-2 border-hairline bg-sand">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-baseline justify-between">
              <h2 className="font-punch text-3xl font-extrabold tracking-tight">
                The passport
              </h2>
              <Link
                href="/destinations"
                className="instrument text-cobalt hover:text-poppy"
              >
                All destinations →
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap gap-x-12 gap-y-16">
              {destinations.map((d, i) => (
                <DestinationCard key={d.slug} destination={d} index={i} />
              ))}
              <div className="relative flex w-56 items-center justify-center">
                <div className="h-32 w-32 opacity-25">
                  <Stamp text="Next stop" color="#1e2b38" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
