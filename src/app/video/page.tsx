import type { Metadata } from "next";
import VideoGrid from "@/components/VideoGrid";

export const metadata: Metadata = {
  title: "Video | Marfa",
  description:
    "Watch official music videos, live sessions, and acoustic performances from Marfa. Country-rock and Americana.",
  openGraph: {
    title: "Video | Marfa",
    description:
      "Watch official music videos, live sessions, and acoustic performances from Marfa. Country-rock and Americana.",
    url: "https://marfabandofficial.com/video",
    type: "website",
    siteName: "Marfa",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video | Marfa",
    description:
      "Watch official music videos, live sessions, and acoustic performances from Marfa. Country-rock and Americana.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://marfabandofficial.com/video" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://marfabandofficial.com" },
    { "@type": "ListItem", position: 2, name: "Video", item: "https://marfabandofficial.com/video" },
  ],
};

const VIDEOS = [
  { title: "If It Ain't You (Official Video)", id: "4JNaoEFPTcM" },
  { title: "American Blues (Official Video)", id: "4lXVYpu6AS4" },
  { title: "A Million Ways (Official Video)", id: "61HJZ4YPEgI" },
  { title: "American Lonely", id: "ZM8fvt7Gjr4" },
  { title: "Daisy (Official Video)", id: "cu8QK8rT9-o" },
  { title: "Little Miss Two Time", id: "T7FR-oMtlFg" },
  { title: '\u201c66\u201d (Live) - Sendero Sessions', id: "oFAfRvIkpVs" },
  {
    title: '\u201cSugar\u201d (Live) - Sendero Sessions EP1',
    id: "akIvNrrrzh8",
  },
  { title: "Daisy (Live Acoustic)", id: "AXrah1J2MPM" },
  { title: "Run For My Money (Acoustic)", id: "x_oTdag7eLc" },
];

export default function VideoPage() {
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
        className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] text-center mb-12 md:mb-16"
        style={{ color: "var(--color-black)" }}
      >
        Video
      </h1>

      <VideoGrid videos={VIDEOS} />
    </div>
    </>
  );
}
