"use client";

import { usePathname } from "next/navigation";

export default function TickerBand({ line }: { line: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="ticker bg-cobalt py-2 text-paper">
      <div className="ticker-track instrument">
        <span>{line}</span>
        <span aria-hidden>{line}</span>
      </div>
    </div>
  );
}
