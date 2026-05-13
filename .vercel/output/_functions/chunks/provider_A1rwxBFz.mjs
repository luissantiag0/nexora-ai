const getOpenAIKey = () => process.env.OPENAI_API_KEY?.trim() || "";
const getAnthropicKey = () => process.env.ANTHROPIC_API_KEY?.trim() || "";
function getActiveProvider() {
  if (getOpenAIKey()) return "openai";
  if (getAnthropicKey()) return "anthropic";
  return "mock";
}
async function askAI(prompt, systemPrompt) {
  const provider = getActiveProvider();
  if (provider === "openai") {
    return askOpenAI(prompt, systemPrompt);
  }
  if (provider === "anthropic") {
    return askAnthropic(prompt, systemPrompt);
  }
  return askMock(prompt);
}
async function askOpenAI(prompt, systemPrompt) {
  const key = getOpenAIKey();
  const res = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          ...systemPrompt ? [{ role: "system", content: systemPrompt }] : [],
          { role: "user", content: prompt }
        ],
        max_tokens: 1024,
        temperature: 0.7
      })
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
async function askAnthropic(prompt, systemPrompt) {
  const key = getAnthropicKey();
  const res = await fetch(
    "https://api.anthropic.com/v1/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: systemPrompt ?? "",
        messages: [{ role: "user", content: prompt }]
      })
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic error: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text?.trim() ?? "";
}
async function askMock(prompt, _systemPrompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes("resum") || lower.includes("summar")) {
    return JSON.stringify({
      summary: "Lead interesado en servicios de automatización con IA. Potencial cliente para soluciones CRM y RAG.",
      priority: lower.includes("urge") || lower.includes("urgente") ? "alta" : lower.includes("presup") || lower.includes("presupuesto") ? "media" : "baja",
      opportunity: lower.includes("empresa") || lower.includes("gran") ? "Expansión a plataforma completa" : lower.includes("soporte") || lower.includes("automat") ? "Automatización de procesos" : "Consulta inicial",
      tags: lower.includes("email") ? ["email-automation", "crm"] : lower.includes("soporte") || lower.includes("support") ? ["soporte", "ia"] : lower.includes("venta") || lower.includes("lead") ? ["ventas", "crm"] : ["consulta", "ia"]
    });
  }
  if (lower.includes("email") || lower.includes("comercial")) {
    return [
      `Hola,`,
      ``,
      `Soy el equipo de NexoraAI. Hemos visto tu interés en nuestras soluciones de automatización con IA y queremos ayudarte a dar el siguiente paso.`,
      ``,
      `En NexoraAI construimos sistemas a medida que transforman procesos manuales en flujos automatizados, reduciendo costes operativos y acelerando resultados.`,
      ``,
      `¿Te gustaría agendar una llamada de 20 minutos para explorar cómo podemos ayudarte?`,
      ``,
      `Quedo atento a tu respuesta.`,
      ``,
      `Saludos cordiales,`,
      `Equipo NexoraAI`
    ].join("\n");
  }
  return "Análisis completado. No se detectaron patrones específicos.";
}

export { askAI as a };
