import Stripe from "stripe";
import { prisma } from "./prisma";
import { sendPaymentConfirmedEmail, sendCancellationEmail } from "./emailAutomation";
import { logger } from "./logger";

export const PREMIUM_PRICE_ID =
  process.env.STRIPE_PRICE_ID_PREMIUM?.trim() ?? "";

export const BUSINESS_PRICE_ID =
  process.env.STRIPE_PRICE_ID_BUSINESS?.trim() ?? "";

export const WEBHOOK_SECRET =
  process.env.STRIPE_WEBHOOK_SECRET?.trim() ?? "";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY no configurada");
  return new Stripe(key, { apiVersion: "2025-02-24.acacia" });
}

let _stripe: Stripe | null = null;

function stripe(): Stripe {
  if (!_stripe) _stripe = getStripe();
  return _stripe;
}

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string
): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  });

  if (user?.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe().customers.create({
    email,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

export async function createCheckoutSession(
  userId: string,
  email: string,
  origin: string,
  plan: "premium" | "business" = "premium"
) {
  const priceId = plan === "business" ? BUSINESS_PRICE_ID : PREMIUM_PRICE_ID;
  const customerId = await getOrCreateStripeCustomer(userId, email);

  const session = await stripe().checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/premium/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    metadata: { userId, plan },
    subscription_data: { metadata: { userId, plan } },
  });

  return session;
}

export async function createCustomerPortalSession(
  customerId: string,
  origin: string
) {
  return stripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/premium/settings`,
  });
}

async function updateUserSubscription(
  userId: string,
  subscription: Stripe.Subscription
) {
  const isActive =
    subscription.status === "active" || subscription.status === "trialing";

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0]?.price.id ?? null,
      subscriptionStatus: subscription.status,
      subscriptionCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
      isPremium: isActive,
    },
  });
}

async function findUserIdByCustomer(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer
): Promise<string | null> {
  const customerId =
    typeof customer === "string" ? customer : customer.id;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
    select: { id: true },
  });

  return user?.id ?? null;
}

export async function handleStripeWebhook(
  body: string,
  signature: string
) {
  const event = stripe().webhooks.constructEvent(
    body,
    signature,
    WEBHOOK_SECRET
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== "subscription") break;

      const userId =
        session.metadata?.userId ??
        (await findUserIdByCustomer(session.customer!));

      if (!userId) break;

      const subscriptionId = session.subscription as string;
      if (!subscriptionId) break;

      const subscription =
        await stripe().subscriptions.retrieve(subscriptionId);
      await updateUserSubscription(userId, subscription);

      const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, name: true } });
      if (user && subscription.status === "active") {
        sendPaymentConfirmedEmail(user.email, user.name || "Usuario").catch(() => {});
        logger.audit("user.upgrade", userId, { plan: "premium", source: "checkout" });
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId =
        subscription.metadata?.userId ??
        (await findUserIdByCustomer(subscription.customer));

      if (!userId) break;

      await updateUserSubscription(userId, subscription);

      if (event.type === "customer.subscription.deleted" && subscription.status === "canceled") {
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, name: true } });
        if (user) sendCancellationEmail(user.email, user.name || "Usuario").catch(() => {});
        logger.audit("user.cancel", userId, { plan: "premium", status: "canceled" });
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      if (!invoice.subscription) break;

      const subscription = await stripe().subscriptions.retrieve(
        invoice.subscription as string
      );
      const userId =
        subscription.metadata?.userId ??
        (await findUserIdByCustomer(subscription.customer));

      if (userId) {
        await updateUserSubscription(userId, subscription);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;
      if (!subscriptionId) break;

      const userId =
        invoice.metadata?.userId ??
        (await findUserIdByCustomer(invoice.customer!));

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { subscriptionStatus: "past_due" },
        });
      }
      break;
    }
  }

  return { received: true };
}
