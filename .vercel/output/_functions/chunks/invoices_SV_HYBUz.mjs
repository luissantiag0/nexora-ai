import { p as prisma } from './prisma_JAVnBMvn.mjs';
import { randomUUID } from 'node:crypto';

async function getUserInvoices(userId) {
  return prisma.invoice.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: { items: true }
  });
}
async function getUserInvoice(invoiceId, userId) {
  return prisma.invoice.findFirst({
    where: { id: invoiceId, userId },
    include: { items: true }
  });
}
async function createInvoice(userId, input) {
  const items = input.items.map((item) => ({
    id: randomUUID(),
    description: item.description,
    quantity: item.quantity,
    price: item.price,
    total: item.quantity * item.price
  }));
  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const tax = input.tax ?? 0;
  const total = subtotal + tax;
  const invoice = await prisma.invoice.create({
    data: {
      id: randomUUID(),
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      company: input.company || null,
      dueDate: input.dueDate ? new Date(input.dueDate) : null,
      subtotal,
      tax,
      total,
      notes: input.notes || null,
      status: "borrador",
      userId,
      items: { create: items }
    },
    include: { items: true }
  });
  return invoice;
}
async function updateInvoice(invoiceId, userId, input) {
  const existing = await prisma.invoice.findFirst({
    where: { id: invoiceId, userId }
  });
  if (!existing) return null;
  let itemsData;
  if (input.items) {
    itemsData = input.items.map((item) => ({
      id: randomUUID(),
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price
    }));
  }
  const data = {};
  if (input.clientName) data.clientName = input.clientName;
  if (input.clientEmail) data.clientEmail = input.clientEmail;
  if (input.company !== void 0) data.company = input.company;
  if (input.dueDate !== void 0) data.dueDate = input.dueDate ? new Date(input.dueDate) : null;
  if (input.notes !== void 0) data.notes = input.notes;
  if (input.status) data.status = input.status;
  if (input.tax !== void 0) data.tax = input.tax;
  if (itemsData) {
    const subtotal = itemsData.reduce((sum, i) => sum + i.total, 0);
    const tax = input.tax ?? existing.tax;
    data.subtotal = subtotal;
    data.tax = tax;
    data.total = subtotal + tax;
  }
  const updated = await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      ...data,
      ...itemsData ? { items: { deleteMany: {}, create: itemsData } } : {}
    },
    include: { items: true }
  });
  return updated;
}
async function deleteInvoice(invoiceId, userId) {
  const existing = await prisma.invoice.findFirst({
    where: { id: invoiceId, userId }
  });
  if (!existing) return false;
  await prisma.invoice.delete({ where: { id: invoiceId } });
  return true;
}
async function getInvoiceCounts(userId) {
  const [total, pendiente, pagada, borrador] = await Promise.all([
    prisma.invoice.count({ where: { userId } }),
    prisma.invoice.count({ where: { userId, status: "pendiente" } }),
    prisma.invoice.count({ where: { userId, status: "pagada" } }),
    prisma.invoice.count({ where: { userId, status: "borrador" } })
  ]);
  const invoices = await prisma.invoice.findMany({
    where: { userId },
    select: { total: true, status: true }
  });
  const totalAmount = invoices.reduce((sum, inv) => {
    if (inv.status === "pagada" || inv.status === "pendiente") return sum + inv.total;
    return sum;
  }, 0);
  const pendingAmount = invoices.filter((inv) => inv.status === "pendiente").reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = invoices.filter((inv) => inv.status === "pagada").reduce((sum, inv) => sum + inv.total, 0);
  return { total, pendiente, pagada, borrador, totalAmount, pendingAmount, paidAmount };
}
async function createInvoiceFromLead(leadId, userId) {
  const { getUserLead } = await import('./crm_Q4Xs_bm6.mjs');
  const lead = await getUserLead(leadId, userId);
  if (!lead) return null;
  return createInvoice(userId, {
    clientName: lead.name,
    clientEmail: lead.email,
    company: lead.company,
    items: [{ description: "Servicios de automatización NexoraAI", quantity: 1, price: 0 }],
    notes: `Factura generada desde lead: ${lead.message?.substring(0, 100)}`
  });
}

export { createInvoice, createInvoiceFromLead, deleteInvoice, getInvoiceCounts, getUserInvoice, getUserInvoices, updateInvoice };
