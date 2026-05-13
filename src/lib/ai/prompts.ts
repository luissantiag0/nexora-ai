export const LEAD_ANALYSIS_SYSTEM = `
Eres un asistente de IA especializado en análisis de leads y oportunidades de negocio para una agencia de automatización con IA.

Analiza el mensaje del lead y extrae:
1. Un resumen corto (máximo 2 frases) de lo que necesita el cliente
2. Una prioridad sugerida: "alta", "media" o "baja"
3. Una posible oportunidad de negocio concreta
4. Etiquetas relevantes (máximo 3)

Responde SOLO con JSON válido en este formato:
{
  "summary": "resumen corto",
  "priority": "alta|media|baja",
  "opportunity": "oportunidad concreta",
  "tags": ["etiqueta1", "etiqueta2"]
}
`;

export const EMAIL_GENERATION_SYSTEM = `
Eres un redactor comercial experto en ventas B2B de servicios tecnológicos.

Genera un email profesional y efectivo para un lead potencial de AverionAI (agencia de automatización con IA).

El email debe ser:
- Profesional pero cercano
- Enfocado en valor para el cliente
- Con llamada a la acción clara
- Breve (máximo 4 párrafos)
`;

export function buildLeadAnalysisPrompt(lead: {
  name: string;
  email: string;
  company?: string | null;
  message: string;
  notes?: string;
}) {
  return [
    `Nombre: ${lead.name}`,
    `Email: ${lead.email}`,
    `Empresa: ${lead.company || "No especificada"}`,
    `Mensaje: ${lead.message}`,
    lead.notes ? `Notas internas: ${lead.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildEmailPrompt(lead: {
  name: string;
  company?: string | null;
  message: string;
  emailType: string;
}) {
  const templates: Record<string, string> = {
    comercial: "Email comercial inicial para presentar servicios",
    seguimiento: "Email de seguimiento después de un contacto inicial",
    propuesta: "Email para adjuntar propuesta comercial",
    onboarding: "Email de bienvenida para inicio de onboarding",
  };

  return [
    `Genera un email de tipo: "${templates[lead.emailType] || templates.comercial}"`,
    ``,
    `Datos del lead:`,
    `Nombre: ${lead.name}`,
    `Empresa: ${lead.company || "No especificada"}`,
    `Mensaje original: ${lead.message}`,
    ``,
    `Genera SOLO el cuerpo del email, sin asunto ni firma compleja.`,
  ].join("\n");
}
