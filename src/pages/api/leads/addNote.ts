import type { APIRoute } from "astro";
import { añadirNotaLead } from "../../../lib/leadStorage";

export const prerender = false;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const leadId = String(body?.leadId ?? "").trim();
    const nota = String(body?.nota ?? "").trim();

    if (!leadId || !nota) {
      return json(400, {
        success: false,
        message: "Faltan parámetros obligatorios."
      });
    }

    const ok = await añadirNotaLead(leadId, nota);

    if (!ok) {
      return json(404, {
        success: false,
        message: "No se pudo añadir la nota."
      });
    }

    return json(200, {
      success: true,
      message: "Nota añadida correctamente."
    });
  } catch (error) {
    console.error("[add-note-api] Error:", error);
    return json(500, {
      success: false,
      message: "No se pudo añadir la nota."
    });
  }
};
