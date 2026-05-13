import { askAI } from "./provider";
import {
  EMAIL_GENERATION_SYSTEM,
  buildEmailPrompt,
} from "./prompts";

export async function generateEmail(lead: {
  name: string;
  company?: string | null;
  message: string;
  emailType: string;
}): Promise<string> {
  const prompt = buildEmailPrompt(lead);

  try {
    const result = await askAI(prompt, EMAIL_GENERATION_SYSTEM);
    return result || fallbackEmail(lead);
  } catch {
    return fallbackEmail(lead);
  }
}

function fallbackEmail(lead: {
  name: string;
  company?: string | null;
  message: string;
}): string {
  return [
    `Hola ${lead.name},`,
    ``,
    `Gracias por contactar con AverionAI. Hemos recibido tu consulta y nos gustaría ayudarte a encontrar la mejor solución de automatización con IA para tu negocio.`,
    ``,
    lead.company
      ? `En ${lead.company}, sabemos que cada negocio tiene necesidades únicas. Por eso ofrecemos soluciones a medida que se adaptan a tus procesos actuales.`
      : "",
    ``,
    `¿Te gustaría agendar una llamada de 15 minutos para explorar cómo podemos ayudarte?`,
    ``,
    `Quedo atento a tu respuesta.`,
    ``,
    `Saludos cordiales,`,
    `Equipo AverionAI`,
  ]
    .filter(Boolean)
    .join("\n");
}
