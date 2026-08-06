import Image from "next/image";
import { RELEASES } from "@/lib/releases";

// Flush, edge-to-edge wall of cover art. No titles -- each cover links to its
// streaming smart-link. Capped at the newest eight so the desktop grid stays a
// single clean row of eight; older singles still live on /music.
const HOME_WALL_COUNT = 8;

export default function Discography() {
  return (
    <section
      aria-label="Marfa singles"
      className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 p-3 md:p-4"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {RELEASES.slice(0, HOME_WALL_COUNT).map((release) => (
        <a
          key={release.title}
          href={release.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${release.title} (opens in new tab)`}
          className="group relative block aspect-square overflow-hidden"
        >
          <Image
            src={release.cover}
            alt={`${release.title} cover art`}
            fill
            sizes="(min-width: 768px) 12.5vw, 25vw"
            loading="lazy"
            unoptimized
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </a>
      ))}
    </section>
  );
}
