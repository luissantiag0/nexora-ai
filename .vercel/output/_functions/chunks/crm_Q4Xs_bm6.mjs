import { p as prisma } from './prisma_JAVnBMvn.mjs';
import { randomUUID } from 'node:crypto';

const LEAD_STATUSES = [
  "nuevo",
  "contactado",
  "cualificado",
  "propuesta_enviada",
  "ganado",
  "perdido"
];
function isValidStatus(s) {
  return LEAD_STATUSES.includes(s);
}
async function getUserLeads(userId, options) {
  const where = { userId };
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
      { tags: { contains: s, mode: "insensitive" } }
    ];
  }
  const leads = await prisma.lead.findMany({
    where,
    orderBy: { updatedAt: options?.sort === "asc" ? "asc" : "desc" },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
        take: 5
      }
    }
  });
  return leads;
}
async function getUserLead(leadId, userId) {
  const lead = await prisma.lead.findFirst({
    where: { id: leadId, userId },
    include: {
      notes: {
        orderBy: { createdAt: "desc" }
      }
    }
  });
  return lead;
}
async function createUserLead(userId, input) {
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
      userId
    }
  });
  return lead;
}
async function updateUserLead(leadId, userId, input) {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId }
  });
  if (!existing) return null;
  const data = {};
  if (input.name !== void 0) data.name = input.name;
  if (input.email !== void 0) data.email = input.email;
  if (input.company !== void 0) data.company = input.company;
  if (input.phone !== void 0) data.phone = input.phone;
  if (input.message !== void 0) data.message = input.message;
  if (input.source !== void 0) data.source = input.source;
  if (input.tags !== void 0) data.tags = input.tags;
  if (input.status !== void 0 && isValidStatus(input.status)) {
    data.status = input.status;
  }
  const updated = await prisma.lead.update({
    where: { id: leadId },
    data
  });
  return updated;
}
async function deleteUserLead(leadId, userId) {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId }
  });
  if (!existing) return false;
  await prisma.lead.delete({ where: { id: leadId } });
  return true;
}
async function addLeadNote(leadId, userId, text) {
  const existing = await prisma.lead.findFirst({
    where: { id: leadId, userId }
  });
  if (!existing) return null;
  const note = await prisma.leadNote.create({
    data: {
      id: randomUUID(),
      text,
      leadId
    }
  });
  return note;
}
async function getUserLeadCounts(userId) {
  const all = await prisma.lead.count({ where: { userId } });
  const thisMonth = await prisma.lead.count({
    where: {
      userId,
      createdAt: {
        gte: new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1)
      }
    }
  });
  const ganados = await prisma.lead.count({
    where: { userId, status: "ganado" }
  });
  const activos = await prisma.lead.count({
    where: {
      userId,
      status: { in: ["nuevo", "contactado", "cualificado", "propuesta_enviada"] }
    }
  });
  const conversion = all > 0 ? Math.round(ganados / all * 100) : 0;
  return { total: all, thisMonth, ganados, activos, conversion };
}

export { LEAD_STATUSES, addLeadNote, createUserLead, deleteUserLead, getUserLead, getUserLeadCounts, getUserLeads, updateUserLead };
