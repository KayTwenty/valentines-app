import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Are You Compatible with KayTwenty? (Probably Not)",
  description:
    "Find out if you're compatible with KayTwenty using bullshit pseudoscience and your Discord ID. Spoiler: you're probably getting ghosted. 💔",
  keywords: [
    "KayTwenty",
    "Discord",
    "compatibility test",
    "love calculator",
    "meme",
  ],
  authors: [{ name: "KayTwenty" }],
  openGraph: {
    title: "Are You Compatible with KayTwenty?",
    description:
      "Probably not, but let's embarrass you with some fake math anyway. Log in with Discord to face the truth. 💀",
    url: "https://love.kaytwenty.com",
    siteName: "Love Compatibility with KayTwenty",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Love Compatibility with KayTwenty",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Are You Compatible with KayTwenty?",
    description:
      "Spoiler: You're not. But check your brutal compatibility score anyway. 💔",
    creator: "@kaytwenty",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
