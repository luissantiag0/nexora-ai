import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout___0AHu2F.mjs';
import { c as crearLeadManual, E as ESTADOS_LEAD } from './leadStorage_C3jvhflq.mjs';

const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  const currentUser = Astro2.locals.user;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let error = "";
  const clean = (value) => String(value || "").replace(/[<>{}`$\\]/g, "").trim();
  const isEstadoLead = (value) => ESTADOS_LEAD.includes(value);
  if (!currentUser) {
    return Astro2.redirect("/admin/login");
  }
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const nombre = clean(form.get("nombre"));
    const email = clean(form.get("email")).toLowerCase();
    const empresa = clean(form.get("empresa"));
    const mensaje = clean(form.get("mensaje"));
    const estadoInput = clean(form.get("estado"));
    const estado = isEstadoLead(estadoInput) ? estadoInput : "nuevo";
    if (!nombre || !email || !mensaje) {
      error = "Completa nombre, email y mensaje para crear el lead.";
    } else if (!emailPattern.test(email)) {
      error = "Introduce un email válido.";
    } else {
      const leadId = await crearLeadManual({
        nombre,
        email,
        empresa,
        mensaje,
        estado,
        userId: currentUser.id
      });
      return Astro2.redirect(`/premium/leads/${leadId}`);
    }
  }
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Nuevo lead" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-3xl"> <a href="/premium/leads" class="text-sm text-white/45 transition hover:text-cyan-100">
Volver a leads
</a> <div class="mt-5 premium-panel p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Alta manual</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Crear nuevo lead</h2> <p class="mt-3 text-sm leading-relaxed text-white/55">
Registra oportunidades procedentes de llamadas, eventos, partners o referencias.
</p> ${error && renderTemplate`<div class="mt-6 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"> ${error} </div>`} <form method="POST" class="mt-7 grid gap-4"> <div class="grid gap-4 md:grid-cols-2"> <input name="nombre" placeholder="Nombre completo" class="input-premium" required> <input name="email" type="email" placeholder="Email" class="input-premium" required> </div> <div class="grid gap-4 md:grid-cols-[1fr_220px]"> <input name="empresa" placeholder="Empresa" class="input-premium"> <select name="estado" class="input-premium"> <option value="nuevo">Nuevo</option> <option value="contactado">Contactado</option> <option value="cualificado">Cualificado</option> <option value="propuesta_enviada">Propuesta enviada</option> <option value="ganado">Ganado</option> <option value="perdido">Perdido</option> </select> </div> <textarea name="mensaje" rows="6" placeholder="Contexto comercial, necesidad o mensaje recibido" class="input-premium resize-none" required></textarea> <button class="btn-primary w-fit px-6 py-3 text-sm">Crear lead</button> </form> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/leads/new.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/leads/new.astro";
const $$url = "/premium/leads/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
