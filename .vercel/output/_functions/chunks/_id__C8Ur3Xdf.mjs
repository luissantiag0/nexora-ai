import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { r as renderScript } from './script_ROfGK1vk.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_jWBKHBov.mjs';
import { getUserLead, LEAD_STATUSES } from './crm_Q4Xs_bm6.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const user = Astro2.locals.user;
  const leadId = Astro2.params.id;
  const lead = user ? await getUserLead(leadId, user.id) : null;
  if (!lead) {
    return Astro2.redirect("/dashboard/leads");
  }
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
  let actionError = "";
  let actionSuccess = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const method = String(formData.get("_method") || "POST").toUpperCase();
    if (method === "PATCH") {
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const company = String(formData.get("company") || "").trim() || null;
      const phone = String(formData.get("phone") || "").trim() || null;
      const message = String(formData.get("message") || "").trim();
      const status = String(formData.get("status") || "");
      const tags = String(formData.get("tags") || "").trim();
      const { updateUserLead } = await import('./crm_Q4Xs_bm6.mjs');
      const updated = await updateUserLead(leadId, user.id, { name, email, company, phone, message, status, tags });
      if (updated) {
        actionSuccess = "Lead actualizado correctamente.";
        lead.name = updated.name;
        lead.email = updated.email;
        lead.company = updated.company;
        lead.phone = updated.phone;
        lead.message = updated.message;
        lead.status = updated.status;
        lead.tags = updated.tags;
      } else {
        actionError = "Error al actualizar.";
      }
    }
    if (method === "DELETE") {
      const { deleteUserLead } = await import('./crm_Q4Xs_bm6.mjs');
      await deleteUserLead(leadId, user.id);
      return Astro2.redirect("/dashboard/leads");
    }
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": lead.name }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Lead</p> <h2 class="mt-1 text-3xl font-semibold tracking-tight text-white md:text-4xl">${lead.name}</h2> </div> <span${addAttribute(`inline-block rounded-full border px-3 py-1 text-xs font-medium ${statusColors[lead.status] || ""}`, "class")}> ${statusLabels[lead.status] || lead.status} </span> </div> </section> ${actionError && renderTemplate`<div class="mt-4 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">${actionError}</div>`}${actionSuccess && renderTemplate`<div class="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">${actionSuccess}</div>`}<section class="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Información</h2> <form method="POST" class="mt-5 grid gap-4"> <input type="hidden" name="_method" value="PATCH"> <div class="grid gap-4 sm:grid-cols-2"> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Nombre</span> <input type="text" name="name"${addAttribute(lead.name, "value")} required class="input-premium w-full"> </label> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Email</span> <input type="email" name="email"${addAttribute(lead.email, "value")} required class="input-premium w-full"> </label> </div> <div class="grid gap-4 sm:grid-cols-2"> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Empresa</span> <input type="text" name="company"${addAttribute(lead.company || "", "value")} class="input-premium w-full"> </label> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Teléfono</span> <input type="tel" name="phone"${addAttribute(lead.phone || "", "value")} class="input-premium w-full"> </label> </div> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Etiquetas</span> <input type="text" name="tags"${addAttribute(lead.tags || "", "value")} placeholder="interesado, pyme" class="input-premium w-full"> </label> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Mensaje / Notas</span> <textarea name="message" rows="4" class="input-premium w-full resize-y">${lead.message}</textarea> </label> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Estado</span> <select name="status" class="input-premium w-full"> ${LEAD_STATUSES.map((s) => renderTemplate`<option${addAttribute(s, "value")}${addAttribute(lead.status === s, "selected")}>${statusLabels[s]}</option>`)} </select> </label> <div class="flex items-center gap-3 pt-2"> <button class="btn-primary px-5 py-2.5 text-sm">Guardar cambios</button> <button type="button" data-analyze-btn class="btn-secondary px-5 py-2.5 text-sm">Analizar con IA</button> <button type="button" data-email-btn class="btn-secondary px-5 py-2.5 text-sm">Generar email</button> </div> </form> </div> <div class="grid gap-6"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Resumen IA</h2> ${lead.aiSummary ? renderTemplate`<div class="mt-4 space-y-3 text-sm"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Análisis</p> <p class="mt-2 text-white/80">${lead.aiSummary}</p> </div> ${lead.priority && renderTemplate`<div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Prioridad</p> <p class="mt-2 text-white/80 capitalize">${lead.priority}</p> </div>`} </div>` : renderTemplate`<div class="mt-4 rounded-2xl border border-dashed border-white/10 bg-black/15 p-5 text-sm text-white/45">
Haz clic en "Analizar con IA" para obtener un resumen automático.
</div>`} </div> <div class="premium-panel p-5 md:p-6"> <div class="flex items-center justify-between"> <h2 class="text-xl font-semibold text-white">Notas</h2> <button type="button" data-add-note-btn class="btn-secondary px-3 py-1.5 text-xs">+ Añadir</button> </div> <div class="mt-4 grid gap-3"> ${lead.notes.length === 0 ? renderTemplate`<div class="rounded-2xl border border-dashed border-white/10 bg-black/15 p-5 text-sm text-white/45">
Sin notas aún. Añade la primera.
</div>` : lead.notes.map((note) => renderTemplate`<div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <p class="text-sm text-white/80">${note.text}</p> <p class="mt-2 text-[11px] text-white/35"> ${note.createdAt.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  })} </p> </div>`)} </div> </div> </div> </section> <section class="mt-6 premium-panel p-5 md:p-6" id="email-section" style="display:none"> <h2 class="text-xl font-semibold text-white">Email generado</h2> <pre id="email-content" class="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/70 font-sans leading-relaxed"></pre> <button type="button" data-copy-email class="btn-secondary mt-4 px-5 py-2.5 text-sm">Copiar email</button> </section> ` })} ${renderScript($$result, "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads/[id].astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads/[id].astro";
const $$url = "/dashboard/leads/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
