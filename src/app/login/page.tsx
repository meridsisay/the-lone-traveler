import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field desk",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-6">
      <p className="instrument text-lowsun">Field desk</p>
      <h1 className="mt-5 font-display text-4xl font-extralight">
        Owner sign-in
      </h1>
      <p className="mt-4 max-w-sm text-center text-sm leading-relaxed text-haze">
        This desk belongs to the traveler. Sign-in opens once the journal’s
        keys are configured.
      </p>
    </div>
  );
}
