import { logger } from "./logger";
import { sendReactivationEmail } from "./emailAutomation";
import { prisma } from "./prisma";

export interface TriggerEvent {
  type: string;
  userId: string;
  data: Record<string, unknown>;
}

export async function processTrigger(event: TriggerEvent) {
  logger.audit(`trigger.${event.type}`, event.userId, event.data);

  switch (event.type) {
    case "lead.created":
      await onLeadCreated(event);
      break;
    case "lead.converted":
      await onLeadConverted(event);
      break;
    case "user.inactive":
      await onUserInactive(event);
      break;
    case "invoice.created":
      await onInvoiceCreated(event);
      break;
  }
}

async function onLeadCreated(event: TriggerEvent) {
  const count = await prisma.lead.count({ where: { userId: event.userId } });
  if (count === 1) {
    logger.audit("milestone.first_lead", event.userId, { message: "Usuario creó su primer lead" });
  }
}

async function onLeadConverted(event: TriggerEvent) {
  logger.audit("milestone.lead_won", event.userId, { leadId: event.data.leadId });
}

async function onUserInactive(event: TriggerEvent) {
  const user = await prisma.user.findUnique({
    where: { id: event.userId },
    select: { email: true, name: true },
  });
  if (user) {
    await sendReactivationEmail(user.email, user.name || "Usuario");
    logger.audit("email.reactivation", event.userId, { email: user.email });
  }
}

async function onInvoiceCreated(event: TriggerEvent) {
  const count = await prisma.invoice.count({ where: { userId: event.userId } });
  if (count === 1) {
    logger.audit("milestone.first_invoice", event.userId, { message: "Usuario creó su primera factura" });
  }
}

export async function checkInactiveUsers() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const inactiveUsers = await prisma.user.findMany({
    where: {
      createdAt: { lt: sevenDaysAgo },
      isPremium: false,
    },
    select: { id: true, email: true, name: true },
  });

  for (const user of inactiveUsers) {
    await processTrigger({ type: "user.inactive", userId: user.id, data: { email: user.email } });
  }
}
