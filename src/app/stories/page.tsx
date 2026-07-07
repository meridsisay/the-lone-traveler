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
    <div className="mx-auto max-w-6xl px-6 pt-14 pb-24">
      <p className="instrument text-poppy">Stories</p>
      <h1 className="mt-4 font-punch text-5xl font-extrabold tracking-tight sm:text-6xl">
        Field notes from far away
      </h1>
      {posts.length === 0 ? (
        <p className="mt-14 font-reader text-xl italic text-inksoft">
          No stories logged yet — the first entry is on its way.
        </p>
      ) : (
        <div className="mt-12 divide-y-2 divide-hairline border-t-2 border-hairline">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
