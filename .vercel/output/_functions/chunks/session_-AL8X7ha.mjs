import { randomUUID } from 'node:crypto';

const SESSION_COOKIE = "nexora_admin_session";
const ADMIN_SESSION_DURATION_SECONDS = 60 * 30;
const ADMIN_SESSION_DURATION_MS = ADMIN_SESSION_DURATION_SECONDS * 1e3;
const generateSessionToken = () => {
  return randomUUID();
};
const sessionCookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: ADMIN_SESSION_DURATION_SECONDS
};

export { ADMIN_SESSION_DURATION_MS as A, SESSION_COOKIE as S, ADMIN_SESSION_DURATION_SECONDS as a, generateSessionToken as g, sessionCookieConfig as s };
