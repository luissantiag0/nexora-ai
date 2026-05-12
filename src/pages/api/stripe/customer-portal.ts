import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentAdmin } from "../../../lib/auth";
import { createCustomerPortalSession } from "../../../lib/stripe";
import { prisma } from "../../../lib/prisma";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request, url }) => {
  try {
    const token = cookies.get(SESSION_COOKIE)?.value;
    const user = await getCurrentAdmin(token);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "No autenticado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true },
    });

    if (!dbUser?.stripeCustomerId) {
      return new Response(
        JSON.stringify({ error: "Sin cliente Stripe asociado" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const session = await createCustomerPortalSession(
      dbUser.stripeCustomerId,
      `${url.protocol}//${url.host}`
    );

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(
      "[stripe] Error en customer-portal:",
      error
    );
    return new Response(
      JSON.stringify({
        error: "Error al abrir el portal de facturación",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
