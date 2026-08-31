"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Bump this key when a new release ships to re-show the splash to everyone.
const SPLASH_KEY = "marfa_splash_wellallbeokay_ep";
const LISTEN_URL = "https://marfamusic.ffm.to/wellallbeokay";

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
      aria-label="Marfa -- pre-save the new EP, We'll All Be Okay"
    >
      {/* Backdrop: the EP cover itself, blown up past the frame, heavily
          blurred and pulled down dark. The red racing stripe survives the blur
          as a soft band of color across the middle, so the backdrop stays
          photographic (the two-color rule allows color only from photography)
          without needing a separate BG asset. The scale-up hides the blur's
          soft edges at the viewport bounds. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/covers/MARFA_WellAllBeOkay_Cover.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover scale-125 blur-2xl brightness-[0.45]"
        />
      </div>

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
            aria-label="Pre-save We'll All Be Okay (opens in new tab)"
            className="splash-rise relative block w-72 h-72 md:w-[30rem] md:h-[30rem] shrink-0 overflow-hidden shadow-2xl"
            style={{ animationDelay: "0ms" }}
          >
            <Image
              src="/covers/MARFA_WellAllBeOkay_Cover.jpg"
              alt="We'll All Be Okay EP cover art"
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
              className="splash-rise font-[family-name:var(--font-splash-display)] uppercase tracking-[0.35em] mr-[-0.35em] text-[11px]"
              style={{ color: "#fff", "--rise-to": 0.75, animationDelay: "180ms" } as React.CSSProperties}
            >
              New EP &bull; Out October 23
            </span>
            <h1
              className="splash-rise mt-4 font-[family-name:var(--font-splash-display)] uppercase tracking-[0.12em] leading-[0.95]"
              style={{
                color: "#fff",
                fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                animationDelay: "300ms",
              }}
            >
              We&rsquo;ll All
              <br />
              Be Okay
            </h1>

            <div
              className="splash-rise mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              style={{ animationDelay: "560ms" }}
            >
              <a
                href={LISTEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center font-[family-name:var(--font-splash-display)] uppercase tracking-[0.2em] text-xs px-10 py-4 transition-opacity duration-300 hover:opacity-80"
                style={{ backgroundColor: "#fff", color: "var(--color-black)" }}
              >
                Pre-Save
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              <button
                type="button"
                onClick={enterSite}
                className="w-full sm:w-auto cursor-pointer font-[family-name:var(--font-splash-display)] uppercase tracking-[0.2em] text-xs px-10 py-4 border transition-colors duration-300 hover:opacity-70"
                style={{ color: "#fff", borderColor: "#fff" }}
              >
                Enter Site
              </button>
            </div>

            {/* Arbitration / class-action notice, directly under the entry
                buttons so no visitor can claim they had no notice of it. */}
            <p
              className="splash-rise mt-6 max-w-[420px] font-[family-name:var(--font-splash-label)] text-[11px] leading-relaxed"
              style={{ color: "#fff", "--rise-to": 0.7, animationDelay: "700ms" } as React.CSSProperties}
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
