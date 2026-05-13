import { randomUUID } from "node:crypto";

export const SESSION_COOKIE =
  "averion_session";

export const ADMIN_SESSION_DURATION_SECONDS =
  60 * 30;

export const ADMIN_SESSION_DURATION_MS =
  ADMIN_SESSION_DURATION_SECONDS * 1000;

export const generateSessionToken = () => {
  return randomUUID();
};

export const sessionCookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: ADMIN_SESSION_DURATION_SECONDS,
};
