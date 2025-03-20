import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/prismicio";
import Header from "./component/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function  generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("settings");
  return {
    title: page.data.site_text || "nothing",
    description:
    page.data.meta_discription || "Lotus flowers",
    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  };
}

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
        <Header/>
        {children}
        <footer>footer1</footer>
      </body>
    </html>
  );
}
