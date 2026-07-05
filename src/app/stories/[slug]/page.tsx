import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CldImage } from "next-cloudinary";
import LogLine from "@/components/site/LogLine";
import PostBody from "@/components/markdown/PostBody";
import { db } from "@/lib/db";
import { safeQuery } from "@/lib/queries";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await safeQuery([], () =>
    db.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    })
  );
  return posts.map(({ slug }) => ({ slug }));
}

async function getPost(slug: string) {
  return safeQuery(null, () =>
    db.post.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        coverMedia: { select: { publicId: true, alt: true } },
        destination: { select: { name: true, country: true, slug: true } },
      },
    })
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

function formatDate(date: Date | null) {
  return date?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      {post.coverMedia ? (
        <div className="relative flex min-h-[70svh] flex-col justify-end">
          <div className="absolute inset-0 -z-10">
            <CldImage
              src={post.coverMedia.publicId}
              alt={post.coverMedia.alt ?? post.title}
              fill
              priority
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-night/20" />
          </div>
          <header className="mx-auto w-full max-w-3xl px-6 pb-16">
            <LogLine
              parts={[
                post.destination?.name,
                post.destination?.country,
                formatDate(post.publishedAt),
              ]}
            />
            <h1 className="mt-5 font-display text-4xl font-extralight leading-tight sm:text-6xl">
              {post.title}
            </h1>
          </header>
        </div>
      ) : (
        <header className="mx-auto w-full max-w-3xl px-6 pt-36 pb-4">
          <LogLine
            parts={[
              post.destination?.name,
              post.destination?.country,
              formatDate(post.publishedAt),
            ]}
          />
          <h1 className="mt-5 font-display text-4xl font-extralight leading-tight sm:text-6xl">
            {post.title}
          </h1>
        </header>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16">
        <PostBody content={post.content} />
        {post.destination && (
          <p className="mt-16 border-t border-hairline pt-8">
            <Link
              href={`/destinations/${post.destination.slug}`}
              className="instrument text-haze transition-colors hover:text-lowsun"
            >
              More from {post.destination.name} →
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}
