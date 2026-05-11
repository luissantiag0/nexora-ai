import { p as prisma } from './prisma_Dd9Pg7uq.mjs';

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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
