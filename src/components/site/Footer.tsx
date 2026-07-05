import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="instrument text-haze">
          The Lone Traveler · est. {new Date().getFullYear()}
        </p>
        <p className="instrument text-haze">
          <Link href="/login" className="transition-colors hover:text-moonstone">
            Field desk
          </Link>
        </p>
      </div>
    </footer>
  );
}
