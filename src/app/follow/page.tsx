import type { Metadata } from "next";
import Signup from "@/components/Signup";

export const metadata: Metadata = {
  title: "Follow | Marfa",
  description:
    "Follow Marfa on Instagram, TikTok, Facebook, YouTube, Spotify, Apple Music, and Amazon Music. Stay updated.",
  openGraph: {
    title: "Follow | Marfa",
    description:
      "Follow Marfa on Instagram, TikTok, Facebook, YouTube, Spotify, Apple Music, and Amazon Music. Stay updated.",
    url: "https://marfabandofficial.com/follow",
    type: "website",
    siteName: "Marfa",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Follow | Marfa",
    description:
      "Follow Marfa on Instagram, TikTok, Facebook, YouTube, Spotify, Apple Music, and Amazon Music. Stay updated.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://marfabandofficial.com/follow" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://marfabandofficial.com" },
    { "@type": "ListItem", position: 2, name: "Follow", item: "https://marfabandofficial.com/follow" },
  ],
};

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/marfabandofficial/" },
  { label: "TikTok", href: "https://www.tiktok.com/@officialmarfaband" },
  { label: "Facebook", href: "https://www.facebook.com/marfabandofficial" },
  { label: "YouTube", href: "https://www.youtube.com/@officialmarfa" },
];

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

export default function FollowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div
        className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-10"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <h1
          className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] text-center mb-12 md:mb-16"
          style={{ color: "var(--color-black)" }}
        >
          Follow
        </h1>

        <div className="max-w-[480px] mx-auto flex flex-col items-center gap-12 md:gap-16">
          {/* Social links */}
          <div className="flex flex-col items-center gap-5">
            {SOCIALS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-display)] text-sm md:text-base uppercase tracking-[0.18em] pb-0.5 hover:opacity-60 transition-opacity"
                style={{
                  color: "var(--color-black)",
                  borderBottom: "1px solid var(--color-black)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Streaming links */}
          <div className="flex flex-col items-center gap-5">
            <p
              className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] mb-2"
              style={{ color: "var(--color-black)", opacity: 0.65 }}
            >
              Stream
            </p>
            {STREAMING.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-display)] text-sm md:text-base uppercase tracking-[0.18em] pb-0.5 hover:opacity-60 transition-opacity"
                style={{
                  color: "var(--color-black)",
                  borderBottom: "1px solid var(--color-black)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Signup />
    </>
  );
}
