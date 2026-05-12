import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import { getUserPitchDeck, updatePitchDeckSections, deletePitchDeck } from "../../../lib/pitchDeck";
import { generatePitchDeckPdf } from "../../../lib/pdf";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const deck = await getUserPitchDeck(params.id!, user.id);
  if (!deck) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ deck }), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const PATCH: APIRoute = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    const body = await request.json();
    if (body.sections) {
      const updated = await updatePitchDeckSections(params.id!, user.id, body.sections);
      if (!updated) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ deck: updated }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ error: "Sections requerido" }), { status: 400, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[pitchdecks] Error:", err);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const DELETE: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const deleted = await deletePitchDeck(params.id!, user.id);
  if (!deleted) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const deck = await getUserPitchDeck(params.id!, user.id);
  if (!deck) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });

  const sections = deck.sections ? JSON.parse(deck.sections) : [];
  const pdf = await generatePitchDeckPdf({
    title: deck.title,
    clientType: deck.clientType,
    objective: deck.objective,
    sections,
  });

  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="pitchdeck-${deck.id.slice(0, 8)}.pdf"`,
    },
  });
};
