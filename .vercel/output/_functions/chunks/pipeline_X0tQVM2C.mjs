import { c as createComponent } from './astro-component_Dl_Jgkat.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_C_MYSd8d.mjs';
import { r as renderComponent } from './entrypoint_D_5yUKUO.mjs';
import { $ as $$BaseLayout } from './BaseLayout_D76Wmo3y.mjs';
import { o as obtenerLeads, E as ESTADOS_LEAD } from './leadStorage_DT8eBzY6.mjs';

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
  const grouped = ESTADOS_LEAD.map((estado) => ({
    estado,
    leads: leads.filter(
      (lead) => lead.estado === estado
    )
  }));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Pipeline", "description": "Pipeline comercial" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-black p-8"> <div class="overflow-x-auto"> <div class="flex min-w-[1600px] gap-6"> ${grouped.map((column) => renderTemplate`<div class="w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5"> <div class="flex items-center justify-between"> <h2 class="text-lg font-semibold text-white"> ${labels[column.estado]} </h2> <span class="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60"> ${column.leads.length} </span> </div> <div class="mt-5 space-y-4"> ${column.leads.map((lead) => renderTemplate`<a${addAttribute(`/dashboard/leads/${lead.id}`, "href")} class="block rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-white/30"> <h3 class="font-medium text-white"> ${lead.nombre} </h3> <p class="mt-1 text-sm text-white/60"> ${lead.email} </p> ${lead.empresa && renderTemplate`<p class="mt-3 text-xs text-white/40"> ${lead.empresa} </p>`} <p class="mt-4 line-clamp-3 text-sm text-white/70"> ${lead.mensaje} </p> </a>`)} </div> </div>`)} </div> </div> </main> ` })}`;
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
