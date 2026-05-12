import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_DLA3BFuR.mjs';
import { o as obtenerLeads, E as ESTADOS_LEAD } from './leadStorage_C6vk3OUN.mjs';

const prerender = false;
const $$Leads = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Leads;
  const statusLabels = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    cualificado: "Cualificado",
    propuesta_enviada: "Propuesta enviada",
    ganado: "Ganado",
    perdido: "Perdido"
  };
  const statusBadgeClass = {
    nuevo: "bg-sky-300/10 text-sky-100 ring-sky-300/25",
    contactado: "bg-amber-300/10 text-amber-100 ring-amber-300/25",
    cualificado: "bg-emerald-300/10 text-emerald-100 ring-emerald-300/25",
    propuesta_enviada: "bg-purple-300/10 text-purple-100 ring-purple-300/25",
    ganado: "bg-green-300/10 text-green-100 ring-green-300/25",
    perdido: "bg-rose-300/10 text-rose-100 ring-rose-300/25"
  };
  const url = new URL(Astro2.request.url);
  const query = (url.searchParams.get("q") || "").trim().toLowerCase();
  const status = url.searchParams.get("estado");
  const validStatus = status && ESTADOS_LEAD.includes(status) ? status : "";
  const leads = await obtenerLeads();
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = !validStatus || lead.estado === validStatus;
    const matchesQuery = !query || [
      lead.nombre,
      lead.email,
      lead.empresa || "",
      lead.mensaje,
      lead.estado
    ].join(" ").toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Leads premium" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:flex-row md:items-end md:justify-between md:p-8"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">CRM premium</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Leads y oportunidades</h2> <p class="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
Filtra, revisa y abre oportunidades capturadas por las automatizaciones de NexoraAI.
</p> </div> <a href="/premium/leads/new" class="btn-primary px-5 py-3 text-sm">Nuevo lead</a> </section> <section class="mt-6 premium-panel p-5 md:p-6"> <form method="GET" class="grid gap-3 md:grid-cols-[1fr_220px_auto]"> <input name="q"${addAttribute(query, "value")} placeholder="Buscar por nombre, email, empresa o mensaje..." class="input-premium"> <select name="estado" class="input-premium"> <option value="">Todos los estados</option> ${ESTADOS_LEAD.map((estado) => renderTemplate`<option${addAttribute(estado, "value")}${addAttribute(validStatus === estado, "selected")}>${statusLabels[estado]}</option>`)} </select> <button class="btn-primary px-5 py-3 text-sm">Filtrar</button> </form> </section> <section class="mt-6 grid gap-4"> ${filteredLeads.length === 0 ? renderTemplate`<div class="premium-panel p-10 text-center"> <h2 class="text-xl font-semibold text-white">No hay leads para esta vista</h2> <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/48">
Ajusta los filtros o crea un lead manual para iniciar el seguimiento.
</p> </div>` : filteredLeads.map((lead) => renderTemplate`<article class="premium-panel p-5 md:p-6"> <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"> <div class="min-w-0"> <div class="flex flex-wrap items-center gap-3"> <a${addAttribute(`/premium/leads/${lead.id}`, "href")} class="text-xl font-semibold text-white transition hover:text-cyan-100"> ${lead.nombre} </a> <span${addAttribute(`status-pill ${statusBadgeClass[lead.estado]}`, "class")}> ${statusLabels[lead.estado]} </span> </div> <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/45"> <span>${lead.email}</span> ${lead.empresa && renderTemplate`<span>${lead.empresa}</span>`} <span>${new Date(lead.timestamp).toLocaleDateString("es-ES")}</span> </div> <p class="mt-4 line-clamp-2 max-w-4xl text-sm leading-relaxed text-white/62"> ${lead.mensaje} </p> </div> <a${addAttribute(`/premium/leads/${lead.id}`, "href")} class="btn-secondary px-4 py-2 text-xs">
Abrir detalle
</a> </div> </article>`)} </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/leads.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/leads.astro";
const $$url = "/premium/leads";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Leads,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
