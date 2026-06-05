import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Marfa",
};

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <h1
        className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] mb-6"
        style={{ color: "var(--color-black)" }}
      >
        Page Not Found
      </h1>
      <p
        className="font-[family-name:var(--font-body)] text-base md:text-lg mb-10"
        style={{ color: "var(--color-black)", opacity: 0.7 }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-[0.18em] pb-1 hover:opacity-60 transition-opacity"
        style={{
          color: "var(--color-black)",
          borderBottom: "1px solid var(--color-black)",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
