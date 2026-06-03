import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OCEAN GUARD AI | Maritime Intelligence Platform",
  description:
    "AI-powered maritime monitoring platform for vessel tracking, threat detection, environmental protection, and autonomous coast guard operations.",
  keywords: [
    "Artificial Intelligence",
    "Maritime Security",
    "Ocean Monitoring",
    "Illegal Fishing Detection",
    "Coast Guard",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased min-h-screen selection:bg-primary-cyan/30 selection:text-primary-cyan">
        {children}
      </body>
    </html>
  );
}