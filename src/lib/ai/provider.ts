const getOpenAIKey = () => process.env.OPENAI_API_KEY?.trim() || "";
const getAnthropicKey = () => process.env.ANTHROPIC_API_KEY?.trim() || "";

export type AIProvider = "openai" | "anthropic" | "mock";

export function getActiveProvider(): AIProvider {
  if (getOpenAIKey()) return "openai";
  if (getAnthropicKey()) return "anthropic";
  return "mock";
}

export async function askAI(prompt: string, systemPrompt?: string): Promise<string> {
  const provider = getActiveProvider();
  if (provider === "openai") return askOpenAI(prompt, systemPrompt);
  if (provider === "anthropic") return askAnthropic(prompt, systemPrompt);
  return askMock(prompt, systemPrompt);
}

async function askOpenAI(prompt: string, systemPrompt?: string): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getOpenAIKey()}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function askAnthropic(prompt: string, systemPrompt?: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": getAnthropicKey(), "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-3-haiku-20240307", max_tokens: 1024, system: systemPrompt ?? "", messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Anthropic error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text?.trim() ?? "";
}

async function askMock(prompt: string, _systemPrompt?: string): Promise<string> {
  const lower = prompt.toLowerCase();

  if (lower.includes("resum") || lower.includes("lead")) {
    const name = extractName(prompt);
    const msg = extractMessage(prompt);
    const priority = msg.includes("urgente") || msg.includes("presupuesto") ? "alta" : msg.includes("automatiz") ? "media" : "baja";
    return JSON.stringify({
      summary: `Cliente potencial${name ? `: ${name}` : ""} interesado en servicios de automatización. ${msg ? `Mensaje: ${msg.substring(0, 100)}` : ""}`,
      priority,
      opportunity: priority === "alta" ? "Oportunidad de venta inmediata. Requiere seguimiento urgente." : "Posible oportunidad de automatización de procesos.",
      tags: msg.includes("email") ? ["email-marketing", "automatizacion"] : msg.includes("soporte") ? ["soporte", "ia"] : msg.includes("venta") ? ["ventas", "crm"] : ["consulta", "ia"],
    });
  }

  if (lower.includes("email") || lower.includes("comercial")) {
    const name = extractName(prompt) || "cliente";
    return [
      `Hola ${name},`,
      ``,
      `Gracias por tu interés en NexoraAI. Hemos analizado tu consulta y creemos que podemos ayudarte a optimizar tus procesos con automatización inteligente.`,
      ``,
      `En NexoraAI desarrollamos soluciones a medida que reducen costes operativos y aceleran resultados: desde CRM con IA hasta sistemas RAG y automatización comercial completa.`,
      ``,
      `¿Te gustaría agendar una llamada de 15 minutos para explorar cómo podemos ayudarte?`,
      ``,
      `Quedo atento a tu respuesta.`,
      ``,
      `Saludos cordiales,`,
      `Equipo NexoraAI`,
    ].join("\n");
  }

  if (lower.includes("clasif")) {
    return JSON.stringify({
      category: extractMessage(prompt).includes("urgente") ? "alta-prioridad" : "cualificado",
      confidence: 0.75,
      tags: ["automatizacion", "ia", "crm"],
    });
  }

  if (lower.includes("insight") || lower.includes("venta")) {
    return JSON.stringify({
      summary: "Oportunidades identificadas en el pipeline actual. Se recomienda priorizar leads en fase de negociación.",
      opportunities: ["Automatización de procesos comerciales", "Implementación de CRM con IA", "Sistema RAG para soporte"],
      risks: ["Baja tasa de conversión en leads fríos", "Seguimiento insuficiente en fase de propuesta"],
    });
  }

  return JSON.stringify({ summary: "Análisis completado.", priority: "media", tags: ["pendiente"] });
}

function extractName(prompt: string): string {
  const match = prompt.match(/nombre[:\s]+([^\n,]+)/i) || prompt.match(/(?:para|de)\s+([A-Z][a-záéíóú]+(?:\s[A-Z][a-záéíóú]+)?)/);
  return match?.[1]?.trim() || "";
}

function extractMessage(prompt: string): string {
  const match = prompt.match(/mensaje[:\s]+([^\n]+)/i) || prompt.match(/mensaje original[:\s]+([^\n]+)/i);
  return match?.[1]?.trim() || prompt.substring(0, 200);
}
