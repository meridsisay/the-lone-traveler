import type { Metadata } from "next";
import { Spectral, Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import "./globals.css";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
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
  title: {
    default: "The Lone Traveler",
    template: "%s · The Lone Traveler",
  },
  description: "Stories and photographs from a solo journey through the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spectral.variable} ${schibsted.variable} ${plexMono.variable} flex min-h-svh flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
