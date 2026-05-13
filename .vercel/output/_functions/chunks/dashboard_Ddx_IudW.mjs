import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout___0AHu2F.mjs';
import { o as obtenerLeads, E as ESTADOS_LEAD } from './leadStorage_C3jvhflq.mjs';

const prerender = false;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const leads = await obtenerLeads();
  const labels = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    cualificado: "Cualificado",
    propuesta_enviada: "Propuesta enviada",
    ganado: "Ganado",
    perdido: "Perdido"
  };
  const counters = ESTADOS_LEAD.reduce(
    (acc, estado) => ({
      ...acc,
      [estado]: leads.filter((lead) => lead.estado === estado).length
    }),
    {}
  );
  const activeLeads = counters.nuevo + counters.contactado + counters.cualificado + counters.propuesta_enviada;
  const conversion = leads.length ? Math.round(counters.ganado / leads.length * 100) : 0;
  const recentLeads = leads.slice(0, 5);
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Dashboard premium" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.1),rgba(255,255,255,0.035)_48%,rgba(16,185,129,0.09))] p-6 shadow-[0_24px_90px_-54px_rgba(34,211,238,0.85)] md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">
Centro operativo
</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
Panel premium NexoraAI
</h2> <p class="mt-4 max-w-3xl text-sm leading-relaxed text-white/58 md:text-base">
Controla leads, activos comerciales, facturación y automatizaciones desde una consola SSR protegida.
</p> </section> <section class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Leads totales</p> <p class="mt-3 text-3xl font-semibold text-white">${leads.length}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Oportunidades activas</p> <p class="mt-3 text-3xl font-semibold text-cyan-100">${activeLeads}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Clientes ganados</p> <p class="mt-3 text-3xl font-semibold text-emerald-100">${counters.ganado}</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Conversión</p> <p class="mt-3 text-3xl font-semibold text-purple-100">${conversion}%</p> </div> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"> <div class="premium-panel p-5 md:p-6"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <h2 class="text-xl font-semibold text-white">Actividad reciente</h2> <p class="mt-1 text-sm text-white/45">Últimos leads capturados por el sistema.</p> </div> <a href="/premium/leads" class="btn-secondary px-4 py-2 text-sm">Ver leads</a> </div> <div class="mt-5 grid gap-3"> ${recentLeads.length === 0 ? renderTemplate`<div class="rounded-2xl border border-dashed border-white/10 bg-black/15 p-6 text-sm text-white/45">
Todavía no hay leads registrados.
</div>` : recentLeads.map((lead) => renderTemplate`<a${addAttribute(`/premium/leads/${lead.id}`, "href")} class="rounded-2xl border border-white/10 bg-black/20 p-4 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055]"> <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"> <div> <h3 class="font-medium text-white">${lead.nombre}</h3> <p class="mt-1 text-sm text-white/45">${lead.email}</p> </div> <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60"> ${labels[lead.estado]} </span> </div> </a>`)} </div> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Distribución del pipeline</h2> <div class="mt-5 grid gap-3"> ${ESTADOS_LEAD.map((estado) => renderTemplate`<div> <div class="flex items-center justify-between text-sm"> <span class="text-white/62">${labels[estado]}</span> <span class="text-white/42">${counters[estado]}</span> </div> <div class="mt-2 h-2 overflow-hidden rounded-full bg-white/10"> <span class="block h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"${addAttribute(`width: ${leads.length ? Math.max(8, Math.round(counters[estado] / leads.length * 100)) : 0}%`, "style")}></span> </div> </div>`)} </div> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/dashboard.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/dashboard.astro";
const $$url = "/premium/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
