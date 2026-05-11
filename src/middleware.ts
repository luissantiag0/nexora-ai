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
  pathname.startsWith("/dashboard/");

export const onRequest = defineMiddleware(
  async ({ cookies, redirect, url }, next) => {
    const pathname = url.pathname;

    if (
      !isProtectedPath(pathname) ||
      isPublicPath(pathname)
    ) {
      return next();
    }

    const token =
      cookies.get(SESSION_COOKIE)?.value;

    const admin =
      await getCurrentAdmin(token);

    if (!admin) {
      return redirect("/admin/login");
    }

    return next();
  }
);
