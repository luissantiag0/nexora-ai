import { defineMiddleware } from "astro:middleware";
import { getCurrentAdmin } from "./lib/auth";
import { SESSION_COOKIE } from "./lib/session";

const PUBLIC_FILE =
  /\.(?:css|js|mjs|map|png|jpg|jpeg|gif|svg|webp|avif|ico|txt|xml|json|woff|woff2|ttf|otf)$/i;

const isPublicPath = (pathname: string) =>
  pathname === "/admin/login" ||
  pathname === "/api/leads/create" ||
  pathname.startsWith("/_astro/") ||
  pathname.startsWith("/assets/") ||
  pathname.startsWith("/images/") ||
  pathname.startsWith("/fonts/") ||
  pathname === "/favicon.ico" ||
  pathname === "/robots.txt" ||
  pathname === "/sitemap.xml" ||
  PUBLIC_FILE.test(pathname);

const isProtectedPath = (pathname: string) =>
  pathname === "/admin" ||
  pathname.startsWith("/admin/") ||
  pathname === "/dashboard" ||
  pathname.startsWith("/dashboard/") ||
  pathname === "/api/export/leads" ||
  (
    pathname.startsWith("/api/leads/") &&
    pathname !== "/api/leads/create"
  );

const addSecurityHeaders = (response: Response) => {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
};

const isSafeMethod = (method: string) =>
  ["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());

export const onRequest = defineMiddleware(
  async ({ cookies, redirect, request, url }, next) => {
    const pathname = url.pathname;

    if (
      !isProtectedPath(pathname) ||
      isPublicPath(pathname)
    ) {
      return addSecurityHeaders(await next());
    }

    if (!isSafeMethod(request.method)) {
      const origin = request.headers.get("origin");

      const originMatches =
        !origin ||
        (() => {
          try {
            return new URL(origin).origin === url.origin;
          } catch {
            return false;
          }
        })();

      if (!originMatches) {
        return addSecurityHeaders(
          new Response("Forbidden", {
            status: 403,
          })
        );
      }
    }

    const token =
      cookies.get(SESSION_COOKIE)?.value;

    const admin =
      await getCurrentAdmin(token);

    if (!admin) {
      return addSecurityHeaders(redirect("/admin/login"));
    }

    return addSecurityHeaders(await next());
  }
);
