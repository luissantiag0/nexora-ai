import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_jWBKHBov.mjs';
import { getUserLeadCounts } from './crm_Q4Xs_bm6.mjs';
import { p as prisma } from './prisma_JAVnBMvn.mjs';

const prerender = false;
const $$Reports = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Reports;
  const user = Astro2.locals.user;
  const counts = user ? await getUserLeadCounts(user.id) : null;
  const recentLeads = user ? await prisma.lead.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 10
  }) : [];
  const statusLabels = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    cualificado: "Cualificado",
    propuesta_enviada: "Propuesta enviada",
    ganado: "Ganado",
    perdido: "Perdido"
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Informes" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Analítica</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Informes</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">
Visualiza el rendimiento de tus leads y actividades comerciales.
</p> </section> <section class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Leads totales</p> <p class="mt-3 text-3xl font-semibold text-white">${counts?.total ?? 0}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Este mes</p> <p class="mt-3 text-3xl font-semibold text-cyan-100">${counts?.thisMonth ?? 0}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Ganados</p> <p class="mt-3 text-3xl font-semibold text-emerald-100">${counts?.ganados ?? 0}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Tasa de conversión</p> <p class="mt-3 text-3xl font-semibold text-purple-100">${counts?.conversion ?? 0}%</p> </div> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Actividad reciente</h2> <p class="mt-1 text-sm text-white/45">Últimos leads registrados</p> ${recentLeads.length === 0 ? renderTemplate`<div class="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/15 p-6 text-sm text-white/45">
Aún no hay actividad. Crea tu primer lead para empezar.
</div>` : renderTemplate`<div class="mt-5 grid gap-3"> ${recentLeads.map((lead) => renderTemplate`<a${addAttribute(`/dashboard/leads/${lead.id}`, "href")} class="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.055]"> <div class="flex items-center justify-between"> <div> <p class="font-medium text-white">${lead.name}</p> <p class="mt-0.5 text-sm text-white/45">${lead.company || lead.email}</p> </div> <span class="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/50"> ${statusLabels[lead.status] || lead.status} </span> </div> </a>`)} </div>`} </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Pipeline</h2> <div class="mt-5 grid gap-4"> ${Object.entries(statusLabels).map(([key, label]) => {
    const count = recentLeads.filter((l) => l.status === key).length;
    const total = recentLeads.length || 1;
    const pct = Math.round(count / total * 100);
    return renderTemplate`<div> <div class="flex items-center justify-between text-sm"> <span class="text-white/62">${label}</span> <span class="text-white/42">${count}</span> </div> <div class="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10"> <span class="block h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"${addAttribute(`width: ${Math.max(4, pct)}%`, "style")}></span> </div> </div>`;
  })} </div> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/dashboard/reports.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/dashboard/reports.astro";
const $$url = "/dashboard/reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reports,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
