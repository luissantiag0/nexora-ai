import { Resend } from "resend";

const readEnv = (key: string): string => {
  const fromProcess =
    typeof process !== "undefined"
      ? process.env?.[key]
      : undefined;
  const fromMeta =
    (import.meta.env[key] as string | undefined) ?? undefined;
  return (fromProcess ?? fromMeta ?? "").trim();
};

const getFromEmail = () =>
  readEnv("LEAD_FROM_EMAIL") || "onboarding@resend.dev";

function getResend() {
  const key = readEnv("RESEND_API_KEY");
  if (!key) return null;
  return new Resend(key);
}

function buildHtml(body: string): string {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;padding:24px;max-width:600px;margin:0 auto">
    <div style="border-bottom:2px solid #22d3ee;padding-bottom:16px;margin-bottom:24px">
      <h1 style="margin:0;font-size:20px;color:#07070A">NexoraAI</h1>
    </div>
    ${body}
    <div style="border-top:1px solid #e5e7eb;margin-top:24px;padding-top:16px;font-size:12px;color:#6b7280">
      <p>NexoraAI — Automatización con IA</p>
    </div>
  </body></html>`;
}

async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY no configurada. Email omitido.");
    return false;
  }

  try {
    const { error } = await resend.emails.send({
      from: getFromEmail(),
      to: [to],
      subject,
      html: buildHtml(body),
      text: body.replace(/<[^>]*>/g, ""),
    });

    if (error) {
      console.error("[email] Error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[email] Error enviando:", err);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail(
    email,
    "Bienvenido a NexoraAI",
    `<h2>¡Bienvenido a NexoraAI, ${name}!</h2>
     <p>Tu cuenta ha sido creada exitosamente.</p>
     <p>Hemos activado automáticamente tu <strong>prueba gratuita de 30 minutos</strong> para que puedas explorar todas las funcionalidades premium.</p>
     <p>Durante este periodo tendrás acceso completo a:</p>
     <ul>
       <li>CRM con gestión de leads</li>
       <li>Dashboard de métricas</li>
       <li>Panel premium completo</li>
     </ul>
     <p style="margin-top:20px">
       <a href="${readEnv("PUBLIC_APP_URL") || "http://localhost:4321"}/dashboard"
          style="display:inline-block;background:#22d3ee;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
         Ir al dashboard
       </a>
     </p>
     <p style="margin-top:16px;font-size:13px;color:#6b7280">
       ¿Preguntas? Escríbenos a <a href="mailto:soporte@nexora.ai">soporte@nexora.ai</a>
     </p>`
  );
}

export async function sendTrialExpiredEmail(
  email: string,
  name: string
) {
  return sendEmail(
    email,
    "Tu prueba gratuita de NexoraAI ha terminado",
    `<h2>${name}, tu prueba gratuita ha terminado</h2>
     <p>Los 30 minutos de acceso premium han finalizado. Aún puedes acceder a tu cuenta con funcionalidades básicas.</p>
     <p>Para seguir disfrutando de todas las herramientas premium, puedes suscribirte por solo $29/mes.</p>
     <p style="margin-top:20px">
       <a href="${readEnv("PUBLIC_APP_URL") || "http://localhost:4321"}/upgrade"
          style="display:inline-block;background:#22d3ee;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
         Suscribirme ahora
       </a>
     </p>
     <p style="margin-top:16px;font-size:13px;color:#6b7280">
       Si tienes preguntas, responde a este email.
     </p>`
  );
}

export async function sendPaymentConfirmedEmail(
  email: string,
  name: string
) {
  return sendEmail(
    email,
    "¡Bienvenido a NexoraAI Premium!",
    `<h2>¡Gracias por suscribirte, ${name}!</h2>
     <p>Tu pago ha sido confirmado. Ya tienes acceso completo a todas las funcionalidades premium de NexoraAI.</p>
     <p>Ahora puedes disfrutar de:</p>
     <ul>
       <li>CRM avanzado con IA</li>
       <li>Dashboard completo</li>
       <li>Generación de emails con IA</li>
       <li>Soporte prioritario</li>
     </ul>
     <p style="margin-top:20px">
       <a href="${readEnv("PUBLIC_APP_URL") || "http://localhost:4321"}/premium/dashboard"
          style="display:inline-block;background:#22d3ee;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
         Ir al panel premium
       </a>
     </p>`
  );
}

export async function sendCancellationEmail(
  email: string,
  name: string
) {
  return sendEmail(
    email,
    "Confirmación de cancelación — NexoraAI",
    `<h2>Hola ${name}, confirmamos tu solicitud</h2>
     <p>Tu suscripción premium será cancelada y dejará de renovarse al final del periodo actual.</p>
     <p>Hasta ese momento, seguirás teniendo acceso completo a todas las funcionalidades premium.</p>
     <p>Si cambias de opinión, siempre puedes volver a suscribirte desde tu panel de ajustes.</p>
     <p style="margin-top:20px">
       <a href="${readEnv("PUBLIC_APP_URL") || "http://localhost:4321"}/upgrade"
          style="display:inline-block;background:#22d3ee;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
         Volver a premium
       </a>
     </p>`
  );
}
