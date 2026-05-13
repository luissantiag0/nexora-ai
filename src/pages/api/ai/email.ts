import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ message: "IA no implementada aún", available: false }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
