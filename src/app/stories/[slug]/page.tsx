import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCldImageUrl } from "next-cloudinary";
import { CldImage } from "@/components/cld";
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
    openGraph: post.coverMedia
      ? {
          images: [
            {
              url: getCldImageUrl({
                src: post.coverMedia.publicId,
                width: 1200,
                height: 630,
                crop: "fill",
                gravity: "auto",
              }),
              width: 1200,
              height: 630,
            },
          ],
        }
      : undefined,
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
    <article className="pb-24">
      <header className="mx-auto max-w-3xl px-6 pt-14">
        <LogLine
          parts={[
            post.destination?.name,
            post.destination?.country,
            formatDate(post.publishedAt),
          ]}
        />
        <h1 className="mt-5 font-punch text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 font-reader text-xl italic leading-relaxed text-inksoft">
            {post.excerpt}
          </p>
        )}
      </header>

      {post.coverMedia && (
        <div className="mx-auto max-w-4xl px-6 pt-12">
          <figure className="postcard">
            <CldImage
              src={post.coverMedia.publicId}
              alt={post.coverMedia.alt ?? post.title}
              width={1600}
              height={1000}
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="aspect-[16/10] w-full object-cover"
            />
          </figure>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 pt-14">
        <PostBody content={post.content} />
        {post.destination && (
          <p className="mt-16 border-t-2 border-hairline pt-8">
            <Link
              href={`/destinations/${post.destination.slug}`}
              className="instrument text-cobalt underline decoration-2 underline-offset-8 transition-colors hover:text-poppy"
            >
              More from {post.destination.name} →
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}
