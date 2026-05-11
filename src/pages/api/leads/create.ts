import type { APIRoute } from "astro";
import { appendLead, buildFollowUpPayload } from "../../../lib/leadStorage";
import { randomUUID } from "node:crypto";

export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jsonHeaders = { "Content-Type": "application/json" };
const MIN_SUBMISSION_DELAY_MS = 1200;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 180;
const MAX_COMPANY_LENGTH = 140;
const MAX_MESSAGE_LENGTH = 3000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

const ipBuckets = new Map<string, { count: number; resetAt: number }>();

type LeadPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
  timestamp: string;
};

const readEnv = (key: string): string => {
  const fromProcess = typeof process !== "undefined" ? process.env?.[key] : undefined;
  const fromMeta = (import.meta.env[key] as string | undefined) ?? undefined;
  return (fromProcess ?? fromMeta ?? "").trim();
};

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: jsonHeaders });

const getClientIp = (request: Request): string =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip")?.trim() ||
  "unknown";

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
};

const sanitizeText = (value: string): string =>
  value
    .replace(/[<>{}`$\\]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const buildEmailHtml = (lead: LeadPayload) => `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
    <h2 style="margin-bottom:12px;">New NexoraAI lead submitted</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Company:</strong> ${lead.company}</p>
    <p><strong>Submitted:</strong> ${lead.timestamp}</p>
    <hr style="margin:18px 0;border:none;border-top:1px solid #e5e7eb;" />
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap;">${lead.message}</p>
  </div>
`;

const sendLeadEmail = async (lead: LeadPayload) => {
  const resendApiKey = readEnv("RESEND_API_KEY");
  const leadFromEmail = readEnv("LEAD_FROM_EMAIL") || "NexoraAI <noreply@local.dev>";
  const leadToEmail = readEnv("LEAD_TO_EMAIL") || "test@local.dev";
  const resendApiUrl = readEnv("RESEND_API_URL") || "https://api.resend.com/emails";

  if (!resendApiKey) {
    console.log("[lead-api] Email skipped (no API key).");
    return;
  }

  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: leadFromEmail,
      to: [leadToEmail],
      subject: `New lead: ${lead.name} (${lead.company})`,
      reply_to: lead.email,
      text: `New lead submitted\n\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company}\nSubmitted: ${lead.timestamp}\n\nMessage:\n${lead.message}`,
      html: buildEmailHtml(lead)
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Email provider returned ${response.status}: ${errorBody}`);
  }

  console.log("[lead-api] Email sent.");
};

const sendLeadToCrmWebhook = async (lead: LeadPayload) => {
  const crmWebhookUrl = readEnv("CRM_WEBHOOK_URL");
  if (!crmWebhookUrl) {
    console.log("[lead-api] CRM webhook skipped (no URL).");
    return;
  }

  const response = await fetch(crmWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(lead)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`CRM webhook returned ${response.status}: ${errorBody}`);
  }

  console.log("[lead-api] CRM webhook sent.");
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return jsonResponse(429, {
        success: false,
        message: "Too many requests. Please try again later."
      });
    }

    const body = await request.json();
    const fullName = sanitizeText(String(body?.fullName ?? ""));
    const email = sanitizeText(String(body?.email ?? "")).toLowerCase();
    const companyName = sanitizeText(String(body?.companyName ?? ""));
    const message = sanitizeText(String(body?.message ?? ""));
    const companyWebsite = String(body?.companyWebsite ?? "").trim();
    const submittedAt = Number(body?.submittedAt ?? 0);
    const submittedDelay = Date.now() - submittedAt;

    // Honeypot field: real users should not fill this.
    if (companyWebsite) {
      return jsonResponse(200, { success: true });
    }

    if (!submittedAt || Number.isNaN(submittedDelay) || submittedDelay < MIN_SUBMISSION_DELAY_MS) {
      return jsonResponse(400, {
        success: false,
        message: "Please wait a moment before submitting."
      });
    }

    if (!fullName || !email || !companyName || !message) {
      return jsonResponse(400, {
        success: false,
        message: "Please complete all fields before submitting."
      });
    }

    if (!emailPattern.test(email)) {
      return jsonResponse(400, {
        success: false,
        message: "Please enter a valid business email."
      });
    }

    if (
      fullName.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      companyName.length > MAX_COMPANY_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return jsonResponse(400, {
        success: false,
        message: "One or more fields exceed allowed length."
      });
    }

    const leadPayload: LeadPayload = {
      name: fullName,
      email,
      company: companyName,
      message,
      timestamp: new Date().toISOString()
    };

    console.log("[lead-api] Lead received.");

    try {
      await appendLead({
        id: randomUUID(),
        ...leadPayload,
        status: "new",
        notes: [],
        followUp: buildFollowUpPayload({
          name: leadPayload.name,
          email: leadPayload.email,
          company: leadPayload.company,
          status: "new"
        })
      });
      console.log("[lead-api] Lead saved.");
    } catch (error) {
      console.error("[lead-api] Lead storage failed:", error);
      return jsonResponse(500, {
        success: false,
        message: "Unable to save your request right now. Please try again."
      });
    }

    // Keep lead capture non-blocking: external integrations should not break UX.
    try {
      await sendLeadEmail(leadPayload);
    } catch (error) {
      console.error("[lead-api] Email send failed:", error);
    }

    try {
      await sendLeadToCrmWebhook(leadPayload);
    } catch (error) {
      console.error("[lead-api] CRM webhook failed:", error);
    }

    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error("[lead-api] Request processing failed:", error);
    return jsonResponse(500, {
      success: false,
      message: "Unable to process your request right now. Please try again."
    });
  }
};
