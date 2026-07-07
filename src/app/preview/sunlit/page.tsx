import type { Metadata } from "next";
import Link from "next/link";
import { getCldImageUrl } from "next-cloudinary";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Preview · Sunlit field desk",
  robots: { index: false },
};

function photoUrl(publicId: string, width = 900) {
  return getCldImageUrl({
    src: publicId,
    width,
    crop: "fill",
    gravity: "auto",
  });
}

/** A rubber-stamp ring: destination name circling a compass dot. */
function Stamp({
  text,
  color,
  className = "",
}: {
  text: string;
  color: string;
  className?: string;
}) {
  const ring = `${text} · `.repeat(3);
  return (
    <svg
      viewBox="0 0 120 120"
      className={`h-full w-full ${className}`}
      style={{ color }}
      aria-hidden
    >
      <defs>
        <path
          id={`ring-${text.replace(/\W/g, "")}`}
          d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
        />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        cx="60"
        cy="60"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <circle cx="60" cy="60" r="3.5" fill="currentColor" />
      <text
        fontSize="10.5"
        letterSpacing="2.5"
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontWeight="500"
      >
        <textPath href={`#ring-${text.replace(/\W/g, "")}`}>
          {ring.toUpperCase()}
        </textPath>
      </text>
    </svg>
  );
}

