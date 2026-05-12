import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_DO-wdbiw.mjs';
import { getUserLeads, getUserLeadCounts, createUserLead } from './crm_Q4Xs_bm6.mjs';

const prerender = false;
const GET = async ({ cookies, url }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const status = url.searchParams.get("status") || void 0;
  const search = url.searchParams.get("search") || void 0;
  const sort = url.searchParams.get("sort") || void 0;
  const [leads, counts] = await Promise.all([
    getUserLeads(user.id, { status, search, sort }),
    getUserLeadCounts(user.id)
  ]);
  return new Response(JSON.stringify({ leads, counts }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
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
      tags
    });
    return new Response(JSON.stringify({ lead }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[crm] Error creating lead:", err);
    return new Response(JSON.stringify({ error: "Error al crear lead" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
