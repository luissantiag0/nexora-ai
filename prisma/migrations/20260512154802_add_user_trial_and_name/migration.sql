-- Add user name and trial fields
ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "name" TEXT;

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "trialStartedAt" TIMESTAMP(3);

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "trialEndsAt" TIMESTAMP(3);
