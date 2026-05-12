import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import { getUserPitchDecks, createPitchDeck, generateDeckWithAI } from "../../../lib/pitchDeck";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const decks = await getUserPitchDecks(user.id);
  return new Response(JSON.stringify({ decks }), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ cookies, request }) => {
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
        objective: body.objective || "",
      });
    } else {
      deck = await createPitchDeck(user.id, {
        title: body.title || "Pitch Deck",
        clientType: body.clientType,
        objective: body.objective,
      });
    }

    return new Response(JSON.stringify({ deck }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[pitchdecks] Error:", err);
    return new Response(JSON.stringify({ error: "Error al crear pitch deck" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
