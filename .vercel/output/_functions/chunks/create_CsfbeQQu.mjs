import { g as guardarLead } from './leadStorage_C6vk3OUN.mjs';
import { Resend } from 'resend';
import { randomUUID } from 'node:crypto';

const __vite_import_meta_env__$1 = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_STRIPE_PUBLISHABLE_KEY": "pk_test_51TWFwrD2Tmjjrm5f8ExJMoB2c4rRuAYYJ3vQRMqehcl7DD2aI52ebP2fxBxbWyp64nCNlN9VBxp2AvBpHINMkxvs00K1zX1o1C", "SITE": undefined, "SSR": true};
const DEFAULT_ADMIN_EMAIL = "luissantiagomorales07@gmail.com";
const readEnv$1 = (key) => {
  const fromProcess = typeof process !== "undefined" ? process.env?.[key] : void 0;
  const fromMeta = Object.assign(__vite_import_meta_env__$1, { RESEND_API_KEY: "re_iPuUuquD_E2hjDnyrimLAvuuX8G3m1tQc", ADMIN_EMAIL: "luissantiagomorales07@gmail.com", LEAD_TO_EMAIL: "luissantiagomorales07@gmail.com", LEAD_FROM_EMAIL: "onboarding@resend.dev" })[key] ?? void 0;
  return (fromProcess ?? fromMeta ?? "").trim();
};
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
const buildLeadEmailHtml = (lead) => {
  const nombre = escapeHtml(lead.nombre);
  const email = escapeHtml(lead.email);
  const empresa = escapeHtml(lead.empresa || "-");
  const mensaje = escapeHtml(lead.mensaje).replace(/\n/g, "<br />");
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;padding:20px;">
      <h2 style="margin:0 0 16px;">Nuevo lead recibido</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    </div>
  `;
};
const sendNewLeadEmail = async (lead) => {
  const resendApiKey = readEnv$1("RESEND_API_KEY");
  const toEmail = readEnv$1("ADMIN_EMAIL") || readEnv$1("LEAD_TO_EMAIL") || DEFAULT_ADMIN_EMAIL;
  const fromEmail = readEnv$1("LEAD_FROM_EMAIL") || "onboarding@resend.dev";
  if (!resendApiKey) {
    console.warn("[email] RESEND_API_KEY no configurada. Email omitido.");
    return false;
  }
  try {
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Nuevo lead: ${lead.nombre}`,
      replyTo: lead.email,
      text: `Nuevo lead recibido

Nombre: ${lead.nombre}
Email: ${lead.email}
Empresa: ${lead.empresa || "-"}

Mensaje:
${lead.mensaje}`,
      html: buildLeadEmailHtml(lead)
    });
    if (error) {
      console.error("[email] Resend rechazó el envío:", error);
      return false;
    }
    console.log("[email] Email enviado:", data?.id ?? "sin-id");
    return true;
  } catch (error) {
    console.error("[email] Error enviando email:", error);
    return false;
  }
};

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_STRIPE_PUBLISHABLE_KEY": "pk_test_51TWFwrD2Tmjjrm5f8ExJMoB2c4rRuAYYJ3vQRMqehcl7DD2aI52ebP2fxBxbWyp64nCNlN9VBxp2AvBpHINMkxvs00K1zX1o1C", "SITE": undefined, "SSR": true};
const prerender = false;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jsonHeaders = { "Content-Type": "application/json" };
const MIN_SUBMISSION_DELAY_MS = 400;
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
const jsonResponse = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: jsonHeaders
});
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
  const requestId = randomUUID();
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      console.warn(`[lead-api:${requestId}] Rate limit`, { clientIp });
      return jsonResponse(429, {
        success: false,
        message: "Demasiadas solicitudes. Inténtalo más tarde."
      });
    }
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return jsonResponse(400, {
        success: false,
        message: "Solicitud no válida."
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
    try {
      await guardarLead({
        id: randomUUID(),
        nombre: leadPayload.name,
        email: leadPayload.email,
        empresa: leadPayload.company,
        mensaje: leadPayload.message,
        timestamp: leadPayload.timestamp,
        estado: "nuevo",
        notas: []
      });
      console.log(`[lead-api:${requestId}] Lead guardado en Prisma.`);
    } catch (error) {
      console.error(`[lead-api:${requestId}] Error guardando lead:`, error);
      return jsonResponse(500, {
        success: false,
        message: "No se pudo guardar tu solicitud."
      });
    }
    const emailSent = await sendNewLeadEmail({
      nombre: leadPayload.name,
      email: leadPayload.email,
      empresa: leadPayload.company,
      mensaje: leadPayload.message
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
