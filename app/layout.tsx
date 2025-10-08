import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Figtree } from "next/font/google";
import '@/app/ui/globals.css';

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
        className={`${figtree.variable} ${figtree.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
