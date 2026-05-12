import type { APIRoute } from "astro";
import { handleStripeWebhook } from "../../../lib/stripe";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    const signature =
      request.headers.get("stripe-signature") ?? "";

    const result = await handleStripeWebhook(body, signature);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Webhook error";
    console.error("[stripe/webhook]", message);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
