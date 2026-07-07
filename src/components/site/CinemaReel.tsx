"use client";

import { useRef } from "react";

/** Horizontal snap reel; vertical wheel input is translated to horizontal travel. */
export default function CinemaReel({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="cinema-reel"
      onWheel={(e) => {
        const el = ref.current;
        if (!el || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        el.scrollBy({ left: e.deltaY, behavior: "instant" });
      }}
    >
      {children}
    </div>
  );
}
