import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_BZvm-TfZ.mjs';
import { d as deleteEbook, g as getUserEbook } from './ebook_BT63TE9m.mjs';
import { g as generateEbookPdf } from './pdf_DQMHRl9e.mjs';

const prerender = false;
const GET = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const ebook = await getUserEbook(params.id, user.id);
  if (!ebook) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ ebook }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const DELETE = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const deleted = await deleteEbook(params.id, user.id);
  if (!deleted) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const POST = async ({ cookies, params }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const ebook = await getUserEbook(params.id, user.id);
  if (!ebook) return new Response(JSON.stringify({ error: "No encontrado" }), { status: 404, headers: { "Content-Type": "application/json" } });
  const pdf = await generateEbookPdf({
    title: ebook.title,
    content: ebook.content || "Sin contenido"
  });
  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="ebook-${ebook.id.slice(0, 8)}.pdf"`
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
