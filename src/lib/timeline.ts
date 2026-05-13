import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";

type TimelineEventType = "creado" | "estado" | "nota" | "editado" | "convertido";

const EVENT_PREFIX: Record<TimelineEventType, string> = {
  creado: "[creado]",
  estado: "[estado]",
  nota: "[nota]",
  editado: "[editado]",
  convertido: "[convertido]",
};

export async function addTimelineEvent(
  leadId: string,
  userId: string,
  type: TimelineEventType,
  description: string
) {
  const lead = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });
  if (!lead) return null;

  return prisma.leadNote.create({
    data: {
      id: randomUUID(),
      text: `${EVENT_PREFIX[type]} ${description}`,
      leadId,
    },
  });
}

export async function getLeadTimeline(leadId: string, userId: string) {
  const lead = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });
  if (!lead) return [];

  const notes = await prisma.leadNote.findMany({
    where: { leadId },
    orderBy: { createdAt: "desc" },
  });

  return notes
    .filter((n) => Object.values(EVENT_PREFIX).some((p) => n.text.startsWith(p)))
    .map((n) => {
      const type = (Object.entries(EVENT_PREFIX).find(([, p]) =>
        n.text.startsWith(p)
      )?.[0] || "nota") as TimelineEventType;
      return {
        id: n.id,
        type,
        description: n.text.replace(/^\[.*?\]\s*/, ""),
        createdAt: n.createdAt,
      };
    });
}

export async function onLeadCreated(leadId: string, userId: string) {
  return addTimelineEvent(leadId, userId, "creado", "Lead creado");
}

export async function onLeadStatusChanged(
  leadId: string,
  userId: string,
  oldStatus: string,
  newStatus: string
) {
  return addTimelineEvent(
    leadId,
    userId,
    "estado",
    `Estado cambiado de "${oldStatus}" a "${newStatus}"`
  );
}

export async function onLeadEdited(leadId: string, userId: string) {
  return addTimelineEvent(leadId, userId, "editado", "Lead editado");
}

export async function onLeadConverted(
  leadId: string,
  userId: string,
  target: string
) {
  return addTimelineEvent(
    leadId,
    userId,
    "convertido",
    `Convertido a ${target}`
  );
}
