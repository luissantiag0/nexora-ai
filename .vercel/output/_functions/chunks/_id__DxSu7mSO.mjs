import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_BZvm-TfZ.mjs';
import { deleteUserLead, getUserLead, updateUserLead, addLeadNote } from './crm_CRjbA4A0.mjs';
import { a as askAI } from './provider_A1rwxBFz.mjs';
import { p as prisma } from './prisma_jaorxYCI.mjs';

const LEAD_ANALYSIS_SYSTEM = `
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
const EMAIL_GENERATION_SYSTEM = `
Eres un redactor comercial experto en ventas B2B de servicios tecnológicos.

Genera un email profesional y efectivo para un lead potencial de NexoraAI (agencia de automatización con IA).

El email debe ser:
- Profesional pero cercano
- Enfocado en valor para el cliente
- Con llamada a la acción clara
- Breve (máximo 4 párrafos)
`;
function buildLeadAnalysisPrompt(lead) {
  return [
    `Nombre: ${lead.name}`,
    `Email: ${lead.email}`,
    `Empresa: ${lead.company || "No especificada"}`,
    `Mensaje: ${lead.message}`,
    lead.notes ? `Notas internas: ${lead.notes}` : null
  ].filter(Boolean).join("\n");
}
function buildEmailPrompt(lead) {
  const templates = {
    comercial: "Email comercial inicial para presentar servicios",
    seguimiento: "Email de seguimiento después de un contacto inicial",
    propuesta: "Email para adjuntar propuesta comercial",
    onboarding: "Email de bienvenida para inicio de onboarding"
  };
  return [
    `Genera un email de tipo: "${templates[lead.emailType] || templates.comercial}"`,
    ``,
    `Datos del lead:`,
    `Nombre: ${lead.name}`,
    `Empresa: ${lead.company || "No especificada"}`,
    `Mensaje original: ${lead.message}`,
    ``,
    `Genera SOLO el cuerpo del email, sin asunto ni firma compleja.`
  ].join("\n");
}

async function analyzeLead(lead) {
  const prompt = buildLeadAnalysisPrompt(lead);
  try {
    const raw = await askAI(prompt, LEAD_ANALYSIS_SYSTEM);
    const parsed = JSON.parse(raw);
    return {
      summary: parsed.summary || "",
      priority: parsed.priority || "baja",
      opportunity: parsed.opportunity || "",
      tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 3) : []
    };
  } catch {
    return {
      summary: "Lead pendiente de análisis automático.",
      priority: "media",
      opportunity: "Revisión manual requerida",
      tags: ["pendiente"]
    };
  }
}

async function generateEmail(lead) {
  const prompt = buildEmailPrompt(lead);
  try {
    const result = await askAI(prompt, EMAIL_GENERATION_SYSTEM);
    return result || fallbackEmail(lead);
  } catch {
    return fallbackEmail(lead);
  }
}
function fallbackEmail(lead) {
  return [
    `Hola ${lead.name},`,
    ``,
    `Gracias por contactar con NexoraAI. Hemos recibido tu consulta y nos gustaría ayudarte a encontrar la mejor solución de automatización con IA para tu negocio.`,
    ``,
    lead.company ? `En ${lead.company}, sabemos que cada negocio tiene necesidades únicas. Por eso ofrecemos soluciones a medida que se adaptan a tus procesos actuales.` : "",
    ``,
    `¿Te gustaría agendar una llamada de 15 minutos para explorar cómo podemos ayudarte?`,
    ``,
    `Quedo atento a tu respuesta.`,
    ``,
    `Saludos cordiales,`,
    `Equipo NexoraAI`
  ].filter(Boolean).join("\n");
}

const prerender = false;
const GET = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const lead = await getUserLead(params.id, user.id);
  if (!lead) {
    return new Response(JSON.stringify({ error: "Lead no encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ lead }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const PATCH = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json();
    const updated = await updateUserLead(params.id, user.id, body);
    if (!updated) {
      return new Response(JSON.stringify({ error: "Lead no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ lead: updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[crm] Error updating lead:", err);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const deleted = await deleteUserLead(params.id, user.id);
  if (!deleted) {
    return new Response(JSON.stringify({ error: "Lead no encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const lead = await getUserLead(params.id, user.id);
  if (!lead) {
    return new Response(JSON.stringify({ error: "Lead no encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json();
    const action = body.action;
    switch (action) {
      case "analyze": {
        const notesText = lead.notes.map((n) => n.text).join("\n");
        const analysis = await analyzeLead({
          name: lead.name,
          email: lead.email,
          company: lead.company,
          message: lead.message,
          notes: notesText
        });
        const tagsStr = analysis.tags.join(", ");
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            aiSummary: analysis.summary,
            priority: analysis.priority,
            tags: tagsStr || null
          }
        });
        return new Response(JSON.stringify({ analysis }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      case "generate-email": {
        const emailType = body.emailType || "comercial";
        const emailText = await generateEmail({
          name: lead.name,
          company: lead.company,
          message: lead.message,
          emailType
        });
        return new Response(JSON.stringify({ email: emailText }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      case "note": {
        if (!body.text) {
          return new Response(
            JSON.stringify({ error: "Texto requerido" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        const note = await addLeadNote(lead.id, user.id, body.text);
        return new Response(JSON.stringify({ note }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      default:
        return new Response(JSON.stringify({ error: "Acción no válida" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
    }
  } catch (err) {
    console.error("[crm] Error processing action:", err);
    return new Response(JSON.stringify({ error: "Error procesando acción" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
