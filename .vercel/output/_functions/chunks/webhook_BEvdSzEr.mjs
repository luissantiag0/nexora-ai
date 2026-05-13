import { h as handleStripeWebhook } from './stripe_DKL6y0nG.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") ?? "";
    const result = await handleStripeWebhook(body, signature);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook error";
    console.error("[stripe/webhook]", message);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
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
