import type { Metadata } from "next";
import { Onest, Outfit, Unbounded } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "S'accorder — mettre au clair les façons de travailler d'une équipe",
  description:
    "Chaque personne exprime sa façon de travailler. L'outil fait ressortir ce qui rassemble et ce qui diverge, pour en tirer des règles d'équipe claires.",
  openGraph: {
    title: "S'accorder — mettre au clair les façons de travailler d'une équipe",
    description:
      "Chaque personne exprime sa façon de travailler. L'outil fait ressortir ce qui rassemble et ce qui diverge, pour en tirer des règles d'équipe claires.",
    siteName: "S'accorder",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S'accorder — mettre au clair les façons de travailler d'une équipe",
    description:
      "Chaque personne exprime sa façon de travailler. L'outil fait ressortir ce qui rassemble et ce qui diverge, pour en tirer des règles d'équipe claires.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${onest.variable} ${unbounded.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">{children}</body>
    </html>
  );
}
