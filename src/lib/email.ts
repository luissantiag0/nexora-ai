import { Resend } from "resend";

const DEFAULT_ADMIN_EMAIL =
  "contact@averionai.es";

type LeadEmailPayload = {
  nombre: string;
  email: string;
  empresa?: string | null;
  mensaje: string;
};

const readEnv = (key: string): string => {
  const fromProcess =
    typeof process !== "undefined"
      ? process.env?.[key]
      : undefined;

  const fromMeta =
    (import.meta.env[key] as string | undefined) ??
    undefined;

  return (fromProcess ?? fromMeta ?? "").trim();
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildLeadEmailHtml = (lead: LeadEmailPayload) => {
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

export const sendNewLeadEmail =
  async (lead: LeadEmailPayload): Promise<boolean> => {
    const resendApiKey =
      readEnv("RESEND_API_KEY");

    const toEmail =
      readEnv("ADMIN_EMAIL") ||
      readEnv("LEAD_TO_EMAIL") ||
      DEFAULT_ADMIN_EMAIL;

    const fromEmail =
      readEnv("LEAD_FROM_EMAIL") ||
      "onboarding@resend.dev";

    if (!resendApiKey) {
      console.warn("[email] RESEND_API_KEY no configurada. Email omitido.");
      return false;
    }

    try {
      const resend =
        new Resend(resendApiKey);

      const { data, error } =
        await resend.emails.send({
          from: fromEmail,
          to: [toEmail],
          subject: `Nuevo lead: ${lead.nombre}`,
          replyTo: lead.email,
          text:
            `Nuevo lead recibido\n\n` +
            `Nombre: ${lead.nombre}\n` +
            `Email: ${lead.email}\n` +
            `Empresa: ${lead.empresa || "-"}\n\n` +
            `Mensaje:\n${lead.mensaje}`,
          html: buildLeadEmailHtml(lead),
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
