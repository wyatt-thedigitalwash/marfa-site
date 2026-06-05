import { NextResponse } from "next/server";

// In-memory rate limiter: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  // Rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: {
    email?: string;
    zip?: string;
    country?: string;
    website?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: if the hidden "website" field is filled, a bot submitted the form
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const { email, zip, country } = body;

  // Validation
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  if (zip && (typeof zip !== "string" || zip.length > 20)) {
    return NextResponse.json(
      { error: "Invalid zip code" },
      { status: 400 }
    );
  }

  if (country && (typeof country !== "string" || country.length > 10)) {
    return NextResponse.json(
      { error: "Invalid country" },
      { status: 400 }
    );
  }

  const mailchimpKey = process.env.MAILCHIMP_API_KEY;
  const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
  const layloKey = process.env.LAYLO_API_KEY;

  if (!mailchimpKey || !mailchimpListId) {
    console.error("Missing MailChimp environment variables");
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  // MailChimp
  const dc = mailchimpKey.split("-").pop();
  const mailchimpUrl = `https://${dc}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`;

  try {
    const mcRes = await fetch(mailchimpUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${mailchimpKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          ZIP: zip || "",
          COUNTRY: country || "",
        },
      }),
    });

    if (!mcRes.ok) {
      const mcData = await mcRes.json();
      if (mcData.title !== "Member Exists") {
        console.error("MailChimp error:", mcData);
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 }
        );
      }
    }
  } catch (err) {
    console.error("MailChimp request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  // Laylo (non-blocking)
  if (layloKey) {
    try {
      // TODO: Verify Laylo endpoint and payload format.
      const layloRes = await fetch("https://api.laylo.com/v1/fans", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${layloKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          zip: zip || undefined,
          country: country || undefined,
        }),
      });

      if (!layloRes.ok) {
        const layloData = await layloRes.text();
        console.error("Laylo error:", layloRes.status, layloData);
      }
    } catch (err) {
      console.error("Laylo request failed:", err);
    }
  }

  return NextResponse.json({ success: true });
}
