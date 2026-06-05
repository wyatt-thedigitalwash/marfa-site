const PARAGRAPHS = [
  `Born and raised to a Texas country soundtrack, forged in Colorado from a shared love of rock icons past and present, and ignited by the spirit of California\u2019s Laurel Canyon sound, Marfa has arrived with an undeniably authentic sound as familiar as your favorite pair of Wranglers while as fresh as the morning Rocky Mountain air.`,
  `Their debut single \u201c66\u201d, produced by Grammy Award winning producer Nick Waterhouse (Leon Bridges, Jon Batiste) and recorded at LA\u2019s EastWest Studios inside the same four walls that gave life to The Beach Boys\u2019 Pet Sounds and The Mamas and the Papas\u2019 California Dreamin\u2019, puts the pedal-to-the-metal straight out of the gate on this top down road trip through the highways, byways, and everywhere in between.`,
  `With the release of \u201cDaisy\u201d, produced by Grammy Award nominated Josh Block (Caamp, Leon Bridges) and written in the storied Canyon itself, the band channels influences from CSNY to the Eagles, taking listeners on a harmony-driven acoustic journey to find a long lost friend.`,
  `Upcoming releases produced by 3-time Grammy Award nominated Jonathan Wilson (Dawes, Father John Misty, Billy Strings) coming soon.`,
];

export default function About() {
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
          About
        </h2>
        <div className="flex flex-col gap-6 md:gap-8">
          {PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className="font-[family-name:var(--font-body)] text-base md:text-lg leading-relaxed md:leading-relaxed"
              style={{ color: "var(--color-black)" }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
