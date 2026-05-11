import { p as prisma } from './prisma_Dd9Pg7uq.mjs';
import { randomUUID } from 'node:crypto';

const ESTADOS_LEAD = [
  "nuevo",
  "contactado",
  "cualificado",
  "propuesta_enviada",
  "ganado",
  "perdido"
];
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
  await prisma.lead.create({
    data: {
      id: lead.id,
      name: lead.nombre,
      email: lead.email,
      company: lead.empresa,
      message: lead.mensaje,
      status: lead.estado,
      createdAt: new Date(lead.timestamp),
      userId: lead.userId ?? "admin"
    }
  });
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
const getSuggestedNextAction = async (lead) => {
  const acciones = {
    nuevo: {
      accion: "Enviar email inicial y proponer llamada.",
      seguimiento: `Hola ${lead.nombre}, gracias por contactar con NexoraAI. Hemos revisado tu solicitud y nos gustaría agendar una llamada rápida para entender mejor vuestro proyecto.`
    },
    contactado: {
      accion: "Realizar seguimiento comercial en 48h.",
      seguimiento: `Hola ${lead.nombre}, quería hacer seguimiento de nuestra conversación anterior y saber si tenéis dudas sobre la propuesta.`
    },
    cualificado: {
      accion: "Preparar propuesta personalizada.",
      seguimiento: `Hola ${lead.nombre}, estamos preparando una propuesta adaptada a vuestro proyecto.`
    },
    propuesta_enviada: {
      accion: "Agendar llamada de cierre.",
      seguimiento: `Hola ${lead.nombre}, quería confirmar que habéis podido revisar la propuesta enviada.`
    },
    ganado: {
      accion: "Iniciar onboarding.",
      seguimiento: `Hola ${lead.nombre}, comenzamos el onboarding del proyecto.`
    },
    perdido: {
      accion: "Registrar motivo de pérdida y seguimiento futuro.",
      seguimiento: `Hola ${lead.nombre}, gracias por vuestro tiempo. Quedamos disponibles para futuros proyectos.`
    }
  };
  return acciones[lead.estado] || acciones.nuevo;
};

export { ESTADOS_LEAD as E, actualizarEstadoLead as a, añadirNotaLead as b, getSuggestedNextAction as c, obtenerAccionSiguiente as d, guardarLead as g, obtenerLeads as o };
