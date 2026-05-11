import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";

/* =========================================
   ESTADOS
========================================= */

export const ESTADOS_LEAD = [
  "nuevo",
  "contactado",
  "cualificado",
  "propuesta_enviada",
  "ganado",
  "perdido",
] as const;

export type EstadoLead = (typeof ESTADOS_LEAD)[number];

/* =========================================
   TIPOS
========================================= */

export type LeadAlmacenado = {
  id: string;
  nombre: string;
  email: string;
  empresa: string | null;
  mensaje: string;
  estado: EstadoLead;
  timestamp: string;
  userId?: string;
  notas: {
    id: string;
    texto: string;
    createdAt: Date;
  }[];
};

/* =========================================
   ACCIONES SUGERIDAS
========================================= */

export const obtenerAccionSiguiente = (
  estado: EstadoLead
): string => {
  const mapa: Record<EstadoLead, string> = {
    nuevo:
      "Enviar email de presentación y proponer auditoría.",
    contactado:
      "Hacer seguimiento en 48 horas.",
    cualificado:
      "Preparar propuesta comercial.",
    propuesta_enviada:
      "Agendar llamada de revisión.",
    ganado:
      "Iniciar onboarding.",
    perdido:
      "Registrar motivo de pérdida.",
  };

  return mapa[estado];
};

/* =========================================
   CREAR LEAD
========================================= */

export const guardarLead = async (
  lead: LeadAlmacenado
): Promise<void> => {
  await prisma.lead.create({
    data: {
      id: lead.id,
      name: lead.nombre,
      email: lead.email,
      company: lead.empresa,
      message: lead.mensaje,
      status: lead.estado,
      createdAt: new Date(lead.timestamp),
      userId: lead.userId ?? "admin",
    },
  });
};

/* =========================================
   OBTENER LEADS
========================================= */

export const obtenerLeads = async () => {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      notes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return leads.map((lead) => ({
    id: lead.id,
    nombre: lead.name,
    email: lead.email,
    empresa: lead.company,
    mensaje: lead.message,
    estado: lead.status as EstadoLead,
    timestamp: lead.createdAt.toISOString(),
    createdAt: lead.createdAt,
    userId: lead.userId,
    notas: lead.notes.map((note) => ({
      id: note.id,
      texto: note.text,
      createdAt: note.createdAt,
    })),
  }));
};

/* =========================================
   ACTUALIZAR ESTADO
========================================= */

export const actualizarEstadoLead = async (
  leadId: string,
  estado: EstadoLead
): Promise<boolean> => {
  if (!ESTADOS_LEAD.includes(estado)) {
    return false;
  }

  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId,
    },
  });

  if (!lead) {
    return false;
  }

  await prisma.lead.update({
    where: {
      id: leadId,
    },
    data: {
      status: estado,
    },
  });

  return true;
};

/* =========================================
   AÑADIR NOTA
========================================= */

export const añadirNotaLead = async (
  leadId: string,
  textoNota: string
): Promise<boolean> => {
  const texto = textoNota.trim();

  if (!texto) {
    return false;
  }

  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId,
    },
  });

  if (!lead) {
    return false;
  }

  await prisma.leadNote.create({
    data: {
      id: randomUUID(),
      text: texto,
      createdAt: new Date(),
      leadId,
    },
  });

  return true;
};

export const getSuggestedNextAction =
  async (lead: {
    nombre: string;
    email: string;
    empresa?: string | null;
    mensaje: string;
    estado: string;
  }) => {

    const acciones = {
      nuevo: {
        accion:
          "Enviar email inicial y proponer llamada.",

        seguimiento:
          `Hola ${lead.nombre}, gracias por contactar con NexoraAI. Hemos revisado tu solicitud y nos gustaría agendar una llamada rápida para entender mejor vuestro proyecto.`,
      },

      contactado: {
        accion:
          "Realizar seguimiento comercial en 48h.",

        seguimiento:
          `Hola ${lead.nombre}, quería hacer seguimiento de nuestra conversación anterior y saber si tenéis dudas sobre la propuesta.`,
      },

      cualificado: {
        accion:
          "Preparar propuesta personalizada.",

        seguimiento:
          `Hola ${lead.nombre}, estamos preparando una propuesta adaptada a vuestro proyecto.`,
      },

      propuesta_enviada: {
        accion:
          "Agendar llamada de cierre.",

        seguimiento:
          `Hola ${lead.nombre}, quería confirmar que habéis podido revisar la propuesta enviada.`,
      },

      ganado: {
        accion:
          "Iniciar onboarding.",

        seguimiento:
          `Hola ${lead.nombre}, comenzamos el onboarding del proyecto.`,
      },

      perdido: {
        accion:
          "Registrar motivo de pérdida y seguimiento futuro.",

        seguimiento:
          `Hola ${lead.nombre}, gracias por vuestro tiempo. Quedamos disponibles para futuros proyectos.`,
      },
    };

    return (
      acciones[
        lead.estado as keyof typeof acciones
      ] || acciones.nuevo
    );
  };