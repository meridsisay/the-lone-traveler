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

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="relative z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-punch text-xl font-extrabold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          The Lone Traveler
        </Link>

        <button
          type="button"
          className="instrument text-inksoft sm:hidden"
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
          } absolute inset-x-0 top-full flex-col gap-5 border-b-2 border-hairline bg-paper px-6 py-6 sm:static sm:flex sm:flex-row sm:items-center sm:gap-7 sm:border-0 sm:p-0`}
        >
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`instrument transition-colors ${
                    active
                      ? "text-cobalt underline decoration-2 underline-offset-8"
                      : "text-inksoft hover:text-cobalt"
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
