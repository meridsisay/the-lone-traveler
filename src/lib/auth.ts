import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    // Single-owner site: only the allowlisted Google account may sign in.
    signIn({ user }) {
      const email = user.email?.toLowerCase();
      const admin = process.env.ADMIN_EMAIL?.toLowerCase();
      return !!email && !!admin && email === admin;
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
