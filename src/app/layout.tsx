import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Newsreader,
  Schibsted_Grotesk,
  IBM_Plex_Mono,
} from "next/font/google";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Ticker from "@/components/site/Ticker";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "The Lone Traveler",
    template: "%s · The Lone Traveler",
  },
  description: "Stories and photographs from a solo journey through the world.",
  openGraph: {
    siteName: "The Lone Traveler",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${newsreader.variable} ${schibsted.variable} ${plexMono.variable} flex min-h-svh flex-col`}
      >
        <Ticker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
