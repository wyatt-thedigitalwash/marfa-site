import Image from "next/image";
import Link from "next/link";

const TILES = [
  { label: "Music", href: "/music", image: "/backgrounds/marfa_image1.jpg" },
  { label: "Video", href: "/video", image: "/backgrounds/marfa_image2.jpg" },
  { label: "Tour", href: "/tour", image: "/backgrounds/marfa_image3.jpg" },
];

export default function Highlights() {
  return (
    <section
      aria-label="Explore Marfa"
      className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 p-3 md:p-4"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {TILES.map((tile) => (
        <Link
          key={tile.label}
          href={tile.href}
          aria-label={tile.label}
          className="group relative block aspect-square w-full overflow-hidden"
        >
          <Image
            src={tile.image}
            alt={`Marfa ${tile.label}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#211F21]/50 transition-colors duration-500 group-hover:bg-[#211F21]/30" />
          <span
            className="absolute inset-0 z-10 flex items-center justify-center font-[family-name:var(--font-display)] uppercase tracking-[0.2em] text-2xl md:text-4xl transition-opacity duration-300 group-hover:opacity-80"
            style={{ color: "var(--color-cream)" }}
          >
            {tile.label}
          </span>
        </Link>
      ))}
    </section>
  );
}
