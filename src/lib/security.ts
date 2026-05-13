import { prisma, isDbReady } from "./prisma";

// ─── RATE LIMITING (DB-backed for serverless) ───────────────────

export const AUTH_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
export const AUTH_MAX_ATTEMPTS = 5;

export function sanitizeString(value: string, maxLength = 500): string {
  return value
    .replace(/[<>{}`$\\"]/g, "")
    .replace(/[&]/g, "&amp;")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeEmail(value: string): string {
  return value.trim().toLowerCase().slice(0, 254);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value);
}

export function isValidName(value: string): boolean {
  return value.length >= 2 && value.length <= 100;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

// ─── CSRF PROTECTION ────────────────────────────────────────────

export function isValidCsrfOrigin(
  request: Request,
  allowedOrigin?: string
): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false; // Require origin for non-safe methods
  try {
    const parsed = new URL(origin);
    if (allowedOrigin) return parsed.origin === allowedOrigin;
    return true; // Will be checked by middleware
  } catch {
    return false;
  }
}

export function createCsrfToken(): string {
  const { randomUUID } = require("node:crypto");
  return randomUUID();
}

// ─── ENV GUARDS ──────────────────────────────────────────────────

export function requireEnv(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) {
    console.warn(`[env] ${key} no configurada`);
    return "";
  }
  return value;
}

export function safeJsonParse<T>(text: string, fallback: T): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

// ─── IN-MEMORY RATE LIMITING (per-instance; use Redis for production) ───

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function detectRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;

  if (entry.count > maxAttempts) {
    console.warn(`[rate-limit] Excedido para ${key}: ${entry.count} intentos`);
    return true;
  }

  return false;
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) rateLimitStore.delete(key);
  }
}, 5 * 60 * 1000).unref();
