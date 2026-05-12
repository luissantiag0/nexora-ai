import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentAdmin } from './auth_DO-wdbiw.mjs';
import { c as createCheckoutSession } from './stripe_Clh5xGS6.mjs';

const prerender = false;
const POST = async ({ cookies, request, url }) => {
  try {
    const token = cookies.get(SESSION_COOKIE)?.value;
    const user = await getCurrentAdmin(token);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "No autenticado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    if (user.isPremium) {
      return new Response(
        JSON.stringify({ error: "Ya tienes premium activo" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const session = await createCheckoutSession(
      user.id,
      user.email,
      `${url.protocol}//${url.host}`
    );
    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[stripe] Error en create-checkout:", error);
    return new Response(
      JSON.stringify({ error: "Error al crear sesión de pago" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
