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

export default async function TourPreview() {
  const events = await getUpcomingEvents();

  return (
    <section
      aria-label="Tour dates"
      className="px-6 md:px-10 py-20 md:py-32"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-[780px] mx-auto">
        <h2
          className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] text-center mb-12 md:mb-16"
          style={{ color: "var(--color-black)" }}
        >
          Tour
        </h2>

        {events.length === 0 ? (
          <p
            className="font-[family-name:var(--font-body)] text-base md:text-lg text-center"
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
        ) : (
          <>
            <div className="flex flex-col">
              {events.map((event) => {
                const support = getSupport(event);
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
                        {event.free ? "Free" : "Tickets"}
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
          </>
        )}
      </div>
    </section>
  );
}
