import Link from "next/link";

const PLACEHOLDER_DATES = [
  { date: "Jun 11", venue: "Laurel Cove Amphitheater", city: "Pineville, KY", ticketUrl: "#" },
  { date: "Jun 25", venue: "Skinny Dennis", city: "Nashville, TN", ticketUrl: "#" },
  { date: "Jul 22", venue: "North Midway Park", city: "Broomfield, CO", ticketUrl: "#" },
  { date: "Jul 23", venue: "The Lincoln Cheyenne", city: "Cheyenne, WY", ticketUrl: "#" },
];

export default function TourPreview() {
  return (
    <section
      className="px-6 md:px-10 py-20 md:py-32"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-[680px] mx-auto">
        <h2
          className="font-[family-name:var(--font-display)] text-sm md:text-base uppercase tracking-[0.2em] text-center mb-12 md:mb-16"
          style={{ color: "var(--color-black)" }}
        >
          Tour
        </h2>

        <div className="flex flex-col">
          {PLACEHOLDER_DATES.map((show, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between py-4 md:py-5"
              style={{
                borderBottom: "1px solid var(--color-black)",
                borderBottomColor: "rgba(33, 31, 33, 0.15)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-2 md:mb-0">
                <span
                  className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.1em] md:w-20"
                  style={{ color: "var(--color-black)" }}
                >
                  {show.date}
                </span>
                <span
                  className="font-[family-name:var(--font-body)] text-base"
                  style={{ color: "var(--color-black)" }}
                >
                  {show.venue}
                </span>
                <span
                  className="font-[family-name:var(--font-body)] text-base"
                  style={{ color: "var(--color-black)", opacity: 0.6 }}
                >
                  {show.city}
                </span>
              </div>
              <a
                href={show.ticketUrl}
                className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.15em] pb-0.5 self-start md:self-center hover:opacity-60 transition-opacity"
                style={{
                  color: "var(--color-black)",
                  borderBottom: "1px solid var(--color-black)",
                }}
              >
                Tickets
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/tour"
            className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-[0.18em] pb-1 hover:opacity-60 transition-opacity"
            style={{
              color: "var(--color-black)",
              borderBottom: "1px solid var(--color-black)",
            }}
          >
            See All Dates
          </Link>
        </div>
      </div>
    </section>
  );
}
