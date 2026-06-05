import Image from "next/image";

export default function HeroStack() {
  return (
    <section className="relative" style={{ height: "300vh" }}>
      {/* Panel 1: The front door */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/banners/MarfaBanner_Desktop.jpg"
          alt="Marfa band"
          fill
          className="object-cover hidden md:block"
          priority
        />
        <Image
          src="/banners/MarfaBanner_Mobile.jpg"
          alt="Marfa band"
          fill
          className="object-cover md:hidden"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(33, 31, 33, 0.5)" }}
        />
        <h1
          className="relative z-10 font-[family-name:var(--font-display)] uppercase tracking-[0.15em] md:tracking-[0.2em] text-center"
          style={{
            color: "var(--color-cream)",
            fontSize: "clamp(15vw, 18vw, 20vw)",
            lineHeight: 1,
          }}
        >
          Marfa
        </h1>
      </div>

      {/* Panel 2: If It Ain't You */}
      <a
        href="https://marfamusic.ffm.to/ifitaintyou"
        target="_blank"
        rel="noopener noreferrer"
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ display: "flex" }}
      >
        <Image
          src="/banners/Marfa_IfItAintYou_BannerDesktop.jpg"
          alt="If It Ain't You by Marfa"
          fill
          className="object-cover hidden md:block"
        />
        <Image
          src="/banners/Marfa_IfItAintYou_BannerMobile.jpg"
          alt="If It Ain't You by Marfa"
          fill
          className="object-cover md:hidden"
        />
        <span
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-[family-name:var(--font-display)] uppercase tracking-[0.2em]"
          style={{
            color: "var(--color-cream)",
            fontSize: "12px",
          }}
        >
          Listen
        </span>
      </a>

      {/* Panel 3: American Blues */}
      <a
        href="https://ffm.to/americanblues"
        target="_blank"
        rel="noopener noreferrer"
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ display: "flex" }}
      >
        <Image
          src="/banners/Marfa_AmericanBlues_BannerDesktop.jpg"
          alt="American Blues by Marfa"
          fill
          className="object-cover hidden md:block"
        />
        <Image
          src="/banners/Marfa_AmericanBlues_BannerMobile.jpg"
          alt="American Blues by Marfa"
          fill
          className="object-cover md:hidden"
        />
        <span
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-[family-name:var(--font-display)] uppercase tracking-[0.2em]"
          style={{
            color: "var(--color-cream)",
            fontSize: "12px",
          }}
        >
          Listen
        </span>
      </a>
    </section>
  );
}
