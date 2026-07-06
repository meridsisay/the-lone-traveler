import Link from "next/link";
import { CldImage } from "@/components/cld";
import LogLine from "@/components/site/LogLine";
import PlaceholderScene from "@/components/site/PlaceholderScene";
import PostCard from "@/components/site/PostCard";
import DestinationCard from "@/components/site/DestinationCard";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

function formatMonth(date: Date | null) {
  return date?.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

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
        orderBy: { createdAt: "desc" },
        take: 3,
        include: {
          coverMedia: { select: { publicId: true, alt: true } },
          _count: { select: { posts: true, media: true } },
        },
      })
    ),
  ]);

  const hero = posts[0] ?? null;
  const rest = posts.slice(1);

  return (
    <>
      <section className="relative flex min-h-svh flex-col justify-end">
        <div className="absolute inset-0 -z-10">
          {hero?.coverMedia ? (
            <CldImage
              src={hero.coverMedia.publicId}
              alt={hero.coverMedia.alt ?? hero.title}
              fill
              priority
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <PlaceholderScene seed={1} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/10" />
        </div>
        <div className="mx-auto w-full max-w-6xl px-6 pb-24">
          <p className="instrument rise text-lowsun">Field log</p>
          {hero ? (
            <>
              <h1 className="rise mt-5 max-w-3xl font-display text-5xl font-extralight leading-[1.08] sm:text-7xl">
                <Link href={`/stories/${hero.slug}`} className="hover:text-lowsun">
                  {hero.title}
                </Link>
              </h1>
              {hero.excerpt && (
                <p className="rise-late mt-6 max-w-xl text-lg leading-relaxed text-haze">
                  {hero.excerpt}
                </p>
              )}
              <LogLine
                parts={[
                  hero.destination?.name,
                  hero.destination?.country,
                  formatMonth(hero.publishedAt),
                ]}
                className="rise-late mt-10"
              />
            </>
          ) : (
            <>
              <h1 className="rise mt-5 max-w-3xl font-display text-5xl font-extralight leading-[1.08] sm:text-7xl">
                The long way around.
              </h1>
              <p className="rise-late mt-6 max-w-xl text-lg leading-relaxed text-haze">
                Stories and photographs from a solo journey through the world.
              </p>
              <LogLine parts={["Awaiting first entry"]} className="rise-late mt-10" />
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-baseline justify-between">
          <h2 className="instrument text-haze">Latest stories</h2>
          <Link
            href="/stories"
            className="instrument text-haze transition-colors hover:text-lowsun"
          >
            All stories →
          </Link>
        </div>
        {rest.length > 0 ? (
          <div className="mt-6 divide-y divide-hairline border-t border-hairline">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-12 border-t border-hairline pt-16 text-center">
            <p className="font-display text-3xl font-extralight italic text-moonstone">
              {hero ? "More entries are coming." : "The journal begins soon."}
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-haze">
              {hero
                ? "One story is logged so far — the next is being written."
                : "The first stories are still being written. Photographs and field notes will appear here as the journey unfolds."}
            </p>
          </div>
        )}
      </section>

      {destinations.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="flex items-baseline justify-between">
            <h2 className="instrument text-haze">Destinations</h2>
            <Link
              href="/destinations"
              className="instrument text-haze transition-colors hover:text-lowsun"
            >
              All destinations →
            </Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {destinations.map((d, i) => (
              <DestinationCard key={d.slug} destination={d} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
