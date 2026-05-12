-- Stripe subscription fields for premium billing
ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "stripeCustomerId" TEXT;

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "stripeSubscriptionId" TEXT;

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "stripePriceId" TEXT;

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "subscriptionStatus" TEXT;

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "subscriptionCurrentPeriodEnd" TIMESTAMP(3);

CREATE UNIQUE INDEX IF NOT EXISTS "User_stripeCustomerId_key"
ON "public"."User"("stripeCustomerId");

CREATE UNIQUE INDEX IF NOT EXISTS "User_stripeSubscriptionId_key"
ON "public"."User"("stripeSubscriptionId");
