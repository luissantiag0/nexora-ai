import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_DLA3BFuR.mjs';
import { o as obtenerLeads } from './leadStorage_C6vk3OUN.mjs';
import { p as prisma } from './prisma_JAVnBMvn.mjs';

const prerender = false;
const $$Reports = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Reports;
  Astro2.locals.user;
  const allLeads = await obtenerLeads();
  const totalLeads = allLeads.length;
  const won = allLeads.filter((l) => l.estado === "ganado").length;
  const lost = allLeads.filter((l) => l.estado === "perdido").length;
  const open = totalLeads - won - lost;
  const conversion = totalLeads > 0 ? Math.round(won / totalLeads * 100) : 0;
  const now = /* @__PURE__ */ new Date();
  const thisMonthLeads = allLeads.filter((l) => {
    const d = new Date(l.timestamp);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthLeads = allLeads.filter((l) => {
    const d = new Date(l.timestamp);
    return d >= lastMonthStart && d < thisMonthStart;
  });
  const growth = lastMonthLeads.length > 0 ? Math.round((thisMonthLeads.length - lastMonthLeads.length) / lastMonthLeads.length * 100) : 0;
  const growthSign = growth >= 0 ? "+" : "";
  const userCount = await prisma.user.count();
  const premiumCount = await prisma.user.count({
    where: { OR: [{ isPremium: true }, { subscriptionStatus: "active" }] }
  });
  const pipelineStates = [
    { key: "nuevo", label: "Nuevo" },
    { key: "contactado", label: "Contactado" },
    { key: "cualificado", label: "Cualificado" },
    { key: "propuesta_enviada", label: "Propuesta enviada" },
    { key: "ganado", label: "Ganado" },
    { key: "perdido", label: "Perdido" }
  ];
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Informes" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Business intelligence</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Informes ejecutivos</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">Métricas de rendimiento comercial, productividad y forecast mensual basados en datos reales del CRM.</p> </section> <div class="mt-6 flex flex-wrap gap-3"> <a href="/api/reports" target="_blank" class="btn-primary px-5 py-3 text-sm">Descargar PDF ejecutivo</a> </div> <section class="mt-8 grid gap-4 md:grid-cols-4"> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Leads totales</p> <p class="mt-3 text-3xl font-semibold text-white">${totalLeads}</p> <p class="mt-1 text-xs text-white/40">${thisMonthLeads.length} este mes</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Oportunidades abiertas</p> <p class="mt-3 text-3xl font-semibold text-cyan-100">${open}</p> <p class="mt-1 text-xs text-white/40">${totalLeads > 0 ? Math.round(open / totalLeads * 100) : 0}% del pipeline</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Ganados</p> <p class="mt-3 text-3xl font-semibold text-emerald-100">${won}</p> <p class="mt-1 text-xs {convClass}">${conversion}% conversión</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Crecimiento mensual</p> <p class="mt-3 text-3xl font-semibold {growthClass}">${growthSign}${growth}%</p> <p class="mt-1 text-xs text-white/40">vs mes anterior</p> </div> </section> <section class="mt-8 grid gap-6 xl:grid-cols-3"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Rendimiento comercial</h2> <div class="mt-5 grid gap-4"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Pipeline total</p> <p class="mt-2 text-2xl font-semibold text-white">${totalLeads} leads</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Velocidad de cierre</p> <p class="mt-2 text-2xl font-semibold text-white">${conversion}%</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Leads este mes</p> <p class="mt-2 text-2xl font-semibold text-cyan-100">${thisMonthLeads.length}</p> </div> </div> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Productividad operativa</h2> <div class="mt-5 grid gap-4"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Usuarios activos</p> <p class="mt-2 text-2xl font-semibold text-white">${userCount}</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Cuentas premium</p> <p class="mt-2 text-2xl font-semibold text-emerald-100">${premiumCount}</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Actividad CRM</p> <p class="mt-2 text-2xl font-semibold text-cyan-100">${totalLeads} leads</p> </div> </div> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Forecast mensual</h2> <div class="mt-5 grid gap-4"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Oportunidades abiertas</p> <p class="mt-2 text-2xl font-semibold text-cyan-100">${open}</p> <p class="mt-1 text-xs text-white/40">Potencial de cierre</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Riesgo estimado</p> <p class="mt-2 text-lg font-semibold text-amber-100">${lost > 0 ? Math.round(lost / totalLeads * 100) + "%" : "Bajo"}</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Previsión ingresos</p> <p class="mt-2 text-2xl font-semibold text-emerald-100">${open * 2900} €</p> <p class="mt-1 text-xs text-white/40">Basado en ${open} oportunidades</p> </div> </div> </div> </section> <section class="mt-8 premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Distribución del pipeline</h2> <div class="mt-5 grid gap-4"> ${pipelineStates.map((st) => {
    const count = allLeads.filter((l) => l.estado === st.key).length;
    return renderTemplate`<div> <div class="flex items-center justify-between text-sm"> <span class="text-white/62">${st.label}</span> <span class="text-white/42">${count}</span> </div> <div class="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10"> <span class="block h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style="width:{pct}%"></span> </div> </div>`;
  })} </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/reports.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/reports.astro";
const $$url = "/premium/reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reports,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
