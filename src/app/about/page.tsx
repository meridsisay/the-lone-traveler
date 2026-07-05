import type { Metadata } from "next";
import LogLine from "@/components/site/LogLine";

export const metadata: Metadata = {
  title: "About",
  description: "Who is behind The Lone Traveler.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-36 pb-24">
      <p className="instrument text-lowsun">About</p>
      <h1 className="mt-5 font-display text-4xl font-extralight leading-tight sm:text-5xl">
        One traveler, one camera, no hurry.
      </h1>
      <LogLine parts={["Home base", "Somewhere between departures"]} className="mt-8" />
      <div className="mt-12 space-y-6 leading-relaxed text-haze">
        <p>
          The Lone Traveler is a personal field log — a place to keep the
          stories, photographs, and small films collected while traveling
          alone through the world.
        </p>
        <p>
          There is no itinerary here and no rush. Entries arrive when a place
          has had time to settle. Everything you see was photographed and
          written by one person.
        </p>
      </div>
    </article>
  );
}
