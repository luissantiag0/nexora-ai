import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_DO-wdbiw.mjs';
import { d as deletePitchDeck, g as getUserPitchDeck, u as updatePitchDeckSections } from './pitchDeck_9MaHces2.mjs';
import { b as generatePitchDeckPdf } from './pdf_D_PyesHN.mjs';

const prerender = false;
const GET = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const deck = await getUserPitchDeck(params.id, user.id);
  if (!deck) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ deck }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const PATCH = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  try {
    const body = await request.json();
    if (body.sections) {
      const updated = await updatePitchDeckSections(params.id, user.id, body.sections);
      if (!updated) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
      return new Response(JSON.stringify({ deck: updated }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ error: "Sections requerido" }), { status: 400, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[pitchdecks] Error:", err);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
const DELETE = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const deleted = await deletePitchDeck(params.id, user.id);
  if (!deleted) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const POST = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const deck = await getUserPitchDeck(params.id, user.id);
  if (!deck) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
  const sections = deck.sections ? JSON.parse(deck.sections) : [];
  const pdf = await generatePitchDeckPdf({
    title: deck.title,
    clientType: deck.clientType,
    objective: deck.objective,
    sections
  });
  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="pitchdeck-${deck.id.slice(0, 8)}.pdf"`
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
