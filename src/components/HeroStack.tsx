import Image from "next/image";

export default function HeroStack() {
  return (
    <section aria-label="Hero" className="relative">
      {/* Panel 1: The front door */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dgbiatexy/image/upload/v1784166833/marfa_4_ikoqov.jpg"
          alt="Marfa band"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(33, 31, 33, 0.5)" }}
        />
        <h1 className="relative z-10 w-[80vw] max-w-[1100px]">
          <Image
            src="/branding/Marfa_LogoWhite.png"
            alt="Marfa"
            width={1920}
            height={1090}
            priority
            unoptimized
            className="w-full h-auto"
          />
          <span className="sr-only">Marfa</span>
        </h1>
      </div>
    </section>
  );
}
