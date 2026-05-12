import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, a4 as addAttribute, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_WKm3_OPm.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CL1qtBP8.mjs';
import { c as crearLeadManual, a as actualizarLead, e as eliminarLead, b as actualizarEstadoLead, d as a_adirNotaLead, o as obtenerLeads, E as ESTADOS_LEAD } from './leadStorage_C6vk3OUN.mjs';
import { getCurrentAdmin, logoutAdmin } from './auth_DO-wdbiw.mjs';
import { g as getAdminAnalytics } from './analytics_B7BaGVOn.mjs';
import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';

const ui = {
  pageShell: "mx-auto w-full max-w-7xl px-6 md:px-10",
  section: "py-20 md:py-24"};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const LEADS_POR_PAGINA = 8;
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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const clean = (value) => String(value || "").replace(/[<>{}`$\\]/g, "").trim();
  const isEstadoLead = (value) => ESTADOS_LEAD.includes(value);
  const sessionToken = Astro2.cookies.get(SESSION_COOKIE)?.value;
  const currentUser = await getCurrentAdmin(sessionToken);
  if (!currentUser) {
    return Astro2.redirect("/admin/login");
  }
  let actionMessage = "";
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const intent = clean(formData.get("intent"));
    if (intent === "logout") {
      await logoutAdmin(currentUser.id);
      Astro2.cookies.delete(SESSION_COOKIE, {
        path: "/"
      });
      return Astro2.redirect("/admin/login");
    }
    if (intent === "create-lead") {
      const nombre = clean(formData.get("nombre"));
      const email = clean(formData.get("email")).toLowerCase();
      const empresa = clean(formData.get("empresa"));
      const mensaje = clean(formData.get("mensaje"));
      const estadoInput = clean(formData.get("estado"));
      const estado = isEstadoLead(estadoInput) ? estadoInput : "nuevo";
      if (!nombre || !email || !mensaje) {
        errorMessage = "Completa nombre, email y mensaje para crear el lead.";
      } else if (!emailPattern.test(email)) {
        errorMessage = "Introduce un email válido.";
      } else {
        await crearLeadManual({
          nombre,
          email,
          empresa,
          mensaje,
          estado,
          userId: currentUser.id
        });
        actionMessage = "Lead creado correctamente.";
      }
    }
    if (intent === "edit-lead") {
      const leadId = clean(formData.get("leadId"));
      const nombre = clean(formData.get("nombre"));
      const email = clean(formData.get("email")).toLowerCase();
      const empresa = clean(formData.get("empresa"));
      const mensaje = clean(formData.get("mensaje"));
      const estadoInput = clean(formData.get("estado"));
      if (!leadId || !nombre || !email || !mensaje || !isEstadoLead(estadoInput)) {
        errorMessage = "No se pudo actualizar el lead. Revisa los campos.";
      } else if (!emailPattern.test(email)) {
        errorMessage = "Introduce un email válido.";
      } else {
        const ok = await actualizarLead(leadId, {
          nombre,
          email,
          empresa,
          mensaje,
          estado: estadoInput
        });
        actionMessage = ok ? "Lead actualizado correctamente." : "Lead no encontrado.";
      }
    }
    if (intent === "delete-lead") {
      const leadId = clean(formData.get("leadId"));
      const ok = leadId ? await eliminarLead(leadId) : false;
      actionMessage = ok ? "Lead eliminado correctamente." : "No se pudo eliminar el lead.";
    }
    if (intent === "update-status") {
      const leadId = clean(formData.get("leadId"));
      const status = clean(formData.get("status"));
      if (leadId && isEstadoLead(status)) {
        const ok = await actualizarEstadoLead(leadId, status);
        actionMessage = ok ? "Estado actualizado correctamente." : "Lead no encontrado.";
      } else {
        errorMessage = "Estado no válido.";
      }
    }
    if (intent === "add-note") {
      const leadId = clean(formData.get("leadId"));
      const note = clean(formData.get("note"));
      const ok = leadId && note ? await a_adirNotaLead(leadId, note) : false;
      actionMessage = ok ? "Nota añadida correctamente." : "No se pudo añadir la nota.";
    }
  }
  const url = new URL(Astro2.request.url);
  const filtroEstado = url.searchParams.get("estado") || "";
  const busqueda = url.searchParams.get("q") || "";
  const paginaActual = Math.max(1, Number(url.searchParams.get("page") || "1"));
  let leads = await obtenerLeads();
  const totalLeadsSinFiltro = leads.length;
  const counters = ESTADOS_LEAD.reduce(
    (acc, estado) => ({
      ...acc,
      [estado]: leads.filter((lead) => lead.estado === estado).length
    }),
    {}
  );
  if (filtroEstado && isEstadoLead(filtroEstado)) {
    leads = leads.filter((lead) => lead.estado === filtroEstado);
  }
  if (busqueda) {
    const query = busqueda.toLowerCase();
    leads = leads.filter(
      (lead) => [
        lead.nombre,
        lead.email,
        lead.empresa || "",
        lead.mensaje,
        lead.estado
      ].join(" ").toLowerCase().includes(query)
    );
  }
  const analytics = await getAdminAnalytics();
  const totalLeads = leads.length;
  const totalPaginas = Math.max(1, Math.ceil(totalLeads / LEADS_POR_PAGINA));
  const safePage = Math.min(paginaActual, totalPaginas);
  const offset = (safePage - 1) * LEADS_POR_PAGINA;
  const leadsPaginados = leads.slice(offset, offset + LEADS_POR_PAGINA);
  const abiertos = counters.nuevo + counters.contactado + counters.cualificado + counters.propuesta_enviada;
  const conversion = totalLeadsSinFiltro ? Math.round(counters.ganado / totalLeadsSinFiltro * 100) : 0;
  const buildPageUrl = (page) => {
    const params = new URLSearchParams();
    if (filtroEstado) params.set("estado", filtroEstado);
    if (busqueda) params.set("q", busqueda);
    params.set("page", String(page));
    return `/admin?${params.toString()}`;
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Panel Admin | NexoraAI", "description": "CRM interno NexoraAI" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", "<main", "> <div", '> <section class="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.09),rgba(255,255,255,0.035)_42%,rgba(16,185,129,0.08))] p-6 shadow-[0_24px_90px_-52px_rgba(34,211,238,0.85)] md:p-8"> <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-200/80">\nCRM operativo\n</p> <h1 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">\nPanel de Leads\n</h1> <p class="mt-3 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">\nGestiona captación, seguimiento y acciones comerciales desde una vista SSR conectada a Prisma.\n</p> </div> <div class="flex flex-wrap gap-3"> <a href="/dashboard/pipeline" class="btn-secondary px-4 py-2.5 text-sm">\nPipeline\n</a> <a href="/api/export/leads" class="btn-secondary px-4 py-2.5 text-sm">\nExportar CSV\n</a> <form method="POST" data-admin-form> <input type="hidden" name="intent" value="logout"> <button class="btn-primary px-4 py-2.5 text-sm">\nCerrar sesión\n</button> </form> </div> </div> </section> ', ' <section class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Leads totales</p> <p class="mt-3 text-3xl font-semibold text-white">', '</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Abiertos</p> <p class="mt-3 text-3xl font-semibold text-cyan-100">', '</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Ganados</p> <p class="mt-3 text-3xl font-semibold text-emerald-100">', '</p> </div> <div class="premium-panel p-5"> <p class="text-sm text-white/45">Conversión</p> <p class="mt-3 text-3xl font-semibold text-purple-100">', '%</p> </div> </section> <section class="mt-8 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.06),rgba(255,255,255,0.025)_48%,rgba(16,185,129,0.06))] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Analítica general</p> <h2 class="mt-2 text-xl font-semibold text-white">Métricas de la plataforma</h2> <div class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs text-white/45">Usuarios registrados</p> <p class="mt-1 text-2xl font-semibold text-white">', '</p> <p class="mt-1 text-[11px] text-cyan-200/70">+', ' este mes</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs text-white/45">Premium activos</p> <p class="mt-1 text-2xl font-semibold text-emerald-100">', '</p> <p class="mt-1 text-[11px] text-cyan-200/70">', '% conversión</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs text-white/45">Trial activos</p> <p class="mt-1 text-2xl font-semibold text-cyan-100">', '</p> <p class="mt-1 text-[11px] text-amber-200/70">', ' vencidos</p> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs text-white/45">Leads totales</p> <p class="mt-1 text-2xl font-semibold text-white">', '</p> <p class="mt-1 text-[11px] text-cyan-200/70">', ' ganados</p> </div> </div> <div class="mt-4 flex flex-wrap gap-4 text-xs text-white/40"> <span>', " nuevos esta semana</span> <span>", " trial→premium</span> <span>", ' leads este mes</span> </div> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]"> <div class="premium-panel p-5 md:p-6"> <div class="flex items-center justify-between gap-4"> <div> <h2 class="text-lg font-semibold text-white">\nCrear lead manual\n</h2> <p class="mt-1 text-sm text-white/45">\nAlta rápida desde llamada, email o referencia.\n</p> </div> </div> <form method="POST" class="mt-5 grid gap-3" data-admin-form> <input type="hidden" name="intent" value="create-lead"> <div class="grid gap-3 sm:grid-cols-2"> <input name="nombre" class="input-premium" placeholder="Nombre" required data-create-lead-input> <input name="email" type="email" class="input-premium" placeholder="Email" required> </div> <input name="empresa" class="input-premium" placeholder="Empresa"> <div class="grid gap-3 sm:grid-cols-[1fr_auto]"> <select name="estado" class="input-premium"> ', ' </select> <button class="btn-primary px-5 py-3 text-sm">\nCrear lead\n</button> </div> <textarea name="mensaje" rows="4" class="input-premium resize-none" placeholder="Mensaje o contexto comercial" required></textarea> </form> </div> <div class="premium-panel p-5 md:p-6"> <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"> <div> <h2 class="text-lg font-semibold text-white">\nFiltros y búsqueda\n</h2> <p class="mt-1 text-sm text-white/45">\nBusca por nombre, email, empresa, mensaje o estado.\n</p> </div> <a href="/admin" class="text-sm text-cyan-100 transition hover:text-white">\nLimpiar filtros\n</a> </div> <form method="GET" class="mt-5 grid gap-3 lg:grid-cols-[1fr_220px_auto]"> <input type="search" name="q"', ' placeholder="Buscar leads..." class="input-premium" data-search-input> <select name="estado" class="input-premium"> <option value="">Todos los estados</option> ', ' </select> <button class="btn-primary px-5 py-3 text-sm">\nFiltrar\n</button> </form> <div class="mt-5 flex flex-wrap gap-2"> <a href="/admin"', ">\nTodos ", " </a> ", ' </div> </div> </section> <section class="mt-8"> ', ' </section> <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <p class="text-sm text-white/45">\nPágina ', " de ", " · ", ' resultados\n</p> <div class="flex gap-3"> ', " ", ` </div> </div> </div> </main> <script>
    (() => {
      const toast = document.getElementById("admin-toast");

      if (toast) {
        window.setTimeout(() => {
          toast.style.opacity = "0";
          toast.style.transform = "translateY(-6px)";
        }, 4200);
      }

      document.querySelectorAll("[data-admin-form]").forEach((form) => {
        form.addEventListener("submit", (event) => {
          const message = form.getAttribute("data-confirm");

          if (message && !window.confirm(message)) {
            event.preventDefault();
            return;
          }

          const button = form.querySelector("button[type='submit'], button:not([type])");

          if (button) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = "Procesando...";
            button.classList.add("opacity-70");
          }
        });
      });

      document.querySelectorAll("[data-toggle-edit]").forEach((button) => {
        button.addEventListener("click", () => {
          const target = document.getElementById(button.getAttribute("data-toggle-edit"));

          if (target) {
            target.open = true;
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      });

      document.addEventListener("keydown", (event) => {
        const active = document.activeElement;
        const isTyping =
          active?.matches?.("input, textarea, select, [contenteditable='true']");

        if (isTyping) return;

        if (event.key === "/") {
          event.preventDefault();
          document.querySelector("[data-search-input]")?.focus();
        }

        if (event.key.toLowerCase() === "n") {
          document.querySelector("[data-create-lead-input]")?.focus();
        }
      });
    })();
  <\/script> `])), maybeRenderHead(), addAttribute(`${ui.section} min-h-screen bg-[#07070A]`, "class"), addAttribute(ui.pageShell, "class"), (actionMessage || errorMessage) && renderTemplate`<div id="admin-toast"${addAttribute(`mt-6 rounded-xl border px-4 py-3 text-sm shadow-[0_18px_50px_-35px_rgba(34,211,238,0.8)] ${errorMessage ? "border-red-300/20 bg-red-500/10 text-red-100" : "border-emerald-300/20 bg-emerald-500/10 text-emerald-100"}`, "class")}> ${errorMessage || actionMessage} </div>`, totalLeadsSinFiltro, abiertos, counters.ganado, conversion, analytics.totalUsers, analytics.newUsersThisMonth, analytics.premiumUsers, analytics.conversionRate, analytics.trialActiveUsers, analytics.pastDueUsers, analytics.totalLeads, analytics.leadsGanados, analytics.newUsersThisWeek, analytics.trialToPremium, analytics.leadsThisMonth, ESTADOS_LEAD.map((estado) => renderTemplate`<option${addAttribute(estado, "value")}>${statusLabels[estado]}</option>`), addAttribute(busqueda, "value"), ESTADOS_LEAD.map((estado) => renderTemplate`<option${addAttribute(estado, "value")}${addAttribute(filtroEstado === estado, "selected")}> ${statusLabels[estado]} (${counters[estado]})
</option>`), addAttribute(`rounded-full border px-3 py-1.5 text-xs transition ${!filtroEstado ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100" : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"}`, "class"), totalLeadsSinFiltro, ESTADOS_LEAD.map((estado) => renderTemplate`<a${addAttribute(`/admin?estado=${estado}`, "href")}${addAttribute(`rounded-full border px-3 py-1.5 text-xs transition ${filtroEstado === estado ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100" : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"}`, "class")}> ${statusLabels[estado]} ${counters[estado]} </a>`), leadsPaginados.length === 0 ? renderTemplate`<div class="premium-panel p-10 text-center"> <h2 class="text-xl font-semibold text-white">
No hay leads para esta vista
</h2> <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/50">
Ajusta los filtros o crea un lead manual para empezar el seguimiento comercial.
</p> </div>` : renderTemplate`<div class="grid gap-5"> ${leadsPaginados.map((lead) => renderTemplate`<article class="premium-panel p-5 md:p-6"> <div class="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between"> <div class="min-w-0"> <div class="flex flex-wrap items-center gap-3"> <a${addAttribute(`/dashboard/leads/${lead.id}`, "href")} class="text-xl font-semibold text-white transition hover:text-cyan-100"> ${lead.nombre} </a> <span${addAttribute(`status-pill ${statusBadgeClass[lead.estado]}`, "class")}> ${statusLabels[lead.estado]} </span> </div> <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50"> <span>${lead.email}</span> ${lead.empresa && renderTemplate`<span>${lead.empresa}</span>`} <span>${new Date(lead.timestamp).toLocaleString("es-ES")}</span> </div> <p class="mt-4 line-clamp-2 max-w-4xl text-sm leading-relaxed text-white/68"> ${lead.mensaje} </p> </div> <div class="flex flex-wrap gap-2"> <a${addAttribute(`/dashboard/leads/${lead.id}`, "href")} class="btn-secondary px-4 py-2 text-xs">
Abrir
</a> <button type="button"${addAttribute(`edit-${lead.id}`, "data-toggle-edit")} class="btn-secondary px-4 py-2 text-xs">
Editar
</button> </div> </div> <div class="mt-5 grid gap-3 lg:grid-cols-[260px_1fr_auto]"> <form method="POST" class="flex gap-2" data-admin-form> <input type="hidden" name="intent" value="update-status"> <input type="hidden" name="leadId"${addAttribute(lead.id, "value")}> <select name="status" class="input-premium w-full py-2.5"> ${ESTADOS_LEAD.map((estado) => renderTemplate`<option${addAttribute(estado, "value")}${addAttribute(lead.estado === estado, "selected")}> ${statusLabels[estado]} </option>`)} </select> <button class="btn-primary px-4 py-2.5 text-xs">
Cambiar
</button> </form> <form method="POST" class="flex gap-2" data-admin-form> <input type="hidden" name="intent" value="add-note"> <input type="hidden" name="leadId"${addAttribute(lead.id, "value")}> <input type="text" name="note" placeholder="Nota rápida..." class="input-premium w-full py-2.5"> <button class="btn-secondary px-4 py-2.5 text-xs">
Añadir nota
</button> </form> <form method="POST" data-admin-form data-confirm="Eliminar este lead de forma permanente?"> <input type="hidden" name="intent" value="delete-lead"> <input type="hidden" name="leadId"${addAttribute(lead.id, "value")}> <button class="rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-100 transition hover:-translate-y-0.5 hover:border-red-300/40 hover:bg-red-500/20">
Eliminar
</button> </form> </div> <details${addAttribute(`edit-${lead.id}`, "id")} class="mt-4 rounded-2xl border border-white/10 bg-black/20"> <summary class="cursor-pointer list-none px-4 py-3 text-sm font-medium text-white/75 transition hover:text-white">
Editar información completa
</summary> <form method="POST" class="grid gap-3 border-t border-white/10 p-4" data-admin-form> <input type="hidden" name="intent" value="edit-lead"> <input type="hidden" name="leadId"${addAttribute(lead.id, "value")}> <div class="grid gap-3 md:grid-cols-2"> <input name="nombre"${addAttribute(lead.nombre, "value")} class="input-premium" placeholder="Nombre" required> <input name="email" type="email"${addAttribute(lead.email, "value")} class="input-premium" placeholder="Email" required> </div> <div class="grid gap-3 md:grid-cols-[1fr_220px]"> <input name="empresa"${addAttribute(lead.empresa || "", "value")} class="input-premium" placeholder="Empresa"> <select name="estado" class="input-premium"> ${ESTADOS_LEAD.map((estado) => renderTemplate`<option${addAttribute(estado, "value")}${addAttribute(lead.estado === estado, "selected")}> ${statusLabels[estado]} </option>`)} </select> </div> <textarea name="mensaje" rows="4" class="input-premium resize-none" required>${lead.mensaje}</textarea> <div class="flex justify-end"> <button class="btn-primary px-5 py-2.5 text-sm">
Guardar cambios
</button> </div> </form> </details> </article>`)} </div>`, safePage, totalPaginas, totalLeads, safePage > 1 && renderTemplate`<a${addAttribute(buildPageUrl(safePage - 1), "href")} class="btn-secondary px-4 py-2 text-sm">
Anterior
</a>`, safePage < totalPaginas && renderTemplate`<a${addAttribute(buildPageUrl(safePage + 1), "href")} class="btn-secondary px-4 py-2 text-sm">
Siguiente
</a>`) })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
