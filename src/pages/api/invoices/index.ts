import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import { getUserInvoices, createInvoice, getInvoiceCounts } from "../../../lib/invoices";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const [invoices, counts] = await Promise.all([getUserInvoices(user.id), getInvoiceCounts(user.id)]);
  return new Response(JSON.stringify({ invoices, counts }), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    const body = await request.json();
    const invoice = await createInvoice(user.id, body);
    return new Response(JSON.stringify({ invoice }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[invoices] Error:", err);
    return new Response(JSON.stringify({ error: "Error al crear factura" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
