import { E as ESTADOS_LEAD, b as actualizarEstadoLead } from './leadStorage_C3jvhflq.mjs';

const prerender = false;
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const leadId = String(body?.leadId ?? "").trim();
    const nuevoEstado = String(body?.estado ?? "").trim();
    if (!leadId || !nuevoEstado) {
      return json(400, {
        success: false,
        message: "Faltan parámetros obligatorios."
      });
    }
    if (!ESTADOS_LEAD.includes(nuevoEstado)) {
      return json(400, {
        success: false,
        message: "Estado no válido."
      });
    }
    const ok = await actualizarEstadoLead(leadId, nuevoEstado);
    if (!ok) {
      return json(404, {
        success: false,
        message: "Lead no encontrado."
      });
    }
    return json(200, {
      success: true,
      message: "Estado actualizado correctamente."
    });
  } catch (error) {
    console.error("[update-api] Error:", error);
    return json(500, {
      success: false,
      message: "No se pudo actualizar el estado."
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
