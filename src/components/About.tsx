import Image from "next/image";

const PARAGRAPHS = [
  `Marfa makes music somewhere between the hazy dreamscape of the mythical Laurel Canyon and the restless energy of modern indie rock. Texas and Washington-raised and shaped by their time in Colorado, Bryce Menchaca and Kellen Wall pair sun-soaked sonics, indie-rock DNA, and timeless storytelling into a sound that feels like the next chapter of the folk and rock icons who came before them, while remaining uniquely their own.`,
  `Now based in Nashville, TN, Bryce and Kellen have honed in on their artistry as songwriters. Being the sole writers for a majority of their catalog, it adds a fresh perspective knowing the lyrics are personal to Bryce and Kellen.`,
  `KCRW praised the duo for making \u201cmusic that ties Laurel Canyon to West Texas,\u201d while Billboard highlighted their range from Everly Brothers-inspired folk-pop to buzzy Americana-rock, calling their music \u201cdaring, unpretentious and commercially accessible.\u201d Ones To Watch highlighted their \u201ccommitment to storytelling and crafting songs that transport listeners to a vivid, specific place.\u201d The band was also named \u201cBest Breakout Folk Duo\u201d by Westword and featured in HITS Daily Double\u2019s \u201cNew & Developing\u201d roundup alongside Olivia Dean and KATSEYE.`,
  `Signed to Big Machine Records/ASCEND Music, Marfa has steadily built momentum with songs like breakout track \u201cDaisy,\u201d produced by Josh Block, which is closing in on 10M streams, \u201cRun For My Money,\u201d produced by Jonathan Wilson, \u201cIf It Ain\u2019t You,\u201d produced by Andrew DeRoberts, and more.`,
  `Marfa\u2019s upcoming project, produced by Ryan Marrone (Sabrina Carpenter, JP Saxe), opens the door to an even bigger, more cinematic chapter, one that stretches beyond the confines of Americana without losing what makes the duo feel unmistakably human. After sharing stages with The Head and The Heart, Band of Horses, 49 Winchester, Willow Avalon and many others, the pair will continue on the road with Houndmouth and a run of co-headlining dates with Jason Scott & The High Heat this fall.`,
];

export default function About() {
  return (
    <section aria-label="About Marfa" className="relative overflow-hidden">
      {/* Fixed background — desktop: CSS background-attachment fixed */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: "url(/backgrounds/marfa_image4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Fixed background — mobile: absolutely positioned (avoids iOS Safari bug) */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/backgrounds/marfa_image4.jpg"
          alt="Marfa band"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(33, 31, 33, 0.5)" }}
      />

      {/* Content with vertical padding for image reveal */}
      <div className="relative z-10 pt-[30vh] pb-[30vh] px-6 md:px-10">
        <div
          id="about"
          className="max-w-[680px] mx-auto py-20 md:py-32 px-6 md:px-16 scroll-mt-24"
          style={{ backgroundColor: "var(--color-cream)" }}
        >
          <h2
            className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] text-center mb-12 md:mb-16"
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
      </div>
    </section>
  );
}
