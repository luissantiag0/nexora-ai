import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import { updateUserLead, LEAD_STATUSES, type LeadStatus } from "../../../lib/crm";
import { sanitizeString } from "../../../lib/security";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    const body = await request.json();
    const leadId = sanitizeString(body.leadId || "", 50);
    const nuevoEstado = sanitizeString(body.nuevoEstado || "", 20);

    if (!leadId || !nuevoEstado || !LEAD_STATUSES.includes(nuevoEstado as LeadStatus)) {
      return new Response(JSON.stringify({ error: "Datos inválidos" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const updated = await updateUserLead(leadId, user.id, { status: nuevoEstado as LeadStatus });
    if (!updated) return new Response(JSON.stringify({ error: "Lead no encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[leads] Error en update:", err);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
