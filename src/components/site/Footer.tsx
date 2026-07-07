"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t-2 border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="instrument text-inksoft">
          The Lone Traveler · est. {new Date().getFullYear()}
        </p>
        <p className="instrument text-inksoft">
          <Link href="/login" className="transition-colors hover:text-cobalt">
            Field desk
          </Link>
        </p>
      </div>
    </footer>
  );
}
