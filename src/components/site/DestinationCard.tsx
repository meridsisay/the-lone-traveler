import Link from "next/link";
import { CldImage } from "@/components/cld";
import PlaceholderScene from "@/components/site/PlaceholderScene";
import Stamp from "@/components/site/Stamp";

export type DestinationCardData = {
  slug: string;
  name: string;
  country: string | null;
  summary: string | null;
  coverMedia: { publicId: string; alt: string | null } | null;
  _count: { posts: number };
};

const tilts = ["tilt-c", "tilt-a", "tilt-b"];
const inks = ["#2b59e0", "#e4572e", "#1e2b38"];

/** A page of the passport: postcard cover with a stamped ring. */
export default function DestinationCard({
  destination,
  index = 0,
}: {
  destination: DestinationCardData;
  index?: number;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block w-56"
    >
      <figure className={`postcard ${tilts[index % 3]} w-full`}>
        {destination.coverMedia ? (
          <CldImage
            src={destination.coverMedia.publicId}
            alt={destination.coverMedia.alt ?? destination.name}
            width={448}
            height={448}
            crop="fill"
            gravity="auto"
            quality="auto"
            format="auto"
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div className="aspect-square w-full">
            <PlaceholderScene seed={index + 5} />
          </div>
        )}
        <figcaption className="pt-3 text-center font-punch text-lg font-bold text-ink">
          {destination.name}
          <span className="instrument block font-normal text-inksoft">
            {[
              destination.country?.toLowerCase() !==
              destination.name.toLowerCase()
                ? destination.country
                : null,
              `${destination._count.posts} ${destination._count.posts === 1 ? "story" : "stories"}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </figcaption>
      </figure>
      <div className="absolute -top-8 -left-8 h-24 w-24 -rotate-12 opacity-90 transition-transform duration-500 group-hover:rotate-0">
        <Stamp text={destination.name} color={inks[index % 3]} />
      </div>
    </Link>
  );
}
