import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Every place the journey has touched.",
};

export default function DestinationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-24">
      <p className="instrument text-lowsun">Destinations</p>
      <h1 className="mt-5 font-display text-4xl font-extralight sm:text-5xl">
        Places with their own pages
      </h1>
      <div className="mt-16 border-t border-hairline pt-16 text-center">
        <p className="font-display text-2xl font-extralight italic">
          No destinations pinned yet.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-haze">
          Each destination will gather its stories, photographs, and films in
          one place.
        </p>
      </div>
    </div>
  );
}
