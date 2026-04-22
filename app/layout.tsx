import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/common/Nav";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tags",
  description: "One Search. All Trends. Real Insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <Nav/>
      <body className="min-h-full flex flex-col">{children}</body>
      <Footer/>
    </html>
  );
}