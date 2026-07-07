import type { Metadata } from "next";
import Link from "next/link";
import { getCldImageUrl } from "next-cloudinary";
import LogLine from "@/components/site/LogLine";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Preview · Type as window",
  robots: { index: false },
};

const TWILIGHT_FILL =
  "linear-gradient(165deg, #2d4258 0%, #54453c 52%, #16202e 100%)";

function photoFill(publicId?: string | null) {
  return publicId
    ? `url(${getCldImageUrl({ src: publicId, width: 1600, crop: "fill", gravity: "auto" })})`
    : TWILIGHT_FILL;
}

function PhotoWord({
  word,
  href,
  publicId,
  sizeClass,
}: {
  word: string;
  href: string;
  publicId?: string | null;
  sizeClass: string;
}) {
  return (
    <Link href={href} className="photo-word block">
      <span
        className={`photo-word-text ${sizeClass}`}
        style={{ backgroundImage: photoFill(publicId) }}
      >
        {word}
      </span>
    </Link>
  );
}

export default async function WindowPreview() {
  const [posts, destinations] = await Promise.all([
    safeQuery([], () =>
      db.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        take: 4,
        include: {
          coverMedia: { select: { publicId: true } },
          destination: { select: { name: true, country: true } },
        },
      })
    ),
    safeQuery([], () =>
      db.destination.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          coverMedia: { select: { publicId: true } },
          _count: { select: { posts: true } },
        },
      })
    ),
  ]);

  const hero = posts[0] ?? null;

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <p className="instrument text-lowsun">Field log</p>

      {hero ? (
        <div className="mt-6">
          <PhotoWord
            word={hero.title}
            href={`/stories/${hero.slug}`}
            publicId={hero.coverMedia?.publicId}
            sizeClass="text-[clamp(2.75rem,9vw,7.5rem)]"
          />
          <LogLine
            parts={[
              hero.destination?.name,
              hero.publishedAt?.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              }),
            ]}
            className="mt-8"
          />
        </div>
      ) : (
        <div className="mt-6">
          <span
            className="photo-word-text text-[clamp(2.75rem,9vw,7.5rem)]"
            style={{ backgroundImage: TWILIGHT_FILL }}
          >
            The long way around
          </span>
          <LogLine parts={["Awaiting first entry"]} className="mt-8" />
        </div>
      )}

      <section className="mt-28">
        <div className="flex items-baseline justify-between border-b border-hairline pb-4">
          <h2 className="instrument text-haze">Destinations</h2>
          <Link
            href="/destinations"
            className="instrument text-haze transition-colors hover:text-lowsun"
          >
            All →
          </Link>
        </div>
        <div className="mt-10 space-y-10">
          {destinations.map((d) => (
            <div key={d.slug}>
              <PhotoWord
                word={d.name}
                href={`/destinations/${d.slug}`}
                publicId={d.coverMedia?.publicId}
                sizeClass="text-[clamp(3.5rem,14vw,12rem)]"
              />
              <p className="instrument log-line mt-4 text-haze">
                {[
                  d.country,
                  `${d._count.posts} ${d._count.posts === 1 ? "story" : "stories"}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          ))}
          {/* Ghost of the next pin: the journey isn't finished */}
          <div aria-hidden className="select-none">
            <span
              className="photo-word-text text-[clamp(3.5rem,14vw,12rem)] opacity-30"
              style={{ backgroundImage: TWILIGHT_FILL }}
            >
              Next?
            </span>
          </div>
        </div>
      </section>

      {posts.length > 1 && (
        <section className="mt-28">
          <h2 className="instrument border-b border-hairline pb-4 text-haze">
            More stories
          </h2>
          <ul className="mt-6 space-y-6">
            {posts.slice(1).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/stories/${p.slug}`}
                  className="font-display text-3xl font-extralight text-moonstone transition-colors hover:text-lowsun"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
