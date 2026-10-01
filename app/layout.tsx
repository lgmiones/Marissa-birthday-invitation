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

const SITE_URL = "https://marissa-60th-birthday-invitation.netlify.app";
const DESCRIPTION =
  "Join us for Mariz’s 60th birthday celebration at Zions Pickleball — Sunday, October 11, 2026, 5:00 PM.";

export const metadata: Metadata = {
  // Absolute URLs for the link-preview image shared on Messenger, Facebook, etc.
  metadataBase: new URL(SITE_URL),
  title: "Pickle & Party: Mariz Turns 60!",
  description: DESCRIPTION,
  openGraph: {
    title: "Pickle & Party: Mariz Turns 60!",
    description: DESCRIPTION,
    siteName: "Pickle & Party",
    url: SITE_URL,
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickle & Party: Mariz Turns 60!",
    description: DESCRIPTION,
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
