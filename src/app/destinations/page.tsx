import type { Metadata } from "next";
import DestinationCard from "@/components/site/DestinationCard";
import Stamp from "@/components/site/Stamp";
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
      orderBy: { createdAt: "asc" },
      include: {
        coverMedia: { select: { publicId: true, alt: true } },
        _count: { select: { posts: { where: { status: "PUBLISHED" } } } },
      },
    })
  );

  return (
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-24">
      <p className="instrument text-poppy">Destinations</p>
      <h1 className="mt-4 font-punch text-5xl font-extrabold tracking-tight sm:text-6xl">
        The passport
      </h1>
      <p className="mt-6 max-w-md font-reader text-xl leading-relaxed text-inksoft">
        Every place gets a stamp and a page of its own.
      </p>
      {destinations.length === 0 ? (
        <p className="mt-14 font-reader text-xl italic text-inksoft">
          No destinations pinned yet.
        </p>
      ) : (
        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-16">
          {destinations.map((d, i) => (
            <DestinationCard key={d.slug} destination={d} index={i} />
          ))}
          <div className="relative flex w-56 items-center justify-center">
            <div className="h-32 w-32 opacity-25">
              <Stamp text="Next stop" color="#1e2b38" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
