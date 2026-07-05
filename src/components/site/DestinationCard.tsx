import Link from "next/link";
import { CldImage } from "next-cloudinary";
import PlaceholderScene from "@/components/site/PlaceholderScene";

export type DestinationCardData = {
  slug: string;
  name: string;
  country: string | null;
  summary: string | null;
  coverMedia: { publicId: string; alt: string | null } | null;
  _count: { posts: number; media: number };
};

export default function DestinationCard({
  destination,
  index = 0,
}: {
  destination: DestinationCardData;
  index?: number;
}) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden">
        {destination.coverMedia ? (
          <CldImage
            src={destination.coverMedia.publicId}
            alt={destination.coverMedia.alt ?? destination.name}
            width={640}
            height={480}
            crop="fill"
            gravity="auto"
            quality="auto"
            format="auto"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderScene seed={index + 5} />
        )}
      </div>
      <h3 className="mt-4 font-display text-2xl font-extralight text-moonstone transition-colors group-hover:text-lowsun">
        {destination.name}
      </h3>
      <p className="instrument mt-2 text-haze">
        {[
          destination.country,
          `${destination._count.posts} ${destination._count.posts === 1 ? "story" : "stories"}`,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>
      {destination.summary && (
        <p className="mt-2 text-sm leading-relaxed text-haze">
          {destination.summary}
        </p>
      )}
    </Link>
  );
}
