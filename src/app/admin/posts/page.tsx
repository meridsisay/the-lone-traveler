import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Stories",
  robots: { index: false },
};

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { destination: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="instrument text-cobalt">Stories</p>
          <h1 className="mt-3 font-punch text-3xl font-extrabold tracking-tight">
            The journal
          </h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="instrument border border-hairline px-5 py-2.5 text-ink transition-colors hover:border-cobalt hover:text-cobalt"
        >
          Write a story
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="mt-12 border-t border-hairline pt-12 text-center">
          <p className="font-reader text-2xl italic">
            Nothing written yet.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-inksoft">
            Start the first entry — it stays a draft until you publish it.
          </p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-hairline border-t border-hairline">
          {posts.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/posts/${p.id}/edit`}
                className="group flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div>
                  <p className="font-punch text-xl font-bold text-ink group-hover:text-cobalt">
                    {p.title}
                  </p>
                  <p className="instrument mt-1 text-inksoft">
                    {p.status === "PUBLISHED" ? "Published" : "Draft"}
                    {p.destination && ` · ${p.destination.name}`}
                    {" · updated "}
                    {p.updatedAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`instrument ${
                    p.status === "PUBLISHED" ? "text-cobalt" : "text-inksoft"
                  }`}
                >
                  {p.status === "PUBLISHED" ? "Live" : "Draft"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
