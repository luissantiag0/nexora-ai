import { p as prisma } from './prisma_JAVnBMvn.mjs';
import { E as ESTADOS_LEAD } from './leadStorage_C6vk3OUN.mjs';

const prerender = false;
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const GET = async ({ params }) => {
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
const PATCH = async ({ params, request }) => {
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
    if (status && !ESTADOS_LEAD.includes(status)) {
      return json(400, {
        success: false,
        message: "Estado no válido."
      });
    }
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...body?.name !== void 0 && { name: String(body.name).trim() },
        ...body?.email !== void 0 && { email: String(body.email).trim().toLowerCase() },
        ...body?.company !== void 0 && { company: String(body.company).trim() || null },
        ...body?.message !== void 0 && { message: String(body.message).trim() },
        ...status && { status }
      }
    });
    return json(200, {
      success: true,
      lead
    });
  } catch (error) {
    console.error("[lead-patch] Error:", error);
    return json(500, {
      success: false,
      message: "No se pudo actualizar el lead."
    });
  }
};
const DELETE = async ({ params }) => {
  try {
    const id = params.id;
    if (!id) {
      return json(400, {
        success: false,
        message: "Falta el ID del lead."
      });
    }
    await prisma.lead.delete({
      where: { id }
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
