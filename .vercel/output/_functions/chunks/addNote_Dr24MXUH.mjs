import { d as a_adirNotaLead } from './leadStorage_C3jvhflq.mjs';

const prerender = false;
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const POST = async ({ request }) => {
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
    const ok = await a_adirNotaLead(leadId, nota);
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
