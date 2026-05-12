import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_DO-wdbiw.mjs';
import { a as getUserPitchDecks, b as generateDeckWithAI, c as createPitchDeck } from './pitchDeck_9MaHces2.mjs';

const prerender = false;
const GET = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const decks = await getUserPitchDecks(user.id);
  return new Response(JSON.stringify({ decks }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const POST = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  try {
    const body = await request.json();
    const useAI = body.useAI === true;
    let deck;
    if (useAI) {
      deck = await generateDeckWithAI(user.id, {
        title: body.title || "Pitch Deck",
        clientType: body.clientType || "",
        objective: body.objective || ""
      });
    } else {
      deck = await createPitchDeck(user.id, {
        title: body.title || "Pitch Deck",
        clientType: body.clientType,
        objective: body.objective
      });
    }
    return new Response(JSON.stringify({ deck }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[pitchdecks] Error:", err);
    return new Response(JSON.stringify({ error: "Error al crear pitch deck" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
