import type { Metadata } from "next";
import DestinationCard from "@/components/site/DestinationCard";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Destinations",
  description: "Every place the journey has touched.",
};

export default async function DestinationsPage() {
  const destinations = await safeQuery([], () =>
    db.destination.findMany({
      orderBy: { name: "asc" },
      include: {
        coverMedia: { select: { publicId: true, alt: true } },
        _count: { select: { posts: true, media: true } },
      },
    })
  );

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-24">
      <p className="instrument text-lowsun">Destinations</p>
      <h1 className="mt-5 font-display text-4xl font-extralight sm:text-5xl">
        Places with their own pages
      </h1>
      {destinations.length === 0 ? (
        <div className="mt-16 border-t border-hairline pt-16 text-center">
          <p className="font-display text-2xl font-extralight italic">
            No destinations pinned yet.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-haze">
            Each destination will gather its stories, photographs, and films in
            one place.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <DestinationCard key={d.slug} destination={d} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
