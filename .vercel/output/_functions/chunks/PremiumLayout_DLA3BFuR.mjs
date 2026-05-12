import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { bc as renderHead, a4 as addAttribute, T as renderTemplate, D as renderSlot } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
/* empty css                 */
import { $ as $$BrandLogo } from './BrandLogo_CC7uiFi3.mjs';

const $$PremiumLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PremiumLayout;
  const {
    title = "Panel Premium",
    eyebrow = "NexoraAI Premium"
  } = Astro2.props;
  const user = Astro2.locals.user;
  const navItems = [
    { label: "Dashboard", href: "/premium/dashboard" },
    { label: "Leads", href: "/premium/leads" },
    { label: "Facturas", href: "/premium/invoices" },
    { label: "Ebooks", href: "/premium/ebooks" },
    { label: "Pitch decks", href: "/premium/pitchdecks" },
    { label: "Informes", href: "/premium/reports" },
    { label: "SEO", href: "/premium/seo" },
    { label: "Ajustes", href: "/premium/settings" }
  ];
  const isActive = (href) => Astro2.url.pathname === href || Astro2.url.pathname.startsWith(`${href}/`);
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | NexoraAI</title><meta name="theme-color" content="#07070A">${renderHead()}</head> <body class="min-h-screen bg-[#07070A] text-white antialiased selection:bg-cyan-300/20 selection:text-cyan-100"> <div class="min-h-screen lg:flex"> <aside class="hidden border-r border-white/10 bg-[#07070A]/92 px-5 py-6 shadow-[18px_0_70px_-58px_rgba(34,211,238,0.85)] backdrop-blur-xl lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col"> ${renderComponent($$result, "BrandLogo", $$BrandLogo, { "markClass": "h-10 w-10", "textClass": "text-lg" })} <nav class="mt-10 grid gap-2 text-sm" aria-label="Navegación premium"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`rounded-xl border px-4 py-3 transition duration-300 ${isActive(item.href) ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100 shadow-[0_18px_45px_-34px_rgba(34,211,238,0.9)]" : "border-transparent text-white/55 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"}`, "class")}> ${item.label} </a>`)} </nav> <div class="mt-auto rounded-2xl border border-white/10 bg-white/[0.035] p-4"> <p class="text-xs uppercase tracking-[0.16em] text-cyan-100/65">
Sesión segura
</p> <p class="mt-2 truncate text-sm text-white/72"> ${user?.email ?? "Usuario premium"} </p> <p class="mt-2 text-xs leading-relaxed text-white/42">
Acceso SSR protegido con ventana activa de 30 minutos.
</p> </div> </aside> <div class="flex min-h-screen w-full flex-col lg:pl-72"> <header class="sticky top-0 z-40 border-b border-white/10 bg-[#07070A]/82 backdrop-blur-xl"> <div class="flex min-h-16 items-center justify-between gap-4 px-5 md:px-8 lg:px-10"> <div class="lg:hidden"> ${renderComponent($$result, "BrandLogo", $$BrandLogo, { "markClass": "h-8 w-8", "textClass": "text-base" })} </div> <div class="hidden lg:block"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/60"> ${eyebrow} </p> <h1 class="mt-1 text-xl font-semibold tracking-tight text-white"> ${title} </h1> </div> <div class="flex items-center gap-3 text-sm text-white/50"> <a href="/admin" class="hidden transition hover:text-cyan-100 sm:inline">
Admin
</a> <form method="POST" action="/admin"> <input type="hidden" name="intent" value="logout"> <button class="btn-secondary px-4 py-2 text-xs">
Salir
</button> </form> </div> </div> <nav class="flex gap-2 overflow-x-auto border-t border-white/10 px-5 py-3 text-sm md:px-8 lg:hidden" aria-label="Navegación premium móvil"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`shrink-0 rounded-xl border px-3 py-2 transition ${isActive(item.href) ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/[0.02] text-white/55"}`, "class")}> ${item.label} </a>`)} </nav> </header> <main class="flex-1 px-5 py-6 md:px-8 md:py-8 lg:px-10"> ${renderSlot($$result, $$slots["default"])} </main> </div> </div> </body></html>`;
}, "C:/Users/luiss/nexora-ai/src/layouts/PremiumLayout.astro", void 0);

export { $$PremiumLayout as $ };
