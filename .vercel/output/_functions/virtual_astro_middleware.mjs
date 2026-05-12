import { a8 as defineMiddleware, ai as sequence } from './chunks/sequence_CpdTfaFG.mjs';
import 'piccolore';
import 'clsx';
import { S as SESSION_COOKIE } from './chunks/session_-AL8X7ha.mjs';

const PUBLIC_FILE = /\.(?:css|js|mjs|map|png|jpg|jpeg|gif|svg|webp|avif|ico|txt|xml|json|woff|woff2|ttf|otf)$/i;
const isPublicPath = (pathname) => pathname === "/" || pathname === "/admin/login" || pathname === "/login" || pathname === "/register" || pathname === "/upgrade" || pathname === "/pricing" || pathname.startsWith("/legal/") || pathname === "/api/leads/create" || pathname === "/api/stripe/webhook" || pathname.startsWith("/_astro/") || pathname.startsWith("/assets/") || pathname.startsWith("/images/") || pathname.startsWith("/fonts/") || pathname === "/favicon.ico" || pathname === "/robots.txt" || pathname === "/sitemap.xml" || PUBLIC_FILE.test(pathname);
const isProtectedPath = (pathname) => pathname === "/admin" || pathname.startsWith("/admin/") || pathname === "/premium" || pathname.startsWith("/premium/") || pathname === "/dashboard" || pathname.startsWith("/dashboard/") || pathname === "/api/export/leads" || pathname.startsWith("/api/crm/") || pathname.startsWith("/api/analytics/") || pathname.startsWith("/api/leads/") && pathname !== "/api/leads/create";
const addSecurityHeaders = (response) => {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
};
const isSafeMethod = (method) => ["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());
const onRequest$1 = defineMiddleware(
  async ({ cookies, locals, redirect, request, url }, next) => {
    const pathname = url.pathname;
    if (!isProtectedPath(pathname) || isPublicPath(pathname)) {
      return addSecurityHeaders(await next());
    }
    if (!isSafeMethod(request.method)) {
      const origin = request.headers.get("origin");
      const originMatches = !origin || (() => {
        try {
          return new URL(origin).origin === url.origin;
        } catch {
          return false;
        }
      })();
      if (!originMatches) {
        return addSecurityHeaders(
          new Response("Forbidden", {
            status: 403
          })
        );
      }
    }
    const token = cookies.get(SESSION_COOKIE)?.value;
    const {
      getCurrentUser,
      userIsAdmin,
      userHasPremiumAccess
    } = await import('./chunks/auth_DO-wdbiw.mjs');
    const user = await getCurrentUser(token);
    if (!user) {
      if (token) {
        cookies.delete(SESSION_COOKIE, { path: "/" });
      }
      const loginPath = pathname.startsWith("/admin") ? "/admin/login" : "/login";
      return addSecurityHeaders(redirect(loginPath));
    }
    if ((pathname === "/admin" || pathname.startsWith("/admin/")) && !userIsAdmin(user)) {
      return addSecurityHeaders(redirect("/dashboard"));
    }
    if ((pathname === "/premium" || pathname.startsWith("/premium/")) && !userHasPremiumAccess(user)) {
      return addSecurityHeaders(redirect("/upgrade"));
    }
    locals.user = user;
    return addSecurityHeaders(await next());
  }
);

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
