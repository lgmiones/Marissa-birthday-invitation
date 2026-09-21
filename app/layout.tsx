import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pickle & Party: Mariz Turns 60!",
  description: "Join us for Mariz’s 60th birthday celebration at Zions Pickleball.",
  openGraph: {
    title: "Pickle & Party: Mariz Turns 60!",
    description: "Join us for Mariz’s 60th birthday celebration at Zions Pickleball.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3D0D8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
