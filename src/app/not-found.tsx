import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-6 text-center">
      <p className="instrument text-lowsun">Off the map</p>
      <h1 className="mt-5 font-display text-4xl font-extralight sm:text-5xl">
        This trail doesn’t exist.
      </h1>
      <Link
        href="/"
        className="instrument mt-10 text-haze transition-colors hover:text-lowsun"
      >
        ← Back to the field log
      </Link>
    </div>
  );
}
