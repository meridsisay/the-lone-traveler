import Link from "next/link";
import { CldImage } from "next-cloudinary";
import LogLine from "@/components/site/LogLine";
import PlaceholderScene from "@/components/site/PlaceholderScene";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: Date | null;
  coverMedia: { publicId: string; alt: string | null } | null;
  destination: { name: string; country: string | null } | null;
};

function formatMonth(date: Date | null) {
  return date?.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** Editorial row: text left, photograph right. `index` seeds the placeholder. */
export default function PostCard({
  post,
  index = 0,
}: {
  post: PostCardData;
  index?: number;
}) {
  return (
    <Link
      href={`/stories/${post.slug}`}
      className="group grid gap-6 py-10 sm:grid-cols-[1fr_260px] sm:items-center"
    >
      <div>
        <LogLine
          parts={[post.destination?.name, formatMonth(post.publishedAt)]}
        />
        <h3 className="mt-4 font-display text-3xl font-extralight text-moonstone transition-colors group-hover:text-lowsun">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 max-w-xl leading-relaxed text-haze">
            {post.excerpt}
          </p>
        )}
      </div>
      <div className="aspect-[4/3] overflow-hidden">
        {post.coverMedia ? (
          <CldImage
            src={post.coverMedia.publicId}
            alt={post.coverMedia.alt ?? post.title}
            width={520}
            height={390}
            crop="fill"
            gravity="auto"
            quality="auto"
            format="auto"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderScene seed={index + 2} />
        )}
      </div>
    </Link>
  );
}
