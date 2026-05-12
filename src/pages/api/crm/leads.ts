import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import {
  getUserLeads,
  createUserLead,
  getUserLeadCounts,
} from "../../../lib/crm";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, url }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const status = url.searchParams.get("status") || undefined;
  const search = url.searchParams.get("search") || undefined;
  const sort = (url.searchParams.get("sort") as "asc" | "desc") || undefined;

  const [leads, counts] = await Promise.all([
    getUserLeads(user.id, { status, search, sort }),
    getUserLeadCounts(user.id),
  ]);

  return new Response(JSON.stringify({ leads, counts }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const { name, email, company, phone, message, source, tags } = body;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Nombre y email son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const lead = await createUserLead(user.id, {
      name,
      email,
      company,
      phone,
      message,
      source,
      tags,
    });

    return new Response(JSON.stringify({ lead }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[crm] Error creating lead:", err);
    return new Response(JSON.stringify({ error: "Error al crear lead" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
