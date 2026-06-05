"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Music", href: "/music" },
  { label: "Video", href: "/video" },
  { label: "Tour", href: "/tour" },
  {
    label: "Merch",
    href: "https://www.shop.marfabandofficial.com/",
    external: true,
  },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/marfabandofficial/" },
  { label: "TikTok", href: "https://www.tiktok.com/@officialmarfaband" },
  { label: "Facebook", href: "https://www.facebook.com/marfabandofficial" },
  { label: "YouTube", href: "https://www.youtube.com/@officialmarfa" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDarkHero, setOverDarkHero] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      setOverDarkHero(false);
      return;
    }

    function onScroll() {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(y > vh * 3);
      setOverDarkHero(y < vh);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const showSolidBg = !isHome || scrolled;
  const textColor =
    isHome && overDarkHero ? "var(--color-cream)" : "var(--color-black)";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: showSolidBg ? "var(--color-cream)" : "transparent",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-2xl md:text-3xl uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: textColor }}
          >
            Marfa
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.18em] hover:opacity-60 transition-all duration-300"
                  style={{ color: textColor }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.18em] hover:opacity-60 transition-all duration-300"
                  style={{ color: textColor }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.18em] transition-colors duration-300"
            style={{ color: textColor }}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--color-black)" }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-6 font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.18em]"
            style={{ color: "var(--color-cream)" }}
            aria-label="Close menu"
          >
            Close
          </button>

          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-cream)" }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-cream)" }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="absolute bottom-10 flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-body)] text-sm underline"
                style={{ color: "var(--color-cream)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
