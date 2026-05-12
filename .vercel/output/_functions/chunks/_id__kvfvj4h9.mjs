import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_WKm3_OPm.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_BQahDiSz.mjs';
import { b as actualizarEstadoLead, f as anadirNotaLead, o as obtenerLeads, h as obtenerAccionSiguiente, E as ESTADOS_LEAD } from './leadStorage_C6vk3OUN.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/premium/leads");
  }
  const clean = (value) => String(value || "").replace(/[<>{}`$\\]/g, "").trim();
  const isEstadoLead = (value) => ESTADOS_LEAD.includes(value);
  let actionMessage = "";
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const intent = clean(form.get("intent"));
    if (intent === "update-status") {
      const status = clean(form.get("status"));
      const ok = isEstadoLead(status) ? await actualizarEstadoLead(id, status) : false;
      actionMessage = ok ? "Estado actualizado correctamente." : "Estado no válido.";
    }
    if (intent === "add-note") {
      const note = clean(form.get("note"));
      const ok = note ? await anadirNotaLead(id, note) : false;
      actionMessage = ok ? "Nota añadida correctamente." : "No se pudo añadir la nota.";
    }
    if (intent === "convert-to-invoice") {
      const { createInvoiceFromLead } = await import('./invoices_SV_HYBUz.mjs');
      const invoice = await createInvoiceFromLead(id, currentUser.id);
      if (invoice) {
        return Astro2.redirect(`/premium/invoices/${invoice.id}`);
      }
      errorMessage = "No se pudo convertir el lead en factura.";
    }
  }
  const leads = await obtenerLeads();
  const lead = leads.find((item) => item.id === id);
  if (!lead) {
    return Astro2.redirect("/premium/leads");
  }
  const statusLabels = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    cualificado: "Cualificado",
    propuesta_enviada: "Propuesta enviada",
    ganado: "Ganado",
    perdido: "Perdido"
  };
  const nextAction = obtenerAccionSiguiente(lead.estado);
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": `Lead: ${lead.nombre}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/premium/leads" class="text-sm text-white/45 transition hover:text-cyan-100">
Volver a leads
</a> <section class="mt-5 premium-panel p-6 md:p-8"> <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"> <div> <span class="status-pill bg-cyan-300/10 text-cyan-100 ring-cyan-300/25"> ${statusLabels[lead.estado]} </span> <h2 class="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl"> ${lead.nombre} </h2> <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/45"> <span>${lead.email}</span> ${lead.empresa && renderTemplate`<span>${lead.empresa}</span>`} <span>${new Date(lead.timestamp).toLocaleString("es-ES")}</span> </div> </div> <a href="/admin" class="btn-secondary px-4 py-2 text-sm">Abrir CRM admin</a> </div> </section> ${(actionMessage || errorMessage) && renderTemplate`<div${addAttribute(`mt-6 rounded-xl border px-4 py-3 text-sm ${errorMessage ? "border-red-300/20 bg-red-500/10 text-red-100" : "border-emerald-300/20 bg-emerald-500/10 text-emerald-100"}`, "class")}> ${errorMessage || actionMessage} </div>`}<div class="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"> <section class="premium-panel p-6"> <h2 class="text-xl font-semibold text-white">Mensaje</h2> <p class="mt-5 whitespace-pre-line rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-relaxed text-white/72"> ${lead.mensaje} </p> </section> <aside class="grid gap-6"> <section class="premium-panel p-6"> <h2 class="text-xl font-semibold text-white">Acciones rápidas</h2> <form method="POST" class="mt-5 flex gap-2"> <input type="hidden" name="intent" value="update-status"> <select name="status" class="input-premium w-full"> ${ESTADOS_LEAD.map((estado) => renderTemplate`<option${addAttribute(estado, "value")}${addAttribute(lead.estado === estado, "selected")}> ${statusLabels[estado]} </option>`)} </select> <button class="btn-primary px-4 py-2.5 text-sm">Cambiar</button> </form> <div class="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">
Siguiente acción sugerida
</p> <p class="mt-2 text-sm leading-relaxed text-white/75"> ${nextAction} </p> </div> ${lead.estado === "ganado" && renderTemplate`<form method="POST"${addAttribute(`/premium/leads/${lead.id}`, "action")} class="mt-4"> <input type="hidden" name="intent" value="convert-to-invoice"> <button class="btn-primary w-full px-4 py-2.5 text-sm">
Convertir lead en factura
</button> </form>`} </section> <section class="premium-panel p-6"> <h2 class="text-xl font-semibold text-white">Notas internas</h2> <form method="POST" class="mt-5 grid gap-3"> <input type="hidden" name="intent" value="add-note"> <textarea name="note" rows="4" placeholder="Añade contexto, llamadas o próximos pasos..." class="input-premium resize-none"></textarea> <button class="btn-primary w-fit px-5 py-2.5 text-sm">Guardar nota</button> </form> <div class="mt-5 grid gap-3"> ${lead.notas.length === 0 ? renderTemplate`<p class="rounded-2xl border border-dashed border-white/10 bg-black/15 p-4 text-sm text-white/42">
Sin notas todavía.
</p>` : lead.notas.map((nota) => renderTemplate`<div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="whitespace-pre-line text-sm leading-relaxed text-white/70">${nota.texto}</p> <p class="mt-3 text-xs text-white/35">${new Date(nota.createdAt).toLocaleString("es-ES")}</p> </div>`)} </div> </section> </aside> </div> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/leads/[id].astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/leads/[id].astro";
const $$url = "/premium/leads/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
