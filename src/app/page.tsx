import type { Metadata } from "next";
import HeroStack from "@/components/HeroStack";
import FilmReel from "@/components/FilmReel";
// import About from "@/components/About"; // temporarily hidden pending new copy
import Discography from "@/components/Discography";
import Highlights from "@/components/Highlights";
import TourPreview from "@/components/TourPreview";
import Signup from "@/components/Signup";

export const metadata: Metadata = {
  title: "Marfa | Official Site",
  description:
    "Country-rock and Americana band on Big Machine Records. Born from Texas, Colorado, and California's Laurel Canyon.",
  openGraph: {
    title: "Marfa | Official Site",
    description:
      "Country-rock and Americana band on Big Machine Records. Born from Texas, Colorado, and California's Laurel Canyon.",
    url: "https://www.officialmarfa.com",
    type: "website",
    siteName: "Marfa",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marfa | Official Site",
    description:
      "Country-rock and Americana band on Big Machine Records. Born from Texas, Colorado, and California's Laurel Canyon.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.officialmarfa.com" },
};

export default function Home() {
  return (
    <>
      <HeroStack />

      <TourPreview />

      <FilmReel />

      {/* About temporarily hidden pending new copy -- restore this block (and
          its cream breath spacer) once the new text arrives.
      <section
        className="py-20 md:py-32"
        style={{ backgroundColor: "var(--color-cream)" }}
        aria-hidden="true"
      />
      <About /> */}

      <Discography />
      <Highlights />
      <Signup />
    </>
  );
}
