import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";
import { askAI } from "./ai/provider";

const DECK_SECTIONS = [
  "Problema y oportunidad",
  "Solución y diferenciación",
  "Modelo de negocio",
  "Go-to-market",
  "Roadmap y métricas",
];

export interface PitchSection {
  title: string;
  content: string;
}

export async function getUserPitchDecks(userId: string) {
  return prisma.pitchDeck.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getUserPitchDeck(id: string, userId: string) {
  return prisma.pitchDeck.findFirst({
    where: { id, userId },
  });
}

export async function createPitchDeck(
  userId: string,
  data: { title: string; clientType?: string; objective?: string }
) {
  return prisma.pitchDeck.create({
    data: {
      id: randomUUID(),
      title: data.title,
      clientType: data.clientType || null,
      objective: data.objective || null,
      sections: JSON.stringify(
        DECK_SECTIONS.map((title) => ({ title, content: "" }))
      ),
      userId,
    },
  });
}

export async function updatePitchDeckSections(
  id: string,
  userId: string,
  sections: PitchSection[]
) {
  const existing = await prisma.pitchDeck.findFirst({ where: { id, userId } });
  if (!existing) return null;

  return prisma.pitchDeck.update({
    where: { id },
    data: { sections: JSON.stringify(sections) },
  });
}

export async function deletePitchDeck(id: string, userId: string) {
  const existing = await prisma.pitchDeck.findFirst({ where: { id, userId } });
  if (!existing) return false;
  await prisma.pitchDeck.delete({ where: { id } });
  return true;
}

export async function generateDeckWithAI(
  userId: string,
  data: { title: string; clientType: string; objective: string }
) {
  const prompt = `Genera el contenido para un pitch deck comercial de AverionAI (agencia de automatización con IA).

Título: ${data.title}
Tipo de cliente: ${data.clientType}
Objetivo: ${data.objective}

Genera contenido para estas 5 secciones. Responde SOLO con JSON válido con esta estructura exacta:
{
  "sections": [
    {"title": "Problema y oportunidad", "content": "..."},
    {"title": "Solución y diferenciación", "content": "..."},
    {"title": "Modelo de negocio", "content": "..."},
    {"title": "Go-to-market", "content": "..."},
    {"title": "Roadmap y métricas", "content": "..."}
  ]
}

Cada sección debe tener 3-5 párrafos profesionales en español.`;

  try {
    const raw = await askAI(prompt, "Eres un experto en ventas B2B y creación de pitch decks para startups tecnológicas.");
    const parsed = JSON.parse(raw);

    if (parsed.sections && Array.isArray(parsed.sections)) {
      const sections = parsed.sections.map((s: any) => ({
        title: s.title || "",
        content: s.content || "",
      }));

      const deck = await prisma.pitchDeck.create({
        data: {
          id: randomUUID(),
          title: data.title,
          clientType: data.clientType,
          objective: data.objective,
          sections: JSON.stringify(sections),
          status: "completado",
          userId,
        },
      });

      return deck;
    }
  } catch {}

  return createPitchDeck(userId, data);
}
