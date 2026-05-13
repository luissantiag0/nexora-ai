import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_BZvm-TfZ.mjs';
import { a as getUserEbooks, b as generateEbookContent, c as createEbook } from './ebook_BT63TE9m.mjs';

const prerender = false;
const GET = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  const ebooks = await getUserEbooks(user.id);
  return new Response(JSON.stringify({ ebooks }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const POST = async ({ cookies, request }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  try {
    const body = await request.json();
    const useAI = body.useAI === true;
    let ebook;
    if (useAI) {
      ebook = await generateEbookContent(user.id, {
        title: body.title || "Documento",
        topic: body.topic || "",
        audience: body.audience || ""
      });
    } else {
      ebook = await createEbook(user.id, {
        title: body.title || "Documento",
        topic: body.topic,
        audience: body.audience
      });
    }
    return new Response(JSON.stringify({ ebook }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[ebooks] Error:", err);
    return new Response(JSON.stringify({ error: "Error al crear ebook" }), { status: 500, headers: { "Content-Type": "application/json" } });
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
