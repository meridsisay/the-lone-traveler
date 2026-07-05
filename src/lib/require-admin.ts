import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Defense in depth beyond the middleware matcher: every admin surface
 * (layout, server actions, sign endpoint) re-checks the session itself.
 */
export async function requireAdmin() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  const admin = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!email || !admin || email !== admin) {
    redirect("/login");
  }
  return session!;
}
