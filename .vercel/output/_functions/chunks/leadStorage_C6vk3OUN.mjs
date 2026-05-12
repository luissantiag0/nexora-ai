import { p as prisma } from './prisma_JAVnBMvn.mjs';
import { randomUUID } from 'node:crypto';
import { hash } from 'bcryptjs';

const ESTADOS_LEAD = [
  "nuevo",
  "contactado",
  "cualificado",
  "propuesta_enviada",
  "ganado",
  "perdido"
];
const DEFAULT_LEAD_OWNER_EMAIL = "lead-owner@nexora.local";
const leadOwnerSelect = {
  id: true,
  email: true,
  role: true,
  createdAt: true
};
const obtenerUsuarioParaLeads = async (preferredEmail) => {
  const existingUser = await prisma.user.findFirst({
    orderBy: {
      createdAt: "asc"
    },
    select: leadOwnerSelect
  });
  if (existingUser) {
    return existingUser;
  }
  const ownerEmail = (typeof process !== "undefined" ? process.env.LEAD_OWNER_EMAIL : "")?.trim().toLowerCase() || DEFAULT_LEAD_OWNER_EMAIL;
  const passwordHash = await hash(randomUUID(), 10);
  const createdUser = await prisma.user.create({
    data: {
      email: ownerEmail,
      passwordHash,
      role: "system"
    },
    select: leadOwnerSelect
  }).catch(async (error) => {
    const existingAfterRace = await prisma.user.findUnique({
      where: {
        email: ownerEmail
      },
      select: leadOwnerSelect
    });
    if (existingAfterRace) {
      return existingAfterRace;
    }
    throw error;
  });
  return createdUser;
};
const obtenerAccionSiguiente = (estado) => {
  const mapa = {
    nuevo: "Enviar email de presentación y proponer auditoría.",
    contactado: "Hacer seguimiento en 48 horas.",
    cualificado: "Preparar propuesta comercial.",
    propuesta_enviada: "Agendar llamada de revisión.",
    ganado: "Iniciar onboarding.",
    perdido: "Registrar motivo de pérdida."
  };
  return mapa[estado];
};
const guardarLead = async (lead) => {
  const userId = lead.userId ?? (await obtenerUsuarioParaLeads()).id;
  await prisma.lead.create({
    data: {
      id: lead.id,
      name: lead.nombre,
      email: lead.email,
      company: lead.empresa,
      message: lead.mensaje,
      status: lead.estado,
      createdAt: new Date(lead.timestamp),
      userId
    }
  });
};
const crearLeadManual = async (lead) => {
  const created = await prisma.lead.create({
    data: {
      id: randomUUID(),
      name: lead.nombre,
      email: lead.email,
      company: lead.empresa || null,
      message: lead.mensaje,
      status: lead.estado ?? "nuevo",
      userId: lead.userId
    }
  });
  return created.id;
};
const actualizarLead = async (leadId, data) => {
  if (!ESTADOS_LEAD.includes(data.estado)) {
    return false;
  }
  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId
    }
  });
  if (!lead) {
    return false;
  }
  await prisma.lead.update({
    where: {
      id: leadId
    },
    data: {
      name: data.nombre,
      email: data.email,
      company: data.empresa || null,
      message: data.mensaje,
      status: data.estado
    }
  });
  return true;
};
const eliminarLead = async (leadId) => {
  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId
    }
  });
  if (!lead) {
    return false;
  }
  await prisma.lead.delete({
    where: {
      id: leadId
    }
  });
  return true;
};
const obtenerLeads = async () => {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      notes: {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  return leads.map((lead) => ({
    id: lead.id,
    nombre: lead.name,
    email: lead.email,
    empresa: lead.company,
    mensaje: lead.message,
    estado: lead.status,
    timestamp: lead.createdAt.toISOString(),
    createdAt: lead.createdAt,
    userId: lead.userId,
    notas: lead.notes.map((note) => ({
      id: note.id,
      texto: note.text,
      createdAt: note.createdAt
    }))
  }));
};
const actualizarEstadoLead = async (leadId, estado) => {
  if (!ESTADOS_LEAD.includes(estado)) {
    return false;
  }
  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId
    }
  });
  if (!lead) {
    return false;
  }
  await prisma.lead.update({
    where: {
      id: leadId
    },
    data: {
      status: estado
    }
  });
  return true;
};
const añadirNotaLead = async (leadId, textoNota) => {
  const texto = textoNota.trim();
  if (!texto) {
    return false;
  }
  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId
    }
  });
  if (!lead) {
    return false;
  }
  await prisma.leadNote.create({
    data: {
      id: randomUUID(),
      text: texto,
      createdAt: /* @__PURE__ */ new Date(),
      leadId
    }
  });
  return true;
};
const anadirNotaLead = añadirNotaLead;

export { ESTADOS_LEAD as E, actualizarLead as a, actualizarEstadoLead as b, crearLeadManual as c, añadirNotaLead as d, eliminarLead as e, anadirNotaLead as f, guardarLead as g, obtenerAccionSiguiente as h, obtenerLeads as o };
