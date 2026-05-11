import { g as guardarLead } from './leadStorage_DT8eBzY6.mjs';
import { p as prisma } from './prisma_Dd9Pg7uq.mjs';
import { randomUUID } from 'node:crypto';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const prerender = false;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jsonHeaders = { "Content-Type": "application/json" };
const MIN_SUBMISSION_DELAY_MS = 1200;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 180;
const MAX_COMPANY_LENGTH = 140;
const MAX_MESSAGE_LENGTH = 3e3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1e3;
const RATE_LIMIT_MAX = 10;
const ipBuckets = /* @__PURE__ */ new Map();
const readEnv = (key) => {
  const fromProcess = typeof process !== "undefined" ? process.env?.[key] : void 0;
  const fromMeta = Object.assign(__vite_import_meta_env__, { OS: "Windows_NT" })[key] ?? void 0;
  return (fromProcess ?? fromMeta ?? "").trim();
};
const jsonResponse = (status, body) => new Response(JSON.stringify(body), { status, headers: jsonHeaders });
const getClientIp = (request) => request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "unknown";
const isRateLimited = (ip) => {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
};
const sanitizeText = (value) => value.replace(/[<>{}`$\\]/g, "").replace(/\s+/g, " ").trim();
const buildEmailHtml = (lead) => `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
    <h2 style="margin-bottom:12px;">Nuevo lead enviado</h2>
    <p><strong>Nombre:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Empresa:</strong> ${lead.company}</p>
    <p><strong>Fecha:</strong> ${lead.timestamp}</p>
    <hr style="margin:18px 0;border:none;border-top:1px solid #e5e7eb;" />
    <p><strong>Mensaje:</strong></p>
    <p style="white-space:pre-wrap;">${lead.message}</p>
  </div>
`;
const sendLeadEmail = async (lead) => {
  const resendApiKey = readEnv("RESEND_API_KEY");
  const leadFromEmail = readEnv("LEAD_FROM_EMAIL") || "NexoraAI <noreply@local.dev>";
  const leadToEmail = readEnv("LEAD_TO_EMAIL") || "test@local.dev";
  const resendApiUrl = readEnv("RESEND_API_URL") || "https://api.resend.com/emails";
  if (!resendApiKey) {
    console.log("[lead-api] Email omitido (sin API key).");
    return;
  }
  await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: leadFromEmail,
      to: [leadToEmail],
      subject: `Nuevo lead: ${lead.name} (${lead.company})`,
      reply_to: lead.email,
      html: buildEmailHtml(lead)
    })
  });
  console.log("[lead-api] Email enviado.");
};
const sendLeadToCrmWebhook = async (lead) => {
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
const POST = async ({ request }) => {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return jsonResponse(429, {
        success: false,
        message: "Demasiadas solicitudes. Inténtalo más tarde."
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
    if (companyWebsite) return jsonResponse(200, { success: true });
    if (!submittedAt || Number.isNaN(submittedDelay) || submittedDelay < MIN_SUBMISSION_DELAY_MS) {
      return jsonResponse(400, {
        success: false,
        message: "Espera un momento antes de enviar."
      });
    }
    if (!fullName || !email || !companyName || !message) {
      return jsonResponse(400, {
        success: false,
        message: "Completa todos los campos."
      });
    }
    if (!emailPattern.test(email)) {
      return jsonResponse(400, {
        success: false,
        message: "Introduce un email válido."
      });
    }
    if (fullName.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH || companyName.length > MAX_COMPANY_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse(400, {
        success: false,
        message: "Uno o más campos superan la longitud permitida."
      });
    }
    const leadPayload = {
      name: fullName,
      email,
      company: companyName,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    console.log("[lead-api] Lead recibido.");
    try {
      const configuredAdminEmail = readEnv("ADMIN_EMAIL") || readEnv("LEAD_TO_EMAIL");
      const configuredUser = configuredAdminEmail ? await prisma.user.findUnique({
        where: {
          email: configuredAdminEmail
        }
      }) : null;
      const leadUser = configuredUser ?? await prisma.user.findFirst({
        orderBy: {
          createdAt: "asc"
        }
      });
      if (!leadUser) {
        console.error("[lead-api] No existe usuario para asociar el lead.");
        return jsonResponse(500, {
          success: false,
          message: "No se pudo guardar tu solicitud."
        });
      }
      await guardarLead({
        id: randomUUID(),
        nombre: leadPayload.name,
        email: leadPayload.email,
        empresa: leadPayload.company,
        mensaje: leadPayload.message,
        timestamp: leadPayload.timestamp,
        estado: "nuevo",
        userId: leadUser.id,
        notas: []
      });
      console.log("[lead-api] Lead guardado en Prisma.");
    } catch (error) {
      console.error("[lead-api] Error guardando lead:", error);
      return jsonResponse(500, {
        success: false,
        message: "No se pudo guardar tu solicitud."
      });
    }
    try {
      await sendLeadEmail(leadPayload);
    } catch (e) {
      console.error("[lead-api] Error enviando email:", e);
    }
    try {
      await sendLeadToCrmWebhook(leadPayload);
    } catch (e) {
      console.error("[lead-api] Error enviando webhook CRM:", e);
    }
    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error("[lead-api] Error procesando solicitud:", error);
    return jsonResponse(500, {
      success: false,
      message: "No se pudo procesar tu solicitud."
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
