import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentAdmin } from './auth_DO-wdbiw.mjs';
import { a as createCustomerPortalSession } from './stripe_Clh5xGS6.mjs';
import { p as prisma } from './prisma_JAVnBMvn.mjs';

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
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { stripeCustomerId: true }
    });
    if (!dbUser?.stripeCustomerId) {
      return new Response(
        JSON.stringify({ error: "Sin cliente Stripe asociado" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const session = await createCustomerPortalSession(
      dbUser.stripeCustomerId,
      `${url.protocol}//${url.host}`
    );
    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(
      "[stripe] Error en customer-portal:",
      error
    );
    return new Response(
      JSON.stringify({
        error: "Error al abrir el portal de facturación"
      }),
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
