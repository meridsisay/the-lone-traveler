import type { Metadata } from "next";
import PostCard from "@/components/site/PostCard";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Stories",
  description: "Travel stories and field notes.",
};

export default async function StoriesPage() {
  const posts = await safeQuery([], () =>
    db.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: {
        coverMedia: { select: { publicId: true, alt: true } },
        destination: { select: { name: true, country: true } },
      },
    })
  );

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-24">
      <p className="instrument text-lowsun">Stories</p>
      <h1 className="mt-5 font-display text-4xl font-extralight sm:text-5xl">
        Field notes from far away
      </h1>
      {posts.length === 0 ? (
        <div className="mt-16 border-t border-hairline pt-16 text-center">
          <p className="font-display text-2xl font-extralight italic">
            No stories logged yet.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-haze">
            The first entry is on its way.
          </p>
        </div>
      ) : (
        <div className="mt-10 divide-y divide-hairline border-t border-hairline">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
