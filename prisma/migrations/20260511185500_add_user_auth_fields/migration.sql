-- AlterTable
ALTER TABLE "public"."User" RENAME COLUMN "password" TO "passwordHash";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN "adminSessionToken" TEXT;

-- AlterTable
ALTER TABLE "public"."Lead" ALTER COLUMN "status" SET DEFAULT 'nuevo';

-- CreateIndex
CREATE UNIQUE INDEX "User_adminSessionToken_key" ON "public"."User"("adminSessionToken");
