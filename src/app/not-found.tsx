import Link from "next/link";
import Stamp from "@/components/site/Stamp";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-32 text-center">
      <div className="h-28 w-28 -rotate-12 opacity-30">
        <Stamp text="Off the map" color="#1e2b38" />
      </div>
      <h1 className="mt-8 font-punch text-5xl font-extrabold tracking-tight sm:text-6xl">
        This trail doesn’t exist.
      </h1>
      <Link
        href="/"
        className="instrument mt-10 text-cobalt underline decoration-2 underline-offset-8 transition-colors hover:text-poppy"
      >
        ← Back to the field log
      </Link>
    </div>
  );
}
