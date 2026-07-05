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
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-6 text-center">
      <p className="instrument text-lowsun">Field desk</p>
      <h1 className="mt-5 font-display text-4xl font-extralight">
        Owner sign-in
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-haze">
        This desk belongs to the traveler. Sign in with the owner’s Google
        account to open it.
      </p>
      {error && (
        <p className="mt-6 max-w-sm text-sm text-lowsun">
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
          className="instrument mt-10 border border-hairline px-6 py-3 text-moonstone transition-colors hover:border-lowsun hover:text-lowsun"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
