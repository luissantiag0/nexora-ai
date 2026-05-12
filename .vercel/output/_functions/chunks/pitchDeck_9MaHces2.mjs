import { p as prisma } from './prisma_JAVnBMvn.mjs';
import { randomUUID } from 'node:crypto';
import { a as askAI } from './provider_A1rwxBFz.mjs';

const DECK_SECTIONS = [
  "Problema y oportunidad",
  "Solución y diferenciación",
  "Modelo de negocio",
  "Go-to-market",
  "Roadmap y métricas"
];
async function getUserPitchDecks(userId) {
  return prisma.pitchDeck.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" }
  });
}
async function getUserPitchDeck(id, userId) {
  return prisma.pitchDeck.findFirst({
    where: { id, userId }
  });
}
async function createPitchDeck(userId, data) {
  return prisma.pitchDeck.create({
    data: {
      id: randomUUID(),
      title: data.title,
      clientType: data.clientType || null,
      objective: data.objective || null,
      sections: JSON.stringify(
        DECK_SECTIONS.map((title) => ({ title, content: "" }))
      ),
      userId
    }
  });
}
async function updatePitchDeckSections(id, userId, sections) {
  const existing = await prisma.pitchDeck.findFirst({ where: { id, userId } });
  if (!existing) return null;
  return prisma.pitchDeck.update({
    where: { id },
    data: { sections: JSON.stringify(sections) }
  });
}
async function deletePitchDeck(id, userId) {
  const existing = await prisma.pitchDeck.findFirst({ where: { id, userId } });
  if (!existing) return false;
  await prisma.pitchDeck.delete({ where: { id } });
  return true;
}
async function generateDeckWithAI(userId, data) {
  const prompt = `Genera el contenido para un pitch deck comercial de NexoraAI (agencia de automatización con IA).

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
      const sections = parsed.sections.map((s) => ({
        title: s.title || "",
        content: s.content || ""
      }));
      const deck = await prisma.pitchDeck.create({
        data: {
          id: randomUUID(),
          title: data.title,
          clientType: data.clientType,
          objective: data.objective,
          sections: JSON.stringify(sections),
          status: "completado",
          userId
        }
      });
      return deck;
    }
  } catch {
  }
  return createPitchDeck(userId, data);
}

export { getUserPitchDecks as a, generateDeckWithAI as b, createPitchDeck as c, deletePitchDeck as d, getUserPitchDeck as g, updatePitchDeckSections as u };
