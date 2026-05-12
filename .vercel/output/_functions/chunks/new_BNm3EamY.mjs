import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_WKm3_OPm.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_DsBs0YFz.mjs';

const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  let errors = [];
  let success = false;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const company = String(formData.get("company") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const source = String(formData.get("source") || "manual").trim();
    const tags = String(formData.get("tags") || "").trim();
    if (!name) errors.push("El nombre es requerido.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email inválido.");
    if (errors.length === 0) {
      const { createUserLead } = await import('./crm_Q4Xs_bm6.mjs');
      const user = Astro2.locals.user;
      if (user) {
        const lead = await createUserLead(user.id, { name, email, company, phone, message, source, tags });
        return Astro2.redirect(`/dashboard/leads/${lead.id}`);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Nuevo lead" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">CRM</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Nuevo lead</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">
Añade un nuevo contacto o cliente potencial a tu CRM.
</p> </section> <section class="mt-8 mx-auto max-w-2xl"> <div class="premium-panel p-6 md:p-8"> ${errors.length > 0 && renderTemplate`<div class="mb-6 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"> ${errors.map((e) => renderTemplate`<p>${e}</p>`)} </div>`} ${success} <form method="POST" class="grid gap-5"> <div class="grid gap-5 sm:grid-cols-2"> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Nombre *</span> <input type="text" name="name" required placeholder="Nombre completo" class="input-premium w-full"> </label> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Email *</span> <input type="email" name="email" required placeholder="email@ejemplo.com" class="input-premium w-full"> </label> </div> <div class="grid gap-5 sm:grid-cols-2"> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Empresa</span> <input type="text" name="company" placeholder="Nombre de la empresa" class="input-premium w-full"> </label> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Teléfono</span> <input type="tel" name="phone" placeholder="+34 600 000 000" class="input-premium w-full"> </label> </div> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Etiquetas</span> <input type="text" name="tags" placeholder="ej: interesado, pyme, automatizacion" class="input-premium w-full"> <p class="text-xs text-white/35">Separa las etiquetas con comas</p> </label> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Origen</span> <select name="source" class="input-premium w-full"> <option value="manual">Manual</option> <option value="web">Web</option> <option value="referido">Referido</option> <option value="email">Email</option> <option value="linkedin">LinkedIn</option> <option value="evento">Evento</option> <option value="otro">Otro</option> </select> </label> <label class="block space-y-1.5"> <span class="text-sm text-white/65">Notas / Mensaje</span> <textarea name="message" rows="4" placeholder="Información relevante sobre el lead..." class="input-premium w-full resize-y"></textarea> </label> <div class="flex items-center gap-3 pt-2"> <button class="btn-primary px-6 py-3">Crear lead</button> <a href="/dashboard/leads" class="btn-secondary px-6 py-3">Cancelar</a> </div> </form> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads/new.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads/new.astro";
const $$url = "/dashboard/leads/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
