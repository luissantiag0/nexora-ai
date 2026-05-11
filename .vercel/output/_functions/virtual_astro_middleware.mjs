import { a8 as defineMiddleware, ai as sequence } from './chunks/sequence_C_MYSd8d.mjs';
import 'piccolore';
import 'clsx';
import { S as SESSION_COOKIE, g as getCurrentAdmin } from './chunks/auth_C9y5BevA.mjs';

const PUBLIC_FILE = /\.(?:css|js|mjs|map|png|jpg|jpeg|gif|svg|webp|avif|ico|txt|xml|json|woff|woff2|ttf|otf)$/i;
const isPublicPath = (pathname) => pathname === "/admin/login" || pathname === "/api/leads/create" || pathname.startsWith("/_astro/") || pathname.startsWith("/assets/") || pathname.startsWith("/images/") || pathname.startsWith("/fonts/") || pathname === "/favicon.ico" || pathname === "/robots.txt" || pathname === "/sitemap.xml" || PUBLIC_FILE.test(pathname);
const isProtectedPath = (pathname) => pathname === "/admin" || pathname.startsWith("/admin/") || pathname === "/dashboard" || pathname.startsWith("/dashboard/");
const onRequest$1 = defineMiddleware(
  async ({ cookies, redirect, url }, next) => {
    const pathname = url.pathname;
    if (!isProtectedPath(pathname) || isPublicPath(pathname)) {
      return next();
    }
    const token = cookies.get(SESSION_COOKIE)?.value;
    const admin = await getCurrentAdmin(token);
    if (!admin) {
      return redirect("/admin/login");
    }
    return next();
  }
);

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
