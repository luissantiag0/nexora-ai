/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    user?: (import("@prisma/client").User & {
      subscriptionStatus?: string | null;
      subscriptionCurrentPeriodEnd?: Date | null;
      trialStartedAt?: Date | null;
      trialEndsAt?: Date | null;
      name?: string | null;
    }) | null;
  }
}
