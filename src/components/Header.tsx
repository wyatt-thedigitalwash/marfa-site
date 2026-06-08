"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Music", href: "/music" },
  { label: "Video", href: "/video" },
  { label: "Tour", href: "/tour" },
  { label: "Follow", href: "/follow" },
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
  const [menuVisible, setMenuVisible] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [overDarkHero, setOverDarkHero] = useState(true);
  const [hideLogo, setHideLogo] = useState(true);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);

    if (!isHome) {
      setScrolled(true);
      setOverDarkHero(false);
      setHideLogo(false);
      return;
    }

    function onScroll() {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(y > vh * 3);
      setOverDarkHero(y < vh * 3);
      setHideLogo(y < vh);
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

  // Open: mount overlay, then trigger visible on next frame
  const openMenu = useCallback(() => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMenuVisible(true);
      });
    });
  }, []);

  // Close: fade out, then unmount after transition
  const closeMenu = useCallback(() => {
    setMenuVisible(false);
    setTimeout(() => {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }, 500);
  }, []);

  // Escape key closes menu
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  // Focus trap inside mobile overlay
  useEffect(() => {
    if (!menuVisible || !overlayRef.current) return;
    const overlay = overlayRef.current;
    const focusable = overlay.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    overlay.addEventListener("keydown", onTab);
    return () => overlay.removeEventListener("keydown", onTab);
  }, [menuVisible]);

  const showSolidBg = mounted && (!isHome || scrolled);
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
            aria-label="Marfa - Home"
            className="font-[family-name:var(--font-display)] text-2xl md:text-3xl uppercase tracking-[0.2em] transition-all duration-300"
            style={{ color: textColor, opacity: hideLogo ? 0 : 1 }}
          >
            Marfa
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.18em] hover:opacity-60 transition-all duration-300 min-h-[44px] flex items-center"
                  style={{ color: textColor }}
                >
                  {link.label}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.18em] hover:opacity-60 transition-all duration-300 min-h-[44px] flex items-center"
                  style={{ color: textColor }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            ref={menuButtonRef}
            onClick={openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.18em] transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-end"
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
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out"
          style={{
            backgroundColor: "var(--color-black)",
            opacity: menuVisible ? 1 : 0,
          }}
        >
          <button
            onClick={closeMenu}
            className="absolute top-5 right-6 font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.18em] min-h-[44px] min-w-[44px] flex items-center justify-end transition-opacity duration-500 ease-in-out"
            style={{
              color: "var(--color-cream)",
              opacity: menuVisible ? 1 : 0,
              transitionDelay: menuVisible ? "300ms" : "0ms",
            }}
            aria-label="Close menu"
          >
            Close
          </button>

          <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => {
              const delay = menuVisible ? `${150 + i * 80}ms` : "0ms";
              const style = {
                color: "var(--color-cream)",
                opacity: menuVisible ? 1 : 0,
                transform: menuVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 500ms ease-in-out, transform 500ms ease-in-out",
                transitionDelay: delay,
              };

              return link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.2em] min-h-[44px] flex items-center"
                  style={style}
                >
                  {link.label}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.2em] min-h-[44px] flex items-center"
                  style={style}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div
            className="absolute bottom-10 flex items-center gap-6 transition-opacity duration-500 ease-in-out"
            style={{
              opacity: menuVisible ? 1 : 0,
              transitionDelay: menuVisible ? "500ms" : "0ms",
            }}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-body)] text-sm underline min-h-[44px] flex items-center"
                style={{ color: "var(--color-cream)" }}
              >
                {link.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
