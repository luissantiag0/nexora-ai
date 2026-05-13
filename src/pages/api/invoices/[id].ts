import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser } from "../../../lib/auth";
import { getUserInvoice, updateInvoice, deleteInvoice } from "../../../lib/invoices";
import { generateInvoicePdf } from "../../../lib/pdf";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, params, url }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const invoice = await getUserInvoice(params.id!, user.id);
  if (!invoice) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404, headers: { "Content-Type": "application/json" } });

  const download = url.searchParams.get("download") === "1";

  if (download) {
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
        total: i.total,
      })),
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total,
      notes: invoice.notes,
    });

    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="factura-${invoice.id.slice(0, 8)}.pdf"`,
      },
    });
  }

  return new Response(JSON.stringify({ invoice }), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const PATCH: APIRoute = async ({ cookies, params, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    const body = await request.json();
    const updated = await updateInvoice(params.id!, user.id, body);
    if (!updated) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404, headers: { "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ invoice: updated }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[invoices] Error updating:", err);
    return new Response(JSON.stringify({ error: "Error al actualizar" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export const DELETE: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const deleted = await deleteInvoice(params.id!, user.id);
  if (!deleted) return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const invoice = await getUserInvoice(params.id!, user.id);
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
      total: i.total,
    })),
    subtotal: invoice.subtotal,
    tax: invoice.tax,
    total: invoice.total,
    notes: invoice.notes,
  });

  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="factura-${invoice.id.slice(0, 8)}.pdf"`,
    },
  });
};
