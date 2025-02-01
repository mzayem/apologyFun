import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apology App - Cute & Fun Way to Say Sorry",
  description:
    "A playful and heartfelt way to apologize with interactive messages and fun reactions.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.jpg",
      sizes: "256x256",
      type: "image/jpeg",
    },
    {
      rel: "shortcut icon",
      url: "/favicon.jpg",
    },
    {
      rel: "icon",
      url: "/favicon.jpg",
      type: "image/jpeg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
