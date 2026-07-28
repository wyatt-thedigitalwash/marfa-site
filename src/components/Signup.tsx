"use client";

import { useRef, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { SMS_COUNTRIES } from "@/lib/subscribe-validation";

type FormStatus = "idle" | "loading" | "success" | "error";
type ErrorField = "email" | "phone" | "";

const DEFAULT_SUCCESS =
  "You're in. Check your phone for a text and reply to confirm SMS updates.";

// Keep only digits and auto-format a US number as NXX-NXX-XXXX as the fan types.
// Handles pastes that include a leading country code (1 or +1) or punctuation.
function formatUsPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return; // guard double-submit
    setStatus("loading");
    setErrorMessage("");
    setErrorField("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          zipCode,
          country,
          website,
        }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSuccessMessage(data?.message || DEFAULT_SUCCESS);
        setStatus("success");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setZipCode("");
        setCountry("United States");
        return;
      }

      const field: ErrorField =
        data?.field === "email" || data?.field === "phone" ? data.field : "";
      setErrorMessage(data?.error || "Something went wrong. Please try again.");
      setErrorField(field);
      setStatus("error");
      requestAnimationFrame(() => {
        if (field === "email") emailRef.current?.focus();
        else if (field === "phone") phoneRef.current?.focus();
      });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  // Shared field styling for the cream-on-black two-color system. The error cue
  // is a heavier underline (the palette forbids any accent color), paired with
  // aria-invalid and the visible error message.
  const inputClass =
    "w-full bg-transparent font-[family-name:var(--font-body)] text-base py-3 outline-none placeholder:opacity-40";
  const underline = (field?: ErrorField): React.CSSProperties => ({
    color: "var(--color-cream)",
    borderBottom:
      field && errorField === field
        ? "2px solid var(--color-cream)"
        : "1px solid var(--color-cream)",
  });

  // US/Canada get the +1 auto-formatted REQUIRED phone; elsewhere it's optional/plain
  // because Laylo can only text North American numbers.
  const isNorthAmerica = SMS_COUNTRIES.has(country);

  return (
    <section
      aria-label="Sign up for updates"
      className="px-6 md:px-10 py-20 md:py-32"
      style={{ backgroundColor: "var(--color-black)" }}
    >
      <div className="max-w-[520px] mx-auto">
        <h2
          className="font-[family-name:var(--font-display)] text-2xl md:text-4xl uppercase tracking-[0.2em] text-center mb-12 md:mb-16"
          style={{ color: "var(--color-cream)" }}
        >
          Sign Up
        </h2>

        {status === "success" ? (
          <p
            role="status"
            aria-live="polite"
            className="font-[family-name:var(--font-body)] text-base md:text-lg text-center leading-relaxed"
            style={{ color: "var(--color-cream)" }}
          >
            {successMessage || DEFAULT_SUCCESS}
          </p>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
            {/* Honeypot field - hidden from humans, catches bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="signup-website">Website</label>
              <input
                id="signup-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="signup-first" className="sr-only">
                  First Name
                </label>
                <input
                  id="signup-first"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                  style={underline()}
                />
              </div>

              <div>
                <label htmlFor="signup-last" className="sr-only">
                  Last Name
                </label>
                <input
                  id="signup-last"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                  style={underline()}
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="sr-only">
                Email
              </label>
              <input
                ref={emailRef}
                id="signup-email"
                type="email"
                name="email"
                placeholder="Email"
                required
                aria-required="true"
                aria-invalid={errorField === "email"}
                aria-describedby={status === "error" ? "signup-error" : undefined}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                style={underline("email")}
              />
            </div>

            <div>
              <label htmlFor="signup-phone" className="sr-only">
                Phone Number{isNorthAmerica ? "" : " (optional)"}
              </label>
              {isNorthAmerica ? (
                <div
                  className="flex items-stretch"
                  style={{
                    borderBottom:
                      errorField === "phone"
                        ? "2px solid var(--color-cream)"
                        : "1px solid var(--color-cream)",
                  }}
                >
                  <span
                    className="flex items-center pr-2 font-[family-name:var(--font-body)] text-base select-none"
                    style={{ color: "var(--color-cream)", opacity: 0.5 }}
                    aria-hidden="true"
                  >
                    +1
                  </span>
                  <input
                    ref={phoneRef}
                    id="signup-phone"
                    type="tel"
                    name="phone"
                    inputMode="numeric"
                    placeholder="555-555-5555"
                    required
                    aria-required="true"
                    aria-invalid={errorField === "phone"}
                    aria-describedby={status === "error" ? "signup-error" : undefined}
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                    className="w-full bg-transparent font-[family-name:var(--font-body)] text-base py-3 outline-none placeholder:opacity-40 border-0"
                    style={{ color: "var(--color-cream)" }}
                  />
                </div>
              ) : (
                <input
                  ref={phoneRef}
                  id="signup-phone"
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  placeholder="Phone Number (optional)"
                  aria-invalid={errorField === "phone"}
                  aria-describedby={status === "error" ? "signup-error" : undefined}
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  style={underline("phone")}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="signup-zip" className="sr-only">
                  Zip Code
                </label>
                <input
                  id="signup-zip"
                  name="zipCode"
                  type="text"
                  inputMode="numeric"
                  placeholder="Zip Code"
                  autoComplete="postal-code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className={inputClass}
                  style={underline()}
                />
              </div>

              <div>
                <label htmlFor="signup-country" className="sr-only">
                  Country
                </label>
                <select
                  id="signup-country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`${inputClass} appearance-none rounded-none`}
                  style={underline()}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.18em] py-4 mt-4 hover:opacity-80 transition-opacity disabled:opacity-50"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-black)",
              }}
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </button>

            {status === "error" && (
              <p
                id="signup-error"
                role="alert"
                className="font-[family-name:var(--font-body)] text-sm text-center"
                style={{ color: "var(--color-cream)", opacity: 0.75 }}
              >
                {errorMessage || "Something went wrong. Please try again."}
              </p>
            )}

            {/* Legally required SMS consent when collecting phone via Laylo. Keep this
                copy and all three links. */}
            <p
              className="font-[family-name:var(--font-body)] text-xs text-center leading-relaxed mt-2"
              style={{ color: "var(--color-cream)", opacity: 0.65 }}
            >
              By submitting this form you agree to receive email and recurring automated
              marketing text messages. We will text you once to confirm your number, reply
              to opt in. Consent is not a condition of purchase. Message and data rates may
              apply. See the{" "}
              <a
                href="https://www.bigmachinerecords.com/privacy"
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
