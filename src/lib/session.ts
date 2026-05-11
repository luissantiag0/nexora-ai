import { randomUUID } from "node:crypto";

export const SESSION_COOKIE =
  "nexora_admin_session";

export const generateSessionToken = () => {
  return randomUUID();
};

export const sessionCookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};