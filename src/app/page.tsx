import Link from "next/link";
import LogLine from "@/components/site/LogLine";
import PlaceholderScene from "@/components/site/PlaceholderScene";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-svh flex-col justify-end">
        <div className="absolute inset-0 -z-10">
          <PlaceholderScene seed={1} />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/10" />
        </div>
        <div className="mx-auto w-full max-w-6xl px-6 pb-24">
          <p className="instrument rise text-lowsun">Field log</p>
          <h1 className="rise mt-5 max-w-3xl font-display text-5xl font-extralight leading-[1.08] sm:text-7xl">
            The long way around.
          </h1>
          <p className="rise-late mt-6 max-w-xl text-lg leading-relaxed text-haze">
            Stories and photographs from a solo journey through the world.
          </p>
          <LogLine
            parts={["Awaiting first entry"]}
            className="rise-late mt-10"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-baseline justify-between">
          <h2 className="instrument text-haze">Latest stories</h2>
          <Link
            href="/stories"
            className="instrument text-haze transition-colors hover:text-lowsun"
          >
            All stories →
          </Link>
        </div>
        <div className="mt-12 border-t border-hairline pt-16 text-center">
          <p className="font-display text-3xl font-extralight italic text-moonstone">
            The journal begins soon.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-haze">
            The first stories are still being written. Photographs and field
            notes will appear here as the journey unfolds.
          </p>
        </div>
      </section>
    </>
  );
}
