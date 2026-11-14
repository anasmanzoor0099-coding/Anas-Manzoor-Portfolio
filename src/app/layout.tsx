import type { Metadata, Viewport } from "next";
import { portfolioData } from "@/data/portfolio-data";
import "./globals.css";

export const metadata: Metadata = {
  title: `${portfolioData.personal.name} — Software Engineering Student & Full-Stack Developer`,
  description: portfolioData.hero.description,
  keywords: [
    "Anas Manzoor",
    "Muhammad Anas Manzoor",
    "Software Engineering Student",
    "Full-Stack Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Developer Portfolio",
  ],
  authors: [{ name: portfolioData.personal.name }],
  creator: portfolioData.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${portfolioData.personal.name} — Interactive Developer Portfolio`,
    description: portfolioData.hero.description,
    siteName: `${portfolioData.personal.name} Portfolio`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#050505] font-sans text-[#FFFFFF] antialiased selection:bg-[#FFFFFF] selection:text-[#050505]">
        {children}
      </body>
    </html>
  );
}
