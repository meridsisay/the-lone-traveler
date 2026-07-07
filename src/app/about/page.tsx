import type { Metadata } from "next";
import LogLine from "@/components/site/LogLine";

export const metadata: Metadata = {
  title: "About",
  description: "Who is behind The Lone Traveler.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-14 pb-24">
      <p className="instrument text-poppy">About</p>
      <h1 className="mt-4 font-punch text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        One traveler, one camera,{" "}
        <em className="font-reader font-medium italic text-cobalt">
          no hurry.
        </em>
      </h1>
      <LogLine
        parts={["Home base", "Somewhere between departures"]}
        className="mt-8"
      />
      <div className="mt-10 space-y-6 font-reader text-xl leading-relaxed text-inksoft">
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
