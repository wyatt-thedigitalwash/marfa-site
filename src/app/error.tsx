"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <h1
        className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] mb-6"
        style={{ color: "var(--color-black)" }}
      >
        Something Went Wrong
      </h1>
      <p
        className="font-[family-name:var(--font-body)] text-base md:text-lg mb-10"
        style={{ color: "var(--color-black)", opacity: 0.7 }}
      >
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex items-center gap-6">
        <button
          onClick={reset}
          className="font-[family-name:var(--font-display)] text-xs md:text-sm uppercase tracking-[0.18em] py-3 px-6 hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: "var(--color-black)",
            color: "var(--color-cream)",
          }}
        >
          Try Again
        </button>
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
    </div>
  );
}
