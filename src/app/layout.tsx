import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DRISHTI | AI Engineer — Cyberpunk Portfolio",
  description:
    "AI Engineer building intelligent systems, LLM infrastructures, and cinematic digital experiences. Explore the synthetic operating system of Drishti.",
  keywords: [
    "AI Engineer",
    "Portfolio",
    "Deep Learning",
    "LLM",
    "RAG Systems",
    "Full-Stack",
    "Drishti",
  ],
  authors: [{ name: "Drishti" }],
  creator: "Drishti",
  metadataBase: new URL("https://drishtiii.in"),
  openGraph: {
    title: "DRISHTI.EXE — AI Engineer Portfolio",
    description:
      "Enter the synthetic consciousness of an AI Engineer. Building intelligent systems, LLM infrastructures, and cinematic digital experiences.",
    url: "https://drishtiii.in",
    siteName: "DRISHTI.EXE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DRISHTI.EXE — AI Engineer Portfolio",
    description:
      "Enter the synthetic consciousness of an AI Engineer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="bg-cyber-black text-gray-200 font-body antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
