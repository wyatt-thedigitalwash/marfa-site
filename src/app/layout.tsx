import type { Metadata } from "next";
import localFont from "next/font/local";
import { Newsreader } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Splash from "@/components/Splash";
import AnchorScroll from "@/components/shared/AnchorScroll";
import CookieConsent from "@/components/consent/CookieConsent";
import RouteTracker from "@/components/consent/RouteTracker";
import TermsGate from "@/components/consent/TermsGate";
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

// EP-campaign fonts for the We'll All Be Okay splash ONLY. They ship with the
// EP's own branding and must not leak into the rest of the site, which stays
// on the SITE.md two-font system. Referenced nowhere but Splash.tsx.
const splashDisplay = localFont({
  src: "../../public/fonts/BootzyTM.ttf",
  variable: "--font-splash-display",
  display: "swap",
});

const splashLabel = localFont({
  src: "../../public/fonts/Berthold Akzidenz Grotesk Regular.otf",
  variable: "--font-splash-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.officialmarfa.com"),
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
    url: "https://www.officialmarfa.com",
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
    canonical: "https://www.officialmarfa.com",
  },
  other: {
    "theme-color": "#E8E3CF",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Marfa",
  url: "https://www.officialmarfa.com",
  description:
    "Country-rock and Americana band on Big Machine Records. Born from Texas, Colorado, and California's Laurel Canyon.",
  image: "https://www.officialmarfa.com/og-image.jpg",
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
      // The pre-paint head script may add `splash-entered` / `splash-exempt`
      // to <html> before React hydrates, so its className intentionally differs
      // from the server render on those routes.
      suppressHydrationWarning
      className={`${boringSans.variable} ${newsreader.variable} ${splashDisplay.variable} ${splashLabel.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before first paint: hide the splash for visitors who already
            entered this session (splash-entered), or who are deep-linking
            straight to a legal page (splash-exempt -- hidden but NOT entered),
            so they never see even a flash of it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var e=document.documentElement;if(sessionStorage.getItem('marfa_splash_wellallbeokay_ep')){e.classList.add('splash-entered')}else if(location.pathname.indexOf('/legal')===0){e.classList.add('splash-exempt')}}catch(err){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Splash />
        <AnchorScroll />
        {/* The label GTM container (GTM-5MF7DJ3X) is NOT loaded here. It is
            injected only after the visitor consents -- see
            components/consent/injectScripts.ts. */}
        <RouteTracker />
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
        <CookieConsent />
        <TermsGate />
      </body>
    </html>
  );
}
