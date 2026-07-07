import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Field desk",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="instrument text-poppy">Field desk</p>
      <h1 className="mt-4 font-punch text-5xl font-extrabold tracking-tight">
        Owner sign-in
      </h1>
      <p className="mt-5 max-w-sm font-reader text-lg leading-relaxed text-inksoft">
        This desk belongs to the traveler. Sign in with the owner’s Google
        account to open it.
      </p>
      {error && (
        <p className="mt-6 max-w-sm text-sm font-medium text-poppy">
          {error === "AccessDenied"
            ? "That Google account isn’t the owner’s. Only the allowlisted account can enter."
            : "Sign-in didn’t complete. Try again."}
        </p>
      )}
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/admin" });
        }}
      >
        <button
          type="submit"
          className="mt-10 rounded-full bg-sunny px-7 py-3.5 font-punch text-sm font-bold text-ink shadow-[0_10px_24px_rgb(239_169_46/0.45)] transition-transform hover:-translate-y-0.5"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
