import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import { createCheckoutSession, PREMIUM_PRICE_ID, BUSINESS_PRICE_ID } from "../../../lib/stripe";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request, url }) => {
  try {
    const token = cookies.get(SESSION_COOKIE)?.value;
    const user = await getCurrentUser(token);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "No autenticado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (user.isPremium) {
      return new Response(
        JSON.stringify({ error: "Ya tienes premium activo" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let plan: "premium" | "business" = "premium";
    try {
      const body = await request.json();
      if (body.plan === "business") plan = "business";
    } catch {}

    if (plan === "business" && !BUSINESS_PRICE_ID) {
      return new Response(
        JSON.stringify({ error: "Plan Business no disponible aún. Configura STRIPE_PRICE_ID_BUSINESS" }),
        { status: 501, headers: { "Content-Type": "application/json" } }
      );
    }

    const session = await createCheckoutSession(
      user.id,
      user.email,
      `${url.protocol}//${url.host}`,
      plan
    );

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[stripe] Error en create-checkout:", error);
    return new Response(
      JSON.stringify({ error: "Error al crear sesión de pago" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
