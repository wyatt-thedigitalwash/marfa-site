"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Bump this key when a new single ships to re-show the splash to everyone.
const SPLASH_KEY = "marfa_splash_remedy";
const LISTEN_URL = "https://marfamusic.ffm.to/remedy.OWE";

// Longest the content will wait on the artwork before revealing anyway. A slow
// connection or a broken image must never leave "Enter Site" invisible.
const REVEAL_TIMEOUT_MS = 1200;

export default function Splash() {
  const pathname = usePathname();

  // The cascade is held until the cover art is actually on screen to cascade
  // over. Without this the text finishes animating before the artwork arrives,
  // so the splash appears to load in a random order.
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const ready = timedOut || coverLoaded;

  useEffect(() => {
    const timer = window.setTimeout(() => setTimedOut(true), REVEAL_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Keep the splash from blocking legal pages. On /legal routes we add
  // `splash-exempt` to <html> (splash hidden + scroll unlocked) WITHOUT marking
  // the visitor entered, so reading the Terms is not treated as agreeing. This
  // runs on client navigation too (e.g. clicking the notice link on the splash);
  // the head script handles the very first paint.
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("splash-entered")) return;
    root.classList.toggle("splash-exempt", pathname.startsWith("/legal"));
  }, [pathname]);

  const enterSite = () => {
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      // sessionStorage may be unavailable (private mode); dismiss anyway.
    }
    const overlay = document.getElementById("splash-overlay");
    if (overlay) {
      overlay.classList.add("is-exiting");
      window.setTimeout(() => {
        document.documentElement.classList.add("splash-entered");
      }, 800);
    } else {
      document.documentElement.classList.add("splash-entered");
    }
  };

  return (
    <div
      id="splash-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Marfa -- pre-save the new single, Remedy"
    >
      {/* Backdrop: the cover's own room, cropped to the desk lamp and blown out
          of focus so only the light falloff survives. It puts the practical
          upper-left, behind the artwork, and leaves the right side near-black
          for the headline. Desktop landscape / mobile portrait. */}
      <Image
        src="/backgrounds/Marfa_Remedy_BG_Mobile.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        priority
        className="object-cover md:hidden"
      />
      <Image
        src="/backgrounds/Marfa_Remedy_BG_Desktop.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        priority
        className="object-cover hidden md:block"
      />

      {/* Content */}
      <div
        className={`${ready ? "splash-ready " : ""}relative h-full w-full flex items-center justify-center px-6 py-16 overflow-y-auto`}
      >
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-5xl w-full">
          {/* Album cover (also links out) */}
          <a
            href={LISTEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pre-save Remedy (opens in new tab)"
            className="splash-rise relative block w-72 h-72 md:w-[30rem] md:h-[30rem] shrink-0 overflow-hidden shadow-2xl"
            style={{ animationDelay: "0ms" }}
          >
            <Image
              src="/covers/Marfa_Remedy_Cover.jpg"
              alt="Remedy cover art"
              fill
              sizes="(max-width: 768px) 288px, 480px"
              priority
              ref={(img) => {
                if (img?.complete) setCoverLoaded(true);
              }}
              onLoad={() => setCoverLoaded(true)}
              onError={() => setCoverLoaded(true)}
              className="object-cover"
            />
          </a>

          {/* Text + actions */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span
              className="splash-rise font-[family-name:var(--font-display)] uppercase tracking-[0.35em] mr-[-0.35em] text-[11px]"
              style={{ color: "var(--color-cream)", "--rise-to": 0.75, animationDelay: "180ms" } as React.CSSProperties}
            >
              Pre-Save
            </span>
            <h1
              className="splash-rise mt-4 font-[family-name:var(--font-display)] uppercase tracking-[0.12em] leading-[0.95]"
              style={{
                color: "var(--color-cream)",
                fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                animationDelay: "300ms",
              }}
            >
              Remedy
            </h1>
            <p
              className="splash-rise mt-4 font-[family-name:var(--font-display)] uppercase tracking-[0.25em] mr-[-0.25em] text-[11px]"
              style={{ color: "var(--color-cream)", "--rise-to": 0.75, animationDelay: "420ms" } as React.CSSProperties}
            >
              Out August 14th
            </p>

            <div
              className="splash-rise mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              style={{ animationDelay: "560ms" }}
            >
              <a
                href={LISTEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center font-[family-name:var(--font-display)] uppercase tracking-[0.2em] text-xs px-10 py-4 transition-opacity duration-300 hover:opacity-80"
                style={{ backgroundColor: "var(--color-cream)", color: "var(--color-black)" }}
              >
                Pre-Save Now
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              <button
                type="button"
                onClick={enterSite}
                className="w-full sm:w-auto cursor-pointer font-[family-name:var(--font-display)] uppercase tracking-[0.2em] text-xs px-10 py-4 border transition-colors duration-300 hover:opacity-70"
                style={{ color: "var(--color-cream)", borderColor: "var(--color-cream)" }}
              >
                Enter Site
              </button>
            </div>

            {/* Arbitration / class-action notice, directly under the entry
                buttons so no visitor can claim they had no notice of it. */}
            <p
              className="splash-rise mt-6 max-w-[420px] text-[11px] leading-relaxed"
              style={{ color: "var(--color-cream)", "--rise-to": 0.7, animationDelay: "700ms" } as React.CSSProperties}
            >
              By entering, you consent to our{" "}
              <Link href="/legal/terms" className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-70">
                Terms &amp; Conditions
              </Link>
              , including{" "}
              <Link href="/legal/terms#section-17" className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-70">
                binding arbitration
              </Link>{" "}
              and a{" "}
              <Link href="/legal/terms#class-action-waiver" className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-70">
                waiver of class action rights
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
