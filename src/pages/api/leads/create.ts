import type { APIRoute } from "astro";
import { guardarLead } from "../../../lib/leadStorage";
import { sendNewLeadEmail } from "../../../lib/email";
import { randomUUID } from "node:crypto";

export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jsonHeaders = { "Content-Type": "application/json" };
const MIN_SUBMISSION_DELAY_MS = 400;
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
  new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });

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

const sendLeadToCrmWebhook = async (lead: LeadPayload) => {
  const crmWebhookUrl = readEnv("CRM_WEBHOOK_URL");
  if (!crmWebhookUrl) {
    console.log("[lead-api] Webhook CRM omitido (sin URL).");
    return;
  }

  await fetch(crmWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead)
  });

  console.log("[lead-api] Webhook CRM enviado.");
};

export const POST: APIRoute = async ({ request }) => {
  const requestId = randomUUID();

  try {
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      console.warn(`[lead-api:${requestId}] Rate limit`, { clientIp });

      return jsonResponse(429, {
        success: false,
        message: "Demasiadas solicitudes. Inténtalo más tarde.",
      });
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return jsonResponse(400, {
        success: false,
        message: "Solicitud no válida.",
      });
    }

    const fullName = sanitizeText(String(body?.fullName ?? ""));
    const email = sanitizeText(String(body?.email ?? "")).toLowerCase();
    const companyName = sanitizeText(String(body?.companyName ?? ""));
    const message = sanitizeText(String(body?.message ?? ""));
    const companyWebsite = String(body?.companyWebsite ?? "").trim();
    const submittedAt = Number(body?.submittedAt ?? 0);
    const submittedDelay = submittedAt ? Date.now() - submittedAt : MIN_SUBMISSION_DELAY_MS;

    if (companyWebsite) {
      console.log(`[lead-api:${requestId}] Honeypot activado.`);
      return jsonResponse(200, { success: true });
    }

    if (Number.isNaN(submittedDelay) || submittedDelay < MIN_SUBMISSION_DELAY_MS) {
      return jsonResponse(400, {
        success: false,
        message: "Espera un momento antes de enviar.",
      });
    }

    if (!fullName || !email || !companyName || !message) {
      return jsonResponse(400, {
        success: false,
        message: "Completa todos los campos.",
      });
    }

    if (!emailPattern.test(email)) {
      return jsonResponse(400, {
        success: false,
        message: "Introduce un email válido.",
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
        message: "Uno o más campos superan la longitud permitida.",
      });
    }

    const leadPayload: LeadPayload = {
      name: fullName,
      email,
      company: companyName,
      message,
      timestamp: new Date().toISOString()
    };

    try {
      await guardarLead({
        id: randomUUID(),
        nombre: leadPayload.name,
        email: leadPayload.email,
        empresa: leadPayload.company,
        mensaje: leadPayload.message,
        timestamp: leadPayload.timestamp,
        estado: "nuevo",
        notas: [],
      });

      console.log(`[lead-api:${requestId}] Lead guardado en Prisma.`);
    } catch (error) {
      console.error(`[lead-api:${requestId}] Error guardando lead:`, error);
      return jsonResponse(500, {
        success: false,
        message: "No se pudo guardar tu solicitud.",
      });
    }

    const emailSent =
      await sendNewLeadEmail({
        nombre: leadPayload.name,
        email: leadPayload.email,
        empresa: leadPayload.company,
        mensaje: leadPayload.message,
      });

    console.log(
      `[lead-api:${requestId}] Email ${emailSent ? "enviado" : "omitido o fallido"}.`
    );

    try {
      await sendLeadToCrmWebhook(leadPayload);
    } catch (e) {
      console.error("[lead-api] Error enviando webhook CRM:", e);
    }

    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error(`[lead-api:${requestId}] Error procesando solicitud:`, error);
    return jsonResponse(500, {
      success: false,
      message: "No se pudo procesar tu solicitud.",
    });
  }
};
