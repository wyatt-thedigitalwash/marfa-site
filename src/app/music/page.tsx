import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Music | Marfa",
  description:
    "Stream Marfa on Spotify, Apple Music, and Amazon Music. Country-rock and Americana from Big Machine Records.",
  openGraph: {
    title: "Music | Marfa",
    description:
      "Stream Marfa on Spotify, Apple Music, and Amazon Music. Country-rock and Americana from Big Machine Records.",
    url: "https://marfabandofficial.com/music",
    type: "website",
    siteName: "Marfa",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Music | Marfa",
    description:
      "Stream Marfa on Spotify, Apple Music, and Amazon Music. Country-rock and Americana from Big Machine Records.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://marfabandofficial.com/music" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://marfabandofficial.com" },
    { "@type": "ListItem", position: 2, name: "Music", item: "https://marfabandofficial.com/music" },
  ],
};

const STREAMING = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/0qQCr8kpPnhZHnnHoVtErD",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/artist/marfa/1764209879",
  },
  {
    label: "Amazon Music",
    href: "https://music.amazon.com/artists/B0FHBWNFGM/marfa",
  },
];

const RELEASES = [
  {
    title: "If It Ain't You",
    cover: "/covers/Marfa_IfItAintYou_Cover.jpg",
    link: "https://marfamusic.ffm.to/ifitaintyou",
  },
  {
    title: "American Blues",
    cover: "/covers/Marfa_AmericanBlues_Cover.jpg",
    link: "https://ffm.to/americanblues",
  },
  {
    title: "A Million Ways",
    cover: "/covers/Marfa_AMillionWays_Cover.jpg",
    link: "https://ffm.to/amillionways",
  },
  {
    title: "Little Miss Two Time",
    cover: "/covers/Marfa_LittleMissTwoTime_Cover.jpg",
    link: "https://ffm.to/marfalittlemisstwotime",
  },
  {
    title: "American Lonely",
    cover: "/covers/Marfa_AmericanLonely_Cover.jpg",
    link: "https://ffm.to/americanlonely",
  },
  {
    title: "Little Lowdown",
    cover: "/covers/Marfa_LittleLowdown_Cover.jpg",
    link: "https://marfa.lnk.to/LittleLowdown",
  },
  {
    title: "Sugar",
    cover: "/covers/Marfa_Sugar_Cover.jpg",
    link: "https://ffm.to/marfasugar",
  },
];

export default function MusicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div
      className="pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-10"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <h1
        className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] text-center mb-10 md:mb-12"
        style={{ color: "var(--color-black)" }}
      >
        Music
      </h1>

      {/* Streaming profile links */}
      <div className="flex items-center justify-center gap-6 md:gap-8 mb-16 md:mb-24">
        {STREAMING.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.15em] pb-0.5 hover:opacity-60 transition-opacity"
            style={{
              color: "var(--color-black)",
              borderBottom: "1px solid var(--color-black)",
            }}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Releases grid */}
      <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-10 md:gap-y-16">
        {RELEASES.map((release) => (
          <a
            key={release.title}
            href={release.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={release.cover}
                alt={`${release.title} cover art`}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <h2
              className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-[0.18em] text-center mt-4 md:mt-5"
              style={{ color: "var(--color-black)" }}
            >
              {release.title}
            </h2>
          </a>
        ))}
      </div>
    </div>
    </>
  );
}
