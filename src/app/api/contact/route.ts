import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting
const submissions = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_SUBMISSIONS = 3;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  // Rate limiting
  const now = Date.now();
  const lastSubmission = submissions.get(ip) || 0;
  const recentCount = now - lastSubmission < RATE_LIMIT_WINDOW ? (submissions.get(`${ip}:count`) || 0) : 0;

  if (recentCount >= MAX_SUBMISSIONS) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const formData = await request.formData();

  // Honeypot check
  if (formData.get("website")) {
    return NextResponse.json({ success: true }); // Silent rejection
  }

  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const arrival = formData.get("arrival")?.toString() || "";
  const departure = formData.get("departure")?.toString() || "";
  const guests = formData.get("guests")?.toString() || "";
  const selectedPackage = formData.get("package")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  // Update rate limit
  submissions.set(ip, now);
  submissions.set(`${ip}:count`, recentCount + 1);

  // Send email via Resend if API key is configured
  const resendKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || "info@aveyla.com";

  if (resendKey) {
    try {
      // Send notification to Aveyla
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Aveyla Website <noreply@aveyla.com>",
          to: contactEmail,
          subject: `New Enquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPackage: ${selectedPackage || "General Enquiry"}\nArrival: ${arrival || "Not specified"}\nDeparture: ${departure || "Not specified"}\nGuests: ${guests || "Not specified"}\n\nMessage:\n${message || "No message provided"}`,
        }),
      });

      // Send auto-acknowledgement to guest
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Aveyla Manta Village <noreply@aveyla.com>",
          to: email,
          subject: "Thank you for your enquiry — Aveyla Manta Village",
          text: `Dear ${name},\n\nThank you for your interest in Aveyla Manta Village. We have received your enquiry and will respond within 24 hours.\n\nFor immediate assistance, please reach us on WhatsApp at +960 777 3998.\n\nWarm regards,\nAveyla Manta Village\nDharavandhoo Island, Baa Atoll\nMaldives`,
        }),
      });
    } catch (err) {
      console.error("Email send failed:", err);
      // Don't fail the request — form was still received
    }
  } else {
    console.log("Contact form submission (no RESEND_API_KEY):", { name, email, selectedPackage, arrival, departure, guests, message });
  }

  return NextResponse.json({ success: true });
}
