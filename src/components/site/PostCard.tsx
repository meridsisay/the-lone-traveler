import Link from "next/link";
import { CldImage } from "@/components/cld";
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

const tilts = ["tilt-a", "tilt-b", "tilt-c"];

/** A story on the desk: postcard print left, entry details right. */
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
      className="group grid items-center gap-8 py-10 sm:grid-cols-[280px_1fr]"
    >
      <figure className={`postcard ${tilts[index % 3]} w-full max-w-[280px]`}>
        {post.coverMedia ? (
          <CldImage
            src={post.coverMedia.publicId}
            alt={post.coverMedia.alt ?? post.title}
            width={560}
            height={420}
            crop="fill"
            gravity="auto"
            quality="auto"
            format="auto"
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <div className="aspect-[4/3] w-full">
            <PlaceholderScene seed={index + 2} />
          </div>
        )}
      </figure>
      <div>
        <p className="instrument text-poppy">
          {[post.destination?.name, formatMonth(post.publishedAt)]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <h3 className="mt-3 font-punch text-3xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-cobalt sm:text-4xl">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-4 max-w-xl font-reader text-lg leading-relaxed text-inksoft">
            {post.excerpt}
          </p>
        )}
        <p className="instrument mt-5 text-cobalt underline decoration-2 underline-offset-8">
          Read the entry
        </p>
      </div>
    </Link>
  );
}
