import type { APIRoute } from "astro";
import { prisma } from "../../../lib/prisma";
import { ESTADOS_LEAD } from "../../../lib/leadStorage";

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

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id;

    if (!id) {
      return json(400, {
        success: false,
        message: "Falta el ID del lead."
      });
    }

    const body = await request.json();
    const status = String(body?.status ?? "").trim();

    if (status && !ESTADOS_LEAD.includes(status as any)) {
      return json(400, {
        success: false,
        message: "Estado no válido."
      });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...(body?.name !== undefined && { name: String(body.name).trim() }),
        ...(body?.email !== undefined && { email: String(body.email).trim().toLowerCase() }),
        ...(body?.company !== undefined && { company: String(body.company).trim() || null }),
        ...(body?.message !== undefined && { message: String(body.message).trim() }),
        ...(status && { status }),
      },
    });

    return json(200, {
      success: true,
      lead,
    });
  } catch (error) {
    console.error("[lead-patch] Error:", error);
    return json(500, {
      success: false,
      message: "No se pudo actualizar el lead."
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    if (!id) {
      return json(400, {
        success: false,
        message: "Falta el ID del lead."
      });
    }

    await prisma.lead.delete({
      where: { id },
    });

    return json(200, {
      success: true,
      message: "Lead eliminado correctamente."
    });
  } catch (error) {
    console.error("[lead-delete] Error:", error);
    return json(500, {
      success: false,
      message: "No se pudo eliminar el lead."
    });
  }
};
