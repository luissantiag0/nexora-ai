import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import { getUserEbooks, createEbook, generateEbookContent } from "../../../lib/ebook";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const ebooks = await getUserEbooks(user.id);
  return new Response(JSON.stringify({ ebooks }), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    const body = await request.json();
    const useAI = body.useAI === true;

    let ebook;
    if (useAI) {
      ebook = await generateEbookContent(user.id, {
        title: body.title || "Documento",
        topic: body.topic || "",
        audience: body.audience || "",
      });
    } else {
      ebook = await createEbook(user.id, {
        title: body.title || "Documento",
        topic: body.topic,
        audience: body.audience,
      });
    }

    return new Response(JSON.stringify({ ebook }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[ebooks] Error:", err);
    return new Response(JSON.stringify({ error: "Error al crear ebook" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
