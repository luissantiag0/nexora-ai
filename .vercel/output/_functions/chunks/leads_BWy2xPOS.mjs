import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_WKm3_OPm.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_DsBs0YFz.mjs';
import { getUserLeads, getUserLeadCounts, LEAD_STATUSES } from './crm_Q4Xs_bm6.mjs';

const prerender = false;
const $$Leads = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Leads;
  const user = Astro2.locals.user;
  const searchQuery = Astro2.url.searchParams.get("search") || "";
  const statusFilter = Astro2.url.searchParams.get("status") || "";
  const leads = user ? await getUserLeads(user.id, {
    search: searchQuery || void 0,
    status: statusFilter || void 0
  }) : [];
  const counts = user ? await getUserLeadCounts(user.id) : null;
  const statusLabels = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    cualificado: "Cualificado",
    propuesta_enviada: "Propuesta enviada",
    ganado: "Ganado",
    perdido: "Perdido"
  };
  const statusColors = {
    nuevo: "bg-sky-300/10 text-sky-100 border-sky-300/20",
    contactado: "bg-amber-300/10 text-amber-100 border-amber-300/20",
    cualificado: "bg-emerald-300/10 text-emerald-100 border-emerald-300/20",
    propuesta_enviada: "bg-purple-300/10 text-purple-100 border-purple-300/20",
    ganado: "bg-green-300/10 text-green-100 border-green-300/20",
    perdido: "bg-rose-300/10 text-rose-100 border-rose-300/20"
  };
  const priorityColors = {
    alta: "text-red-300",
    media: "text-amber-300",
    baja: "text-white/40"
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Leads CRM" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">CRM</p> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Mis leads</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">
Gestiona tus contactos, clientes potenciales y oportunidades de negocio.
</p> </div> <a href="/dashboard/leads/new" class="btn-primary shrink-0 px-5 py-3 text-sm text-center">
+ Nuevo lead
</a> </div> </section> <section class="mt-6 grid gap-4 sm:grid-cols-4"> <div class="premium-panel p-4"> <p class="text-xs text-white/45">Totales</p> <p class="mt-1 text-2xl font-semibold text-white">${counts?.total ?? 0}</p> </div> <div class="premium-panel p-4"> <p class="text-xs text-white/45">Activos</p> <p class="mt-1 text-2xl font-semibold text-cyan-100">${counts?.activos ?? 0}</p> </div> <div class="premium-panel p-4"> <p class="text-xs text-white/45">Ganados</p> <p class="mt-1 text-2xl font-semibold text-emerald-100">${counts?.ganados ?? 0}</p> </div> <div class="premium-panel p-4"> <p class="text-xs text-white/45">Conversión</p> <p class="mt-1 text-2xl font-semibold text-purple-100">${counts?.conversion ?? 0}%</p> </div> </section> <section class="mt-6 premium-panel p-5 md:p-6"> <form method="GET" class="flex flex-col gap-3 sm:flex-row sm:items-center"> <div class="relative flex-1"> <input type="text" name="search"${addAttribute(searchQuery, "value")} placeholder="Buscar por nombre, email, empresa..." class="input-premium w-full pl-10"> <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30">🔍</span> </div> <select name="status" class="input-premium w-full sm:w-44"> <option value="">Todos los estados</option> ${LEAD_STATUSES.map((s) => renderTemplate`<option${addAttribute(s, "value")}${addAttribute(statusFilter === s, "selected")}>${statusLabels[s]}</option>`)} </select> <button class="btn-secondary px-5 py-3 text-sm">Filtrar</button> ${(searchQuery || statusFilter) && renderTemplate`<a href="/dashboard/leads" class="text-xs text-cyan-200 hover:text-white transition">Limpiar filtros</a>`} </form> </section> <section class="mt-6"> ${leads.length === 0 ? renderTemplate`<div class="premium-panel p-8 text-center"> <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"> <span class="text-2xl text-white/30">📋</span> </div> <h3 class="mt-4 text-lg font-medium text-white">No hay leads</h3> <p class="mt-2 text-sm text-white/45"> ${searchQuery || statusFilter ? "No se encontraron leads con los filtros actuales." : "Crea tu primer lead para empezar a gestionar tu CRM."} </p> ${!searchQuery && !statusFilter && renderTemplate`<a href="/dashboard/leads/new" class="btn-primary mt-6 inline-flex px-5 py-3 text-sm">
+ Crear primer lead
</a>`} </div>` : renderTemplate`<div class="premium-panel overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/38"> <th class="px-4 py-4 font-medium">Nombre</th> <th class="px-4 py-4 font-medium">Email</th> <th class="px-4 py-4 font-medium hidden md:table-cell">Empresa</th> <th class="px-4 py-4 font-medium">Estado</th> <th class="px-4 py-4 font-medium hidden lg:table-cell">Prioridad</th> <th class="px-4 py-4 font-medium hidden lg:table-cell">Creado</th> <th class="px-4 py-4 font-medium text-right">Acción</th> </tr> </thead> <tbody class="divide-y divide-white/5"> ${leads.map((lead) => renderTemplate`<tr class="transition hover:bg-white/[0.02]"> <td class="px-4 py-3"> <a${addAttribute(`/dashboard/leads/${lead.id}`, "href")} class="font-medium text-white hover:text-cyan-200 transition"> ${lead.name} </a> ${lead.tags && renderTemplate`<div class="mt-1 flex flex-wrap gap-1"> ${lead.tags.split(",").slice(0, 2).map((tag) => renderTemplate`<span class="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/40">${tag.trim()}</span>`)} </div>`} </td> <td class="px-4 py-3 text-white/60">${lead.email}</td> <td class="px-4 py-3 text-white/60 hidden md:table-cell">${lead.company || "—"}</td> <td class="px-4 py-3"> <span${addAttribute(`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusColors[lead.status] || ""}`, "class")}> ${statusLabels[lead.status] || lead.status} </span> </td> <td class="px-4 py-3 hidden lg:table-cell"> <span${addAttribute(`text-xs font-medium ${priorityColors[lead.priority || ""] || "text-white/40"}`, "class")}> ${lead.priority ? lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1) : "—"} </span> </td> <td class="px-4 py-3 text-white/40 text-xs hidden lg:table-cell"> ${lead.createdAt.toLocaleDateString("es-ES", { day: "numeric", month: "short" })} </td> <td class="px-4 py-3 text-right"> <div class="flex items-center justify-end gap-2"> <a${addAttribute(`/dashboard/leads/${lead.id}`, "href")} class="text-xs text-cyan-200 hover:text-white transition">Ver</a> <form method="POST"${addAttribute(`/api/crm/leads/${lead.id}`, "action")} class="inline" data-delete-form> <input type="hidden" name="_method" value="DELETE"> <input type="hidden" name="action" value="delete"> <button type="submit" class="text-xs text-rose-300 hover:text-rose-100 transition" onclick="return confirm('¿Eliminar este lead?')">Eliminar</button> </form> </div> </td> </tr>`)} </tbody> </table> </div> </div>`} </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads.astro";
const $$url = "/dashboard/leads";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Leads,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
