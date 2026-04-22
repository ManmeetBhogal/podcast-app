import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Figtree } from "next/font/google";
import '@/app/ui/globals.css';
import Script from "next/script";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "brainSTEM Podcast",
  description: "The brainSTEM podcast",
  icons: {
    icon: "/BrainSTEM_Transparent_NoText.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ position: "relative" }}>
      <body
        className={`${figtree.variable} antialiased`}
      >
        {children}

        {/* Umami Analytics Configuration
              - afterInteractive so it loads it after page is interactive to prevent rendering block */}
        <Script
          src="/stats/script.js"
          data-website-id="9aba93a1-34a2-49e3-97b6-578565ba53dc"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
