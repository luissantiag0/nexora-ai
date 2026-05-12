import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../../lib/session";
import { getCurrentUser } from "../../../../lib/auth";
import {
  getUserLead,
  updateUserLead,
  deleteUserLead,
  addLeadNote,
} from "../../../../lib/crm";
import { analyzeLead } from "../../../../lib/ai";
import { generateEmail } from "../../../../lib/ai";
import { prisma } from "../../../../lib/prisma";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const lead = await getUserLead(params.id!, user.id);

  if (!lead) {
    return new Response(JSON.stringify({ error: "Lead no encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ lead }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const PATCH: APIRoute = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const updated = await updateUserLead(params.id!, user.id, body);

    if (!updated) {
      return new Response(JSON.stringify({ error: "Lead no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ lead: updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[crm] Error updating lead:", err);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const deleted = await deleteUserLead(params.id!, user.id);

  if (!deleted) {
    return new Response(JSON.stringify({ error: "Lead no encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const lead = await getUserLead(params.id!, user.id);
  if (!lead) {
    return new Response(JSON.stringify({ error: "Lead no encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const action = body.action;

    switch (action) {
      case "analyze": {
        const notesText = lead.notes
          .map((n) => n.text)
          .join("\n");
        const analysis = await analyzeLead({
          name: lead.name,
          email: lead.email,
          company: lead.company,
          message: lead.message,
          notes: notesText,
        });

        const tagsStr = analysis.tags.join(", ");
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            aiSummary: analysis.summary,
            priority: analysis.priority,
            tags: tagsStr || null,
          },
        });

        return new Response(JSON.stringify({ analysis }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      case "generate-email": {
        const emailType = body.emailType || "comercial";
        const emailText = await generateEmail({
          name: lead.name,
          company: lead.company,
          message: lead.message,
          emailType,
        });

        return new Response(JSON.stringify({ email: emailText }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      case "note": {
        if (!body.text) {
          return new Response(
            JSON.stringify({ error: "Texto requerido" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const note = await addLeadNote(lead.id, user.id, body.text);
        return new Response(JSON.stringify({ note }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      default:
        return new Response(JSON.stringify({ error: "Acción no válida" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
    }
  } catch (err) {
    console.error("[crm] Error processing action:", err);
    return new Response(JSON.stringify({ error: "Error procesando acción" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
