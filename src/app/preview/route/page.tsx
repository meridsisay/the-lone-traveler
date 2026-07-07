import type { Metadata } from "next";
import Link from "next/link";
import { CldImage } from "@/components/cld";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Preview · The route line",
  robots: { index: false },
};

const SEG = 56; // viewBox units per journey segment

function routePath(stops: number): { d: string; height: number } {
  let d = "M 50 0";
  let x = 50;
  for (let i = 0; i <= stops; i++) {
    const nx = i % 2 === 0 ? 30 : 70;
    const y0 = i * SEG;
    const y1 = (i + 1) * SEG;
    d += ` C ${x} ${y0 + SEG / 2}, ${nx} ${y0 + SEG / 2}, ${nx} ${y1}`;
    x = nx;
  }
  return { d, height: (stops + 1) * SEG };
}

export default async function RoutePreview() {
  const destinations = await safeQuery([], () =>
    db.destination.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        coverMedia: { select: { publicId: true, alt: true } },
        posts: {
          where: { status: "PUBLISHED" },
          orderBy: { publishedAt: "desc" },
          select: { slug: true, title: true },
        },
      },
    })
  );

  const { d, height } = routePath(destinations.length);

  return (
    <div className="pt-36 pb-24">
      <header className="mx-auto max-w-6xl px-6">
        <p className="instrument text-lowsun">The journey so far</p>
        <h1 className="mt-5 max-w-2xl font-display text-5xl font-extralight leading-tight sm:text-6xl">
          One line, drawn slowly.
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-haze">
          Every place joins the same path. Follow it down.
        </p>
      </header>

      <div className="relative mx-auto mt-20 max-w-5xl">
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
        >
          <path
            className="route-path"
            d={d}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {destinations.map((dest, i) => {
          const left = i % 2 === 0;
          return (
            <section
              key={dest.slug}
              className={`relative flex min-h-[34rem] items-center px-6 ${
                left ? "justify-end" : "justify-start"
              }`}
            >
              <span
                aria-hidden
                className="absolute bottom-0 h-3 w-3 -translate-x-1/2 rounded-full bg-lowsun"
                style={{ left: left ? "30%" : "70%" }}
              />
              <div className={`w-full max-w-md ${left ? "mr-[8%]" : "ml-[8%]"}`}>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="group block"
                >
                  {dest.coverMedia && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <CldImage
                        src={dest.coverMedia.publicId}
                        alt={dest.coverMedia.alt ?? dest.name}
                        width={640}
                        height={480}
                        crop="fill"
                        gravity="auto"
                        quality="auto"
                        format="auto"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <p className="instrument log-line mt-5 text-haze">
                    Stop {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-extralight text-moonstone transition-colors group-hover:text-lowsun">
                    {dest.name}
                  </h2>
                </Link>
                {dest.posts.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {dest.posts.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/stories/${p.slug}`}
                          className="text-sm text-haze underline-offset-4 transition-colors hover:text-lowsun hover:underline"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          );
        })}

        <section
          className={`relative flex min-h-[24rem] items-center px-6 ${
            destinations.length % 2 === 0 ? "justify-end" : "justify-start"
          }`}
        >
          <span
            aria-hidden
            className="absolute bottom-0 h-3 w-3 -translate-x-1/2 rounded-full border border-lowsun"
            style={{
              left: destinations.length % 2 === 0 ? "30%" : "70%",
            }}
          />
          <div
            className={`w-full max-w-md ${
              destinations.length % 2 === 0 ? "mr-[8%]" : "ml-[8%]"
            }`}
          >
            <p className="instrument log-line text-haze">
              Stop {String(destinations.length + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extralight italic text-haze">
              Uncharted.
            </h2>
          </div>
        </section>
      </div>
    </div>
  );
}
