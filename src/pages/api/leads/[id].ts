import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";

export const prerender = false;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    if (!id) {
      return json(400, {
        success: false,
        message: "Falta el ID del lead."
      });
    }

    const lead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!lead) {
      return json(404, {
        success: false,
        message: "Lead no encontrado."
      });
    }

    return json(200, {
      success: true,
      lead
    });
  } catch (error) {
    console.error("[lead-get] Error:", error);
    return json(500, {
      success: false,
      message: "No se pudo obtener el lead."
    });
  }
};
