import type { Metadata } from "next";
import localFont from "next/font/local";
import { Newsreader } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const boringSans = localFont({
  src: "../../public/fonts/BoringSansBold.ttf",
  variable: "--font-boring-sans",
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marfabandofficial.com"),
  title: "Marfa | Official Site",
  description:
    "Country-rock and Americana band on Big Machine Records. Born from Texas, Colorado, and California's Laurel Canyon.",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Marfa",
    title: "Marfa | Official Site",
    description:
      "Country-rock and Americana band on Big Machine Records. Born from Texas, Colorado, and California's Laurel Canyon.",
    url: "https://marfabandofficial.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marfa | Official Site",
    description:
      "Country-rock and Americana band on Big Machine Records. Born from Texas, Colorado, and California's Laurel Canyon.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://marfabandofficial.com",
  },
  other: {
    "theme-color": "#E8E3CF",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Marfa",
  url: "https://marfabandofficial.com",
  description:
    "Country-rock and Americana band on Big Machine Records. Born from Texas, Colorado, and California's Laurel Canyon.",
  image: "https://marfabandofficial.com/og-image.jpg",
  genre: ["Country Rock", "Americana"],
  sameAs: [
    "https://www.instagram.com/marfabandofficial/",
    "https://www.tiktok.com/@officialmarfaband",
    "https://www.facebook.com/marfabandofficial",
    "https://www.youtube.com/@officialmarfa",
    "https://open.spotify.com/artist/0qQCr8kpPnhZHnnHoVtErD",
    "https://music.apple.com/us/artist/marfa/1764209879",
    "https://music.amazon.com/artists/B0FHBWNFGM/marfa",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${boringSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
