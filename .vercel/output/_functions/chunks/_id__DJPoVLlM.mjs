import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_BZvm-TfZ.mjs';
import { deleteInvoice, getUserInvoice, updateInvoice } from './invoices_weJHw2DQ.mjs';
import { a as generateInvoicePdf } from './pdf_DQMHRl9e.mjs';

const prerender = false;
const GET = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const invoice = await getUserInvoice(params.id, user.id);
  if (!invoice) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ invoice }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const PATCH = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  try {
    const body = await request.json();
    const updated = await updateInvoice(params.id, user.id, body);
    if (!updated) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404, headers: { "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ invoice: updated }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[invoices] Error updating:", err);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
const DELETE = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const deleted = await deleteInvoice(params.id, user.id);
  if (!deleted) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const POST = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const invoice = await getUserInvoice(params.id, user.id);
  if (!invoice) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404, headers: { "Content-Type": "application/json" } });
  const pdf = await generateInvoicePdf({
    invoiceNumber: invoice.id.slice(0, 8),
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    company: invoice.company,
    dueDate: invoice.dueDate?.toLocaleDateString("es-ES"),
    status: invoice.status,
    items: invoice.items.map((i) => ({
      description: i.description,
      quantity: i.quantity,
      price: i.price,
      total: i.total
    })),
    subtotal: invoice.subtotal,
    tax: invoice.tax,
    total: invoice.total,
    notes: invoice.notes
  });
  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="factura-${invoice.id.slice(0, 8)}.pdf"`
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
