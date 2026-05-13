import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import { getUserLead, updateUserLead, deleteUserLead } from "../../../lib/crm";
import { sanitizeString } from "../../../lib/security";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const lead = await getUserLead(params.id!, user.id);
  if (!lead) return new Response(JSON.stringify({ error: "Lead no encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });

  return new Response(JSON.stringify({ lead }), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const PATCH: APIRoute = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    const body = await request.json();
    const sanitized: Record<string, unknown> = {};
    if (body.name !== undefined) sanitized.name = sanitizeString(body.name, 100);
    if (body.email !== undefined) sanitized.email = sanitizeString(body.email, 254).toLowerCase();
    if (body.company !== undefined) sanitized.company = body.company ? sanitizeString(body.company, 100) : null;
    if (body.message !== undefined) sanitized.message = sanitizeString(body.message, 2000);
    if (body.status !== undefined) sanitized.status = sanitizeString(body.status, 20);
    if (body.tags !== undefined) sanitized.tags = body.tags ? sanitizeString(body.tags, 200) : null;

    const updated = await updateUserLead(params.id!, user.id, sanitized as any);
    if (!updated) return new Response(JSON.stringify({ error: "Lead no encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });

    return new Response(JSON.stringify({ lead: updated }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[leads] Error updating:", err);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const DELETE: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const deleted = await deleteUserLead(params.id!, user.id);
  if (!deleted) return new Response(JSON.stringify({ error: "Lead no encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });

  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
};
