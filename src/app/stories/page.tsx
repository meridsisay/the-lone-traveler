import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories",
  description: "Travel stories and field notes.",
};

export default function StoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-24">
      <p className="instrument text-lowsun">Stories</p>
      <h1 className="mt-5 font-display text-4xl font-extralight sm:text-5xl">
        Field notes from far away
      </h1>
      <div className="mt-16 border-t border-hairline pt-16 text-center">
        <p className="font-display text-2xl font-extralight italic">
          No stories logged yet.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-haze">
          The first entry is on its way.
        </p>
      </div>
    </div>
  );
}
