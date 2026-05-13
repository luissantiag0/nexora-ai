-- Performance indexes for CRM queries
CREATE INDEX IF NOT EXISTS "Lead_userId_status_idx"
ON "public"."Lead"("userId", "status");

CREATE INDEX IF NOT EXISTS "Lead_userId_createdAt_idx"
ON "public"."Lead"("userId", "createdAt" DESC);

CREATE INDEX IF NOT EXISTS "Lead_userId_updatedAt_idx"
ON "public"."Lead"("userId", "updatedAt" DESC);

CREATE INDEX IF NOT EXISTS "LeadNote_leadId_createdAt_idx"
ON "public"."LeadNote"("leadId", "createdAt" DESC);