const NAV = [
  { href: "/stories", label: "Stories" },
  { href: "/destinations", label: "Destinations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export default async function SunlitPreview() {
  const [posts, destinations, mediaCount] = await Promise.all([
    safeQuery([], () =>
      db.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 5,
        include: {
          coverMedia: { select: { publicId: true, alt: true } },
          destination: { select: { name: true } },
        },
      })
    ),
    safeQuery([], () =>
      db.destination.findMany({
        orderBy: { createdAt: "asc" },
        include: {
          coverMedia: { select: { publicId: true, alt: true } },
          _count: {
            select: { posts: { where: { status: "PUBLISHED" } } },
          },
        },
      })
    ),
    safeQuery(0, () => db.media.count({ where: { inGallery: true } })),
  ]);

  const hero = posts[0] ?? null;
  const tickerItems = [
    "Field log of one traveler",
    ...destinations.map((d) => `Now logging: ${d.name}`),
    `${mediaCount} frames in the gallery`,
    "Next stop: uncharted",
    "No hurry, no itinerary",
  ];
  const tickerLine = tickerItems.join("  ✦  ").toUpperCase();
  const stampInks = ["#2b59e0", "#e4572e", "#1e2b38"];

  return (
    <div className="bg-paper text-ink">
      {/* Departures ticker */}
      <div className="ticker bg-cobalt py-2 text-paper">
        <div className="ticker-track font-mono text-[0.6875rem] tracking-[0.14em]">
          <span>{tickerLine}</span>
          <span aria-hidden>{tickerLine}</span>
        </div>
      </div>

      {/* Light nav */}
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link
          href="/"
          className="font-punch text-xl font-extrabold tracking-tight"
        >
          The Lone Traveler
        </Link>
        <ul className="flex flex-wrap items-center gap-6">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-inksoft transition-colors hover:text-cobalt"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero: headline + postcard collage */}
      <header className="mx-auto grid max-w-6xl items-center gap-14 px-6 pt-14 pb-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-poppy">
            One traveler · one camera · no hurry
          </p>
          <h1 className="mt-6 font-punch text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
            Gone the{" "}
            <em className="font-reader font-medium italic text-cobalt">
              long way
            </em>{" "}
            around.
          </h1>
          <p className="mt-7 max-w-md font-reader text-xl leading-relaxed text-inksoft">
            Stories, photographs, and small films collected slowly, one
            country at a time.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
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
              className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-cobalt underline decoration-2 underline-offset-8 hover:text-poppy"
            >
              Open the gallery
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          {hero?.coverMedia ? (
            <Link href={`/stories/${hero.slug}`} className="block">
              <figure className="postcard tilt-b">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl(hero.coverMedia.publicId)}
                  alt={hero.coverMedia.alt ?? hero.title}
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="flex items-baseline justify-between pt-3 font-mono text-[0.625rem] tracking-[0.12em] uppercase text-inksoft">
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
              <div className="aspect-[4/5] w-full bg-gradient-to-b from-[#cfe0f5] via-[#f3d9a8] to-[#e8e2d4]" />
              <figcaption className="pt-3 font-mono text-[0.625rem] tracking-[0.12em] uppercase text-inksoft">
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

      {/* Latest stories as postcards on the desk */}
      <section className="border-t-2 border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-punch text-3xl font-extrabold tracking-tight">
              Latest from the road
            </h2>
            <Link
              href="/stories"
              className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-cobalt hover:text-poppy"
            >
              All stories →
            </Link>
          </div>
          {posts.length === 0 ? (
            <p className="mt-10 font-reader text-xl italic text-inksoft">
              The first story is still being written.
            </p>
          ) : (
            <div className="mt-12 space-y-16">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/stories/${post.slug}`}
                  className="group grid items-center gap-8 sm:grid-cols-[280px_1fr]"
                >
                  <figure
                    className={`postcard ${["tilt-a", "tilt-b", "tilt-c"][i % 3]} w-full max-w-[280px]`}
                  >
                    {post.coverMedia ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photoUrl(post.coverMedia.publicId, 560)}
                        alt={post.coverMedia.alt ?? post.title}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[4/3] w-full bg-gradient-to-b from-[#cfe0f5] to-[#e8e2d4]" />
                    )}
                  </figure>
                  <div>
                    <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-poppy">
                      {[
                        post.destination?.name,
                        post.publishedAt?.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        }),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <h3 className="mt-3 font-punch text-3xl font-extrabold tracking-tight transition-colors group-hover:text-cobalt sm:text-4xl">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-4 max-w-xl font-reader text-lg leading-relaxed text-inksoft">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-cobalt underline decoration-2 underline-offset-8">
                      Read the entry
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* The passport: destination stamps */}
      <section className="border-t-2 border-ink/10 bg-[#f4efe6]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-punch text-3xl font-extrabold tracking-tight">
              The passport
            </h2>
            <Link
              href="/destinations"
              className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-cobalt hover:text-poppy"
            >
              All destinations →
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-12">
            {destinations.map((d, i) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group relative"
              >
                <figure
                  className={`postcard ${["tilt-c", "tilt-a", "tilt-b"][i % 3]} w-56`}
                >
                  {d.coverMedia ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoUrl(d.coverMedia.publicId, 448)}
                      alt={d.coverMedia.alt ?? d.name}
                      className="aspect-square w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-square w-full bg-gradient-to-b from-[#cfe0f5] to-[#e8e2d4]" />
                  )}
                  <figcaption className="pt-3 text-center font-punch text-lg font-bold">
                    {d.name}
                    <span className="block font-mono text-[0.625rem] font-normal tracking-[0.12em] uppercase text-inksoft">
                      {d._count.posts}{" "}
                      {d._count.posts === 1 ? "story" : "stories"}
                    </span>
                  </figcaption>
                </figure>
                <div className="absolute -top-8 -left-8 h-24 w-24 -rotate-12 opacity-90 transition-transform group-hover:rotate-0">
                  <Stamp text={d.name} color={stampInks[i % 3]} />
                </div>
              </Link>
            ))}
            {/* The next, un-inked page of the passport */}
            <div className="relative flex w-56 items-center justify-center">
              <div className="h-32 w-32 opacity-25">
                <Stamp text="Next stop" color="#1e2b38" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Light footer */}
      <footer className="border-t-2 border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-inksoft">
            The Lone Traveler · est. 2026
          </p>
          <Link
            href="/login"
            className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-inksoft hover:text-cobalt"
          >
            Field desk
          </Link>
        </div>
      </footer>
    </div>
  );
}
