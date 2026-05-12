import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, F as Fragment, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$BrandLogo } from './BrandLogo_CC7uiFi3.mjs';
import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_DO-wdbiw.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Navbar;
  const token = Astro2.cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  const isLoggedIn = !!user;
  return renderTemplate(_a || (_a = __template(["", '<header class="site-header sticky top-0 z-50 border-b border-white/10 bg-[#07070A]/72 backdrop-blur-xl transition-all duration-300 ease-in-out" data-site-header> <div class="site-header-inner container flex min-h-16 items-center justify-between gap-4 transition-all duration-300 ease-in-out"> ', ' <nav class="hidden items-center gap-7 text-sm md:flex"> <a href="/pricing" class="text-white/55 transition hover:text-cyan-100">\nPricing\n</a> ', " ", " </nav> ", " ", ' </div> <script>\n    (() => {\n      const header = document.querySelector("[data-site-header]");\n\n      if (!header) return;\n\n      const updateHeader = () => {\n        header.classList.toggle("is-scrolled", window.scrollY > 8);\n      };\n\n      updateHeader();\n      window.addEventListener("scroll", updateHeader, { passive: true });\n    })();\n  <\/script> </header>'])), maybeRenderHead(), renderComponent($$result, "BrandLogo", $$BrandLogo, { "markClass": "h-8 w-8", "textClass": "text-lg" }), !isLoggedIn && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <a href="#services" class="text-white/55 transition hover:text-cyan-100">
Servicios
</a> <a href="#use-cases" class="text-white/55 transition hover:text-cyan-100">
Casos de uso
</a> <a href="#technology" class="text-white/55 transition hover:text-cyan-100">
Tecnología
</a> <button type="button" data-open-lead-modal class="text-white/55 transition hover:text-cyan-100">
Contacto
</button> ` })}`, isLoggedIn && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <a href="/dashboard" class="text-white/55 transition hover:text-cyan-100">
Dashboard
</a> <a href="/dashboard/settings" class="text-white/55 transition hover:text-cyan-100">
Cuenta
</a> <form method="POST" action="/logout" class="inline"> <button type="submit" class="text-white/55 transition hover:text-cyan-100">
Salir
</button> </form> ` })}`, !isLoggedIn && renderTemplate`<div class="flex items-center gap-3"> <a href="/login" class="btn-secondary px-4 py-2.5 text-sm hidden sm:inline-flex">
Iniciar sesión
</a> <a href="/register" class="btn-primary px-5 py-2.5 text-sm">
Probar gratis
</a> </div>`, isLoggedIn && renderTemplate`<form method="POST" action="/logout" class="hidden md:block"> <button class="btn-secondary px-4 py-2.5 text-sm">
Salir
</button> </form>`);
}, "C:/Users/luiss/nexora-ai/src/components/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const usefulLinks = [
    { label: "Inicio", href: "/" },
    { label: "Precios", href: "#contact" },
    { label: "Contacto", href: "#contact" },
    { label: "Acceso al panel", href: "/admin/login" }
  ];
  const legalLinks = [
    { label: "Política de privacidad", href: "/legal/privacy-policy" },
    { label: "Términos y condiciones", href: "/legal/terms" },
    { label: "Política de cookies", href: "/legal/cookies" },
    { label: "Aviso legal", href: "/legal/legal-notice" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="relative overflow-hidden border-t border-white/10 bg-[#07070A]"> <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"></div> <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.08),transparent_28rem),radial-gradient(circle_at_78%_38%,rgba(16,185,129,0.07),transparent_26rem)]"></div> <div class="container relative py-14 md:py-18"> <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-14"> <div class="max-w-md" data-reveal> ${renderComponent($$result, "BrandLogo", $$BrandLogo, { "markClass": "h-10 w-10", "textClass": "text-lg" })} <p class="mt-5 text-sm leading-relaxed text-white/58">
Tecnología para potenciar tus ventas con CRM, automatización e IA aplicada a la gestión de leads.
</p> <button type="button" data-open-lead-modal class="btn-secondary mt-6 px-5 py-2.5 text-sm">
Hablar con NexoraAI
</button> </div> <nav aria-label="Enlaces útiles" data-reveal> <h2 class="text-sm font-semibold text-white">
Enlaces útiles
</h2> <ul class="mt-5 grid gap-3 text-sm"> ${usefulLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="group inline-flex items-center gap-2 text-white/50 transition duration-300 hover:translate-x-1 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070A]"> <span class="h-px w-4 bg-white/18 transition duration-300 group-hover:w-6 group-hover:bg-cyan-300/70"></span> ${link.label} </a> </li>`)} </ul> </nav> <nav aria-label="Enlaces legales" data-reveal> <h2 class="text-sm font-semibold text-white">
Legal
</h2> <ul class="mt-5 grid gap-3 text-sm"> ${legalLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="group inline-flex items-center gap-2 text-white/50 transition duration-300 hover:translate-x-1 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070A]"> <span class="h-px w-4 bg-white/18 transition duration-300 group-hover:w-6 group-hover:bg-emerald-300/70"></span> ${link.label} </a> </li>`)} </ul> </nav> </div> <div class="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between"> <p>
© ${currentYear} NexoraAI. Todos los derechos reservados.
</p> <div class="flex flex-wrap items-center gap-x-5 gap-y-2"> <a href="#services" class="transition duration-300 hover:text-cyan-100">
Servicios
</a> <a href="#technology" class="transition duration-300 hover:text-cyan-100">
Tecnología
</a> <a href="#faq" class="transition duration-300 hover:text-cyan-100">
FAQ
</a> </div> </div> </div> </footer>`;
}, "C:/Users/luiss/nexora-ai/src/components/Footer.astro", void 0);

export { $$Navbar as $, $$Footer as a };
