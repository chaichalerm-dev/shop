import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "APEX — Premium Supplement & Wellness Store",
    template: "%s | APEX",
  },
  description:
    "Thailand's premier destination for premium sports nutrition, protein, pre-workouts, and wellness supplements from top global brands.",
  keywords: [
    "protein powder",
    "pre-workout",
    "supplements",
    "sports nutrition",
    "Ghost",
    "Optimum Nutrition",
    "Dymatize",
    "Thailand",
  ],
  authors: [{ name: "APEX" }],
  creator: "APEX",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "APEX",
    title: "APEX — Premium Supplement & Wellness Store",
    description: "Thailand's premier destination for premium sports nutrition.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
