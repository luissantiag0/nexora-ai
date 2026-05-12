import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";

export const LEAD_STATUSES = [
  "nuevo",
  "contactado",
  "cualificado",
  "propuesta_enviada",
  "ganado",
  "perdido",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface CreateLeadInput {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  message?: string;
  source?: string;
  tags?: string;
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  company?: string | null;
  phone?: string | null;
  message?: string;
  status?: LeadStatus;
  source?: string;
  tags?: string;
}

function isValidStatus(s: string): s is LeadStatus {
  return LEAD_STATUSES.includes(s as LeadStatus);
}

export async function getUserLeads(
  userId: string,
  options?: {
    status?: string;
    search?: string;
    sort?: "asc" | "desc";
  }
) {
  const where: Record<string, unknown> = { userId };

  if (options?.status && isValidStatus(options.status)) {
    where.status = options.status;
  }

  if (options?.search) {
    const s = options.search;
    where.OR = [
      { name: { contains: s, mode: "insensitive" } },
      { email: { contains: s, mode: "insensitive" } },
      { company: { contains: s, mode: "insensitive" } },
      { message: { contains: s, mode: "insensitive" } },
      { tags: { contains: s, mode: "insensitive" } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where: where as any,
    orderBy: { updatedAt: options?.sort === "asc" ? "asc" : "desc" },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  return leads;
}

export async function getUserLead(leadId: string, userId: string) {
  const lead = await prisma.lead.findFirst({
    where: { id: leadId, userId },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return lead;
}

export async function createUserLead(
  userId: string,
  input: CreateLeadInput
) {
  const lead = await prisma.lead.create({
    data: {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      company: input.company || null,
      phone: input.phone || null,
      message: input.message || "",
      source: input.source || "manual",
      tags: input.tags || null,
      status: "nuevo",
      userId,
    },
  });

  return lead;
}

export async function updateUserLead(
  leadId: string,
  userId: string,
  input: UpdateLeadInput
) {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });

  if (!existing) return null;

  const data: Record<string, unknown> = {};

  if (input.name !== undefined) data.name = input.name;
  if (input.email !== undefined) data.email = input.email;
  if (input.company !== undefined) data.company = input.company;
  if (input.phone !== undefined) data.phone = input.phone;
  if (input.message !== undefined) data.message = input.message;
  if (input.source !== undefined) data.source = input.source;
  if (input.tags !== undefined) data.tags = input.tags;
  if (input.status !== undefined && isValidStatus(input.status)) {
    data.status = input.status;
  }

  const updated = await prisma.lead.update({
    where: { id: leadId },
    data,
  });

  return updated;
}

export async function deleteUserLead(leadId: string, userId: string) {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });

  if (!existing) return false;

  await prisma.lead.delete({ where: { id: leadId } });
  return true;
}

export async function addLeadNote(
  leadId: string,
  userId: string,
  text: string
) {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });

  if (!existing) return null;

  const note = await prisma.leadNote.create({
    data: {
      id: randomUUID(),
      text,
      leadId,
    },
  });

  return note;
}

export async function getLeadNotes(leadId: string, userId: string) {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId },
  });

  if (!existing) return null;

  return prisma.leadNote.findMany({
    where: { leadId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserLeadCounts(userId: string) {
  const all = await prisma.lead.count({ where: { userId } });
  const thisMonth = await prisma.lead.count({
    where: {
      userId,
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });
  const ganados = await prisma.lead.count({
    where: { userId, status: "ganado" },
  });
  const activos = await prisma.lead.count({
    where: {
      userId,
      status: { in: ["nuevo", "contactado", "cualificado", "propuesta_enviada"] },
    },
  });

  const conversion = all > 0 ? Math.round((ganados / all) * 100) : 0;

  return { total: all, thisMonth, ganados, activos, conversion };
}
