import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Desk",
  robots: { index: false },
};

const shortcuts = [
  {
    href: "/admin/posts/new",
    title: "Write a story",
    hint: "Start a new journal entry",
  },
  {
    href: "/admin/media",
    title: "Upload media",
    hint: "Add photographs and films",
  },
  {
    href: "/admin/destinations",
    title: "Pin a destination",
    hint: "Give a place its own page",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <p className="instrument text-lowsun">Field desk</p>
      <h1 className="mt-3 font-display text-3xl font-extralight">
        Welcome back.
      </h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {shortcuts.map(({ href, title, hint }) => (
          <Link
            key={href}
            href={href}
            className="group border border-hairline bg-fathom/40 p-6 transition-colors hover:border-lowsun/60"
          >
            <p className="font-display text-xl font-light text-moonstone group-hover:text-lowsun">
              {title}
            </p>
            <p className="mt-2 text-sm text-haze">{hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
