import type { Metadata } from "next";
import { Italiana, Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const parfumerie = localFont({
  src: "../fonts/ParfumerieScriptPro.woff2", 
  variable: "--font-parfumerie",
  display: "swap",
})
    

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jayden & Jamelle · 17 January 2026",
  description:
    "Jayden and Jamelle are getting married on the 17th of January, 2026. Ceremony followed by reception at Lantana Venues, Bonnyrigg.",
  openGraph: {
    title: "Jayden & Jamelle",
    description: "We're getting married — 17 January 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${cormorant.variable} ${inter.variable} ${parfumerie.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
