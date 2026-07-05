import Link from "next/link";
import { requireAdmin } from "@/lib/require-admin";
import { signOut } from "@/lib/auth";

// Admin is always rendered per-request: it depends on the session cookie and
// live data, and must never be captured at build time.
export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Desk" },
  { href: "/admin/posts", label: "Stories" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/destinations", label: "Destinations" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-svh">
      <header className="border-b border-hairline">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="font-display text-base text-moonstone">
              The Lone Traveler
            </Link>
            <nav className="flex flex-wrap gap-5">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="instrument text-haze transition-colors hover:text-lowsun"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="instrument text-haze transition-colors hover:text-lowsun"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
