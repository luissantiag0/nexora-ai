import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_BZvm-TfZ.mjs';
import { getUserInvoices, getInvoiceCounts, createInvoice } from './invoices_weJHw2DQ.mjs';

const prerender = false;
const GET = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const [invoices, counts] = await Promise.all([getUserInvoices(user.id), getInvoiceCounts(user.id)]);
  return new Response(JSON.stringify({ invoices, counts }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const POST = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  try {
    const body = await request.json();
    const invoice = await createInvoice(user.id, body);
    return new Response(JSON.stringify({ invoice }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[invoices] Error:", err);
    return new Response(JSON.stringify({ error: "Error al crear factura" }), { status: 500, headers: { "Content-Type": "application/json" } });
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
