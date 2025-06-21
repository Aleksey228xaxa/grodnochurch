import type { Metadata } from "next";
import "./globals.css";
import { createClient } from "@/prismicio";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Inter } from 'next/font/google';
import { Providers } from './Providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("settings");

  return {
    title: page.data.site_text || "nothing",
    description: page.data.meta_discription || "Lotus flowers",
    openGraph: {
      images: [page.data.og_image?.url || ""],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden', width: '100%' }}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
