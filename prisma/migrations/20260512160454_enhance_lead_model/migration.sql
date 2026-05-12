-- Add enhanced lead fields
ALTER TABLE "public"."Lead"
ADD COLUMN IF NOT EXISTS "phone" TEXT;

ALTER TABLE "public"."Lead"
ADD COLUMN IF NOT EXISTS "source" TEXT;

ALTER TABLE "public"."Lead"
ADD COLUMN IF NOT EXISTS "tags" TEXT;

ALTER TABLE "public"."Lead"
ADD COLUMN IF NOT EXISTS "priority" TEXT;

ALTER TABLE "public"."Lead"
ADD COLUMN IF NOT EXISTS "aiSummary" TEXT;

-- Add updatedAt: first as nullable, then set default for existing rows, then make NOT NULL
ALTER TABLE "public"."Lead"
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3);

UPDATE "public"."Lead" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;

ALTER TABLE "public"."Lead"
ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "public"."Lead"
ALTER COLUMN "updatedAt" SET DEFAULT now();
