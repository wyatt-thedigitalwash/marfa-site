"use client";

import { useState } from "react";
import { COUNTRIES } from "@/lib/countries";

export default function Signup() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const zip = formData.get("zip") as string;
    const country = formData.get("country") as string;
    const website = formData.get("website") as string;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, zip, country, website }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      aria-label="Sign up for updates"
      className="px-6 md:px-10 py-20 md:py-32"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      <div className="max-w-[480px] mx-auto">
        <h2
          className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] text-center mb-12 md:mb-16"
          style={{ color: "var(--color-cream)" }}
        >
          Sign Up
        </h2>

        {submitted ? (
          <p
            role="status"
            aria-live="polite"
            className="font-[family-name:var(--font-display)] text-xl md:text-2xl uppercase tracking-[0.2em] text-center"
            style={{ color: "var(--color-cream)" }}
          >
            You&apos;re in.
          </p>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="signup-email" className="sr-only">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                placeholder="Email"
                required
                aria-required="true"
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? "signup-error" : undefined}
                className="w-full bg-transparent font-[family-name:var(--font-body)] text-base py-3 outline-none placeholder:opacity-40"
                style={{
                  color: "var(--color-cream)",
                  borderBottom: "1px solid var(--color-cream)",
                }}
              />
            </div>

            <div>
              <label htmlFor="signup-zip" className="sr-only">
                Zip Code
              </label>
              <input
                id="signup-zip"
                type="text"
                name="zip"
                placeholder="Zip Code"
                className="w-full bg-transparent font-[family-name:var(--font-body)] text-base py-3 outline-none placeholder:opacity-40"
                style={{
                  color: "var(--color-cream)",
                  borderBottom: "1px solid var(--color-cream)",
                }}
              />
            </div>

            <div>
              <label htmlFor="signup-country" className="sr-only">
                Country
              </label>
              <select
                id="signup-country"
                name="country"
                defaultValue="US"
                className="w-full bg-transparent font-[family-name:var(--font-body)] text-base py-3 outline-none appearance-none rounded-none"
                style={{
                  color: "var(--color-cream)",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid var(--color-cream)",
                }}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Honeypot field - hidden from humans, catches bots */}
            <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="signup-website">Website</label>
              <input
                id="signup-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.18em] py-4 mt-4 hover:opacity-80 transition-opacity disabled:opacity-50"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-black)",
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            {error && (
              <p
                id="signup-error"
                role="alert"
                className="font-[family-name:var(--font-body)] text-sm text-center"
                style={{ color: "var(--color-cream)", opacity: 0.7 }}
              >
                {error}
              </p>
            )}

            <p
              className="font-[family-name:var(--font-body)] text-xs text-center leading-relaxed mt-2"
              style={{ color: "var(--color-cream)", opacity: 0.65 }}
            >
              By submitting this form, you agree to the{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity"
              >
                Big Machine Records Privacy Policy
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              , and Laylo&apos;s{" "}
              <a
                href="https://docs.laylo.com/en/articles/6497431-terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity"
              >
                Terms
                <span className="sr-only"> (opens in new tab)</span>
              </a>{" "}
              and{" "}
              <a
                href="https://docs.laylo.com/en/articles/6497219-privacy-and-gdpr-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity"
              >
                Privacy Policy
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
