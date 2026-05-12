import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CL1qtBP8.mjs';
import { o as obtenerLeads, E as ESTADOS_LEAD } from './leadStorage_C6vk3OUN.mjs';

const $$Pipeline = createComponent(async ($$result, $$props, $$slots) => {
  const leads = await obtenerLeads();
  const labels = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    cualificado: "Cualificado",
    propuesta_enviada: "Propuesta enviada",
    ganado: "Ganado",
    perdido: "Perdido"
  };
  const columnClass = {
    nuevo: "from-sky-300/16",
    contactado: "from-amber-300/16",
    cualificado: "from-emerald-300/16",
    propuesta_enviada: "from-purple-300/16",
    ganado: "from-green-300/16",
    perdido: "from-rose-300/16"
  };
  const grouped = ESTADOS_LEAD.map((estado) => ({
    estado,
    leads: leads.filter((lead) => lead.estado === estado)
  }));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Pipeline | NexoraAI", "description": "Pipeline comercial" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-[#07070A] px-6 py-10 md:px-10"> <div class="mx-auto max-w-7xl"> <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"> <div> <a href="/admin" class="text-sm text-white/45 transition hover:text-cyan-100">
Volver al panel
</a> <h1 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
Pipeline comercial
</h1> <p class="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
Vista kanban para revisar presión comercial, volumen por fase y próximos movimientos.
</p> </div> <div class="premium-panel px-5 py-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/40">Leads activos</p> <p class="mt-2 text-3xl font-semibold text-white">${leads.length}</p> </div> </div> <div class="mt-10 overflow-x-auto pb-4"> <div class="flex min-w-[1500px] gap-5"> ${grouped.map((column) => renderTemplate`<section${addAttribute(`w-[300px] shrink-0 rounded-2xl border border-white/10 bg-gradient-to-b ${columnClass[column.estado]} to-white/[0.035] p-4 shadow-[0_18px_60px_-44px_rgba(34,211,238,0.6)]`, "class")}> <div class="flex items-center justify-between"> <div> <h2 class="font-semibold text-white"> ${labels[column.estado]} </h2> <p class="mt-1 text-xs text-white/40"> ${column.leads.length} oportunidades
</p> </div> <span class="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/65"> ${column.leads.length} </span> </div> <div class="mt-5 space-y-3"> ${column.leads.length === 0 ? renderTemplate`<div class="rounded-2xl border border-dashed border-white/10 bg-black/15 p-5 text-sm text-white/38">
Sin leads en esta fase.
</div>` : column.leads.map((lead) => renderTemplate`<a${addAttribute(`/dashboard/leads/${lead.id}`, "href")} class="group block rounded-2xl border border-white/10 bg-black/24 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_-38px_rgba(34,211,238,0.8)]"> <div class="flex items-start justify-between gap-3"> <div> <h3 class="font-medium text-white transition group-hover:text-cyan-100"> ${lead.nombre} </h3> <p class="mt-1 text-sm text-white/50"> ${lead.email} </p> </div> <span class="text-white/30 transition group-hover:text-cyan-100">
→
</span> </div> ${lead.empresa && renderTemplate`<p class="mt-3 text-xs text-white/40"> ${lead.empresa} </p>`} <p class="mt-4 line-clamp-3 text-sm leading-relaxed text-white/65"> ${lead.mensaje} </p> </a>`)} </div> </section>`)} </div> </div> </div> </main> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/dashboard/pipeline.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/dashboard/pipeline.astro";
const $$url = "/dashboard/pipeline";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pipeline,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
