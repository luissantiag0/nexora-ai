import { Resend } from "resend";

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

export const sendNewLeadEmail =
  async (lead: {
    nombre: string;
    email: string;
    empresa?: string | null;
    mensaje: string;
  }) => {
    const resendApiKey =
      readEnv("RESEND_API_KEY");

    const adminEmail =
      readEnv("ADMIN_EMAIL") ||
      readEnv("LEAD_TO_EMAIL");

    const fromEmail =
      readEnv("LEAD_FROM_EMAIL") ||
      "NexoraAI <onboarding@resend.dev>";

    if (!resendApiKey || !adminEmail) {
      console.log(
        "[email] Email omitido: faltan RESEND_API_KEY o ADMIN_EMAIL."
      );
      return;
    }

    const resend =
      new Resend(resendApiKey);

    await resend.emails.send({
      from:
        fromEmail,

      to:
        [adminEmail],

      subject:
        "Nuevo lead recibido",

      replyTo:
        lead.email,

      html: `
        <h2>Nuevo lead</h2>

        <p><strong>Nombre:</strong> ${lead.nombre}</p>

        <p><strong>Email:</strong> ${lead.email}</p>

        <p><strong>Empresa:</strong> ${
          lead.empresa || "-"
        }</p>

        <p><strong>Mensaje:</strong></p>

        <p>${lead.mensaje}</p>
      `,
    });
  };
