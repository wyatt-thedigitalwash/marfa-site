"use client";

import { COUNTRIES } from "@/lib/countries";

export default function Signup() {
  return (
    <section
      className="px-6 md:px-10 py-20 md:py-32"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-[480px] mx-auto">
        <h2
          className="font-[family-name:var(--font-display)] text-sm md:text-base uppercase tracking-[0.2em] text-center mb-12 md:mb-16"
          style={{ color: "var(--color-black)" }}
        >
          Sign Up
        </h2>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full bg-transparent font-[family-name:var(--font-body)] text-base py-3 outline-none placeholder:opacity-40"
            style={{
              color: "var(--color-black)",
              borderBottom: "1px solid var(--color-black)",
            }}
          />

          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            className="w-full bg-transparent font-[family-name:var(--font-body)] text-base py-3 outline-none placeholder:opacity-40"
            style={{
              color: "var(--color-black)",
              borderBottom: "1px solid var(--color-black)",
            }}
          />

          <select
            name="country"
            defaultValue="US"
            className="w-full bg-transparent font-[family-name:var(--font-body)] text-base py-3 outline-none appearance-none rounded-none"
            style={{
              color: "var(--color-black)",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "1px solid var(--color-black)",
            }}
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.18em] py-4 mt-4 hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "var(--color-black)",
              color: "var(--color-cream)",
            }}
          >
            Submit
          </button>

          <p
            className="font-[family-name:var(--font-body)] text-xs text-center leading-relaxed mt-2"
            style={{ color: "var(--color-black)", opacity: 0.5 }}
          >
            By signing up, you agree to receive emails from{" "}
            <a href="#" className="underline hover:opacity-70 transition-opacity">
              Big Machine Records
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
