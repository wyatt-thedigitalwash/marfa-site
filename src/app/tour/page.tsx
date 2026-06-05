import type { Metadata } from "next";
import {
  getUpcomingEvents,
  getTicketUrl,
  getRsvpUrl,
  formatEventDate,
  formatCityRegion,
  getSupport,
  FOLLOW_URL,
  PLAY_MY_CITY_URL,
} from "@/lib/bandsintown";

export const metadata: Metadata = {
  title: "Tour | Marfa",
  description:
    "See Marfa live. Upcoming tour dates, tickets, and RSVP. Country-rock and Americana on the road.",
  openGraph: {
    title: "Tour | Marfa",
    description:
      "See Marfa live. Upcoming tour dates, tickets, and RSVP. Country-rock and Americana on the road.",
    url: "https://marfabandofficial.com/tour",
    type: "website",
    siteName: "Marfa",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour | Marfa",
    description:
      "See Marfa live. Upcoming tour dates, tickets, and RSVP. Country-rock and Americana on the road.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://marfabandofficial.com/tour" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://marfabandofficial.com" },
    { "@type": "ListItem", position: 2, name: "Tour", item: "https://marfabandofficial.com/tour" },
  ],
};

export default async function TourPage() {
  const events = await getUpcomingEvents();

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
        Tour
      </h1>

      {events.length === 0 ? (
        <div className="max-w-[680px] mx-auto text-center">
          <p
            className="font-[family-name:var(--font-body)] text-base md:text-lg"
            style={{ color: "var(--color-black)" }}
          >
            No upcoming dates.{" "}
            <a
              href={FOLLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-60 transition-opacity"
            >
              Follow on Bandsintown
            </a>{" "}
            to stay updated.
          </p>
        </div>
      ) : (
        <div className="max-w-[780px] mx-auto">
          <div className="flex flex-col">
            {events.map((event) => {
              const support = getSupport(event);
              const isFree = event.free;
              return (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row md:items-center justify-between py-5 md:py-6 gap-2 md:gap-4"
                  style={{
                    borderBottom: "1px solid rgba(33, 31, 33, 0.15)",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:gap-8 min-w-0">
                    <span
                      className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.1em] shrink-0 md:w-24"
                      style={{ color: "var(--color-black)" }}
                    >
                      {formatEventDate(event.datetime)}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span
                        className="font-[family-name:var(--font-body)] text-base truncate"
                        style={{ color: "var(--color-black)" }}
                      >
                        {event.venue.name}
                      </span>
                      {support.length > 0 && (
                        <span
                          className="font-[family-name:var(--font-body)] italic text-sm"
                          style={{
                            color: "var(--color-black)",
                            opacity: 0.65,
                          }}
                        >
                          with {support.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 mt-1 md:mt-0">
                    <span
                      className="font-[family-name:var(--font-body)] text-base shrink-0"
                      style={{ color: "var(--color-black)", opacity: 0.6 }}
                    >
                      {formatCityRegion(event.venue)}
                    </span>
                    <div className="flex items-center gap-5">
                    <a
                      href={getTicketUrl(event.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.15em] pb-0.5 hover:opacity-60 transition-opacity"
                      style={{
                        color: "var(--color-black)",
                        borderBottom: "1px solid var(--color-black)",
                      }}
                    >
                      {isFree ? "Free" : "Tickets"}
                    </a>
                    <a
                      href={getRsvpUrl(event.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.15em] pb-0.5 hover:opacity-60 transition-opacity"
                      style={{
                        color: "var(--color-black)",
                        borderBottom: "1px solid var(--color-black)",
                      }}
                    >
                      RSVP
                    </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 md:mt-16">
            <a
              href={FOLLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-[0.18em] pb-1 hover:opacity-60 transition-opacity"
              style={{
                color: "var(--color-black)",
                borderBottom: "1px solid var(--color-black)",
              }}
            >
              Follow on Bandsintown
            </a>
            <a
              href={PLAY_MY_CITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-[0.18em] pb-1 hover:opacity-60 transition-opacity"
              style={{
                color: "var(--color-black)",
                borderBottom: "1px solid var(--color-black)",
              }}
            >
              Play My City
            </a>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
