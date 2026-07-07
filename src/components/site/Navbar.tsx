"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/stories", label: "Stories" },
  { href: "/destinations", label: "Destinations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin") || pathname.startsWith("/preview/sunlit"))
    return null;

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-moonstone"
          onClick={() => setOpen(false)}
        >
          The Lone Traveler
        </Link>

        <button
          type="button"
          className="instrument text-haze sm:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <ul
          id="site-menu"
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-0 top-full flex-col gap-5 bg-night/95 px-6 py-6 backdrop-blur sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 sm:bg-transparent sm:p-0 sm:backdrop-blur-none`}
        >
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`instrument transition-colors ${
                    active ? "text-lowsun" : "text-haze hover:text-moonstone"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
