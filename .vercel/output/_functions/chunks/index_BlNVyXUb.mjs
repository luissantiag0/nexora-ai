import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_NsQSNwDU.mjs';
import { getTrialRemainingMs } from './auth_BZvm-TfZ.mjs';
import { getUserLeadCounts } from './crm_CRjbA4A0.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const trialRemaining = getTrialRemainingMs(user);
  const trialMinutes = Math.floor(trialRemaining / 6e4);
  const trialSeconds = Math.floor(trialRemaining % 6e4 / 1e3);
  const isTrialActive = trialRemaining > 0;
  const counts = user ? await getUserLeadCounts(user.id) : null;
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.1),rgba(255,255,255,0.035)_48%,rgba(16,185,129,0.09))] p-6 shadow-[0_24px_90px_-54px_rgba(34,211,238,0.85)] md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">
Panel de control
</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
Bienvenido${user?.name ? `, ${user.name}` : ""} </h2> <p class="mt-4 max-w-3xl text-sm leading-relaxed text-white/58 md:text-base">
Gestiona tus leads, revisa métricas y automatiza tus procesos desde un panel seguro.
</p> </section> ${isTrialActive && renderTemplate`<section class="mt-6"> <div class="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 px-5 py-4 shadow-[0_0_30px_-12px_rgba(34,211,238,0.4)]"> <div class="flex flex-wrap items-center justify-between gap-3"> <div class="flex items-center gap-3"> <span class="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm">⏱</span> <div> <p class="text-sm font-medium text-cyan-100">Prueba gratuita activa</p> <p class="text-xs text-white/50"> ${trialMinutes}:${String(trialSeconds).padStart(2, "0")} restantes
</p> </div> </div> <a href="/upgrade" class="btn-secondary px-4 py-2 text-xs">Ir a Premium</a> </div> </div> </section>`}${!isTrialActive && !user?.isPremium && renderTemplate`<section class="mt-6"> <div class="rounded-2xl border border-amber-300/20 bg-amber-500/5 px-5 py-4"> <div class="flex flex-wrap items-center justify-between gap-3"> <div> <p class="text-sm font-medium text-amber-100">Tu prueba gratuita terminó</p> <p class="text-xs text-white/50">Suscríbete a Premium para seguir usando todas las funcionalidades.</p> </div> <a href="/upgrade" class="btn-primary px-4 py-2 text-xs">Suscribirse ahora</a> </div> </div> </section>`}<section class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Leads totales</p> <p class="mt-3 text-3xl font-semibold text-white">${counts?.total ?? 0}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Este mes</p> <p class="mt-3 text-3xl font-semibold text-cyan-100">${counts?.thisMonth ?? 0}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Ganados</p> <p class="mt-3 text-3xl font-semibold text-emerald-100">${counts?.ganados ?? 0}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Conversión</p> <p class="mt-3 text-3xl font-semibold text-purple-100">${counts?.conversion ?? 0}%</p> </div> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"> <div class="premium-panel p-5 md:p-6"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <h2 class="text-xl font-semibold text-white">Acceso rápido</h2> <p class="mt-1 text-sm text-white/45">Herramientas principales</p> </div> </div> <div class="mt-5 grid gap-3"> <a href="/dashboard/leads" class="rounded-2xl border border-white/10 bg-black/20 p-4 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055]"> <p class="font-medium text-white">CRM / Leads</p> <p class="mt-1 text-sm text-white/45">Gestiona tus contactos, añade notas y cambia estados.</p> </a> <a href="/dashboard/reports" class="rounded-2xl border border-white/10 bg-black/20 p-4 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055]"> <p class="font-medium text-white">Informes</p> <p class="mt-1 text-sm text-white/45">Revisa métricas de rendimiento y actividad.</p> </a> <a href="/dashboard/settings" class="rounded-2xl border border-white/10 bg-black/20 p-4 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055]"> <p class="font-medium text-white">Ajustes</p> <p class="mt-1 text-sm text-white/45">Configura tu cuenta y preferencias.</p> </a> </div> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Estado de leads</h2> <div class="mt-5 grid gap-3"> <div class="flex items-center justify-between border-b border-white/10 pb-3 text-sm"> <span class="text-white/62">Activos</span> <span class="text-white">${counts?.activos ?? 0}</span> </div> <div class="flex items-center justify-between border-b border-white/10 pb-3 text-sm"> <span class="text-white/62">Ganados</span> <span class="text-emerald-200">${counts?.ganados ?? 0}</span> </div> <div class="flex items-center justify-between text-sm"> <span class="text-white/62">Totales</span> <span class="text-cyan-200">${counts?.total ?? 0}</span> </div> </div> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/dashboard/index.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
