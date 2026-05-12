-- Ensure admin session columns exist without touching existing data.
ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "adminSessionToken" TEXT;

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "adminSessionStartedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX IF NOT EXISTS "User_adminSessionToken_key"
ON "public"."User"("adminSessionToken");

-- Premium flags are additive and safe for existing users.
ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "isPremium" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "premiumSince" TIMESTAMP(3);
