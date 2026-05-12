import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";
import { askAI } from "./ai/provider";

export async function getUserEbooks(userId: string) {
  return prisma.ebook.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getUserEbook(id: string, userId: string) {
  return prisma.ebook.findFirst({ where: { id, userId } });
}

export async function createEbook(
  userId: string,
  data: { title: string; topic?: string; audience?: string }
) {
  return prisma.ebook.create({
    data: {
      id: randomUUID(),
      title: data.title,
      topic: data.topic || null,
      audience: data.audience || null,
      status: "borrador",
      userId,
    },
  });
}

export async function generateEbookContent(
  userId: string,
  data: { title: string; topic: string; audience: string }
) {
  const prompt = `Genera un ebook/briefing profesional de NexoraAI.

Título: ${data.title}
Tema: ${data.topic}
Audiencia: ${data.audience}

Genera contenido completo con:
1. Resumen ejecutivo (2-3 párrafos)
2. Contexto y problema
3. Solución propuesta
4. Beneficios clave
5. Casos de uso
6. Próximos pasos

Responde SOLO con el contenido en formato texto plano, usando # para títulos de sección.`;

  try {
    const content = await askAI(prompt, "Eres un redactor comercial profesional especializado en contenido B2B tecnológico.");

    const structure = [
      "Resumen ejecutivo",
      "Contexto y problema",
      "Solución propuesta",
      "Beneficios clave",
      "Casos de uso",
      "Próximos pasos",
    ];

    const ebook = await prisma.ebook.create({
      data: {
        id: randomUUID(),
        title: data.title,
        topic: data.topic,
        audience: data.audience,
        structure: JSON.stringify(structure),
        content,
        status: "completado",
        userId,
      },
    });

    return ebook;
  } catch {
    return createEbook(userId, data);
  }
}

export async function deleteEbook(id: string, userId: string) {
  const existing = await prisma.ebook.findFirst({ where: { id, userId } });
  if (!existing) return false;
  await prisma.ebook.delete({ where: { id } });
  return true;
}
