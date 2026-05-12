import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_DLA3BFuR.mjs';

const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  let errors = [];
  const user = Astro2.locals.user;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const clientName = String(formData.get("clientName") || "").trim();
    const clientEmail = String(formData.get("clientEmail") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const dueDate = String(formData.get("dueDate") || "").trim();
    const notes = String(formData.get("notes") || "").trim();
    const itemDesc = String(formData.get("itemDesc") || "").trim();
    const itemQty = parseInt(formData.get("itemQty")) || 1;
    const itemPrice = parseFloat(formData.get("itemPrice")) || 0;
    if (!clientName) errors.push("Nombre del cliente requerido.");
    if (!clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) errors.push("Email inválido.");
    if (!itemDesc) errors.push("Descripción del servicio requerida.");
    if (itemPrice <= 0) errors.push("Precio debe ser mayor a 0.");
    if (errors.length === 0 && user) {
      const { createInvoice } = await import('./invoices_SV_HYBUz.mjs');
      const invoice = await createInvoice(user.id, {
        clientName,
        clientEmail,
        company: company || null,
        dueDate: dueDate || null,
        items: [{ description: itemDesc, quantity: itemQty, price: itemPrice }],
        notes: notes || null,
        tax: 0
      });
      return Astro2.redirect(`/premium/invoices/${invoice.id}`);
    }
  }
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Nueva factura" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Facturación</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Nueva factura</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">Crea una factura para tu cliente.</p> </section> <section class="mt-8 mx-auto max-w-2xl"> <div class="premium-panel p-6 md:p-8"> ${errors.length > 0 && renderTemplate`<div class="mb-6 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">${errors.map((e) => renderTemplate`<p>${e}</p>`)}</div>`} <form method="POST" class="grid gap-5"> <div class="grid gap-5 sm:grid-cols-2"> <label class="block space-y-1.5"><span class="text-sm text-white/65">Cliente *</span><input type="text" name="clientName" required class="input-premium w-full" placeholder="Nombre del cliente"></label> <label class="block space-y-1.5"><span class="text-sm text-white/65">Email *</span><input type="email" name="clientEmail" required class="input-premium w-full" placeholder="cliente@email.com"></label> </div> <div class="grid gap-5 sm:grid-cols-2"> <label class="block space-y-1.5"><span class="text-sm text-white/65">Empresa</span><input type="text" name="company" class="input-premium w-full" placeholder="Empresa (opcional)"></label> <label class="block space-y-1.5"><span class="text-sm text-white/65">Vencimiento</span><input type="date" name="dueDate" class="input-premium w-full"></label> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-5"> <p class="text-xs uppercase tracking-[0.16em] text-white/38 mb-4">Línea de servicio</p> <div class="grid gap-4 sm:grid-cols-[1fr_80px_120px]"> <label class="block space-y-1.5"><span class="text-sm text-white/65">Descripción *</span><input type="text" name="itemDesc" required class="input-premium w-full" placeholder="Servicio o producto"></label> <label class="block space-y-1.5"><span class="text-sm text-white/65">Cantidad</span><input type="number" name="itemQty" value="1" min="1" class="input-premium w-full"></label> <label class="block space-y-1.5"><span class="text-sm text-white/65">Precio *</span><input type="number" name="itemPrice" step="0.01" min="0.01" required class="input-premium w-full" placeholder="0.00"></label> </div> </div> <label class="block space-y-1.5"><span class="text-sm text-white/65">Notas</span><textarea name="notes" rows="3" class="input-premium w-full resize-y" placeholder="Condiciones, descuentos, información adicional..."></textarea></label> <div class="flex items-center gap-3 pt-2"> <button class="btn-primary px-6 py-3">Crear factura</button> <a href="/premium/invoices" class="btn-secondary px-6 py-3">Cancelar</a> </div> </form> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/invoices/new.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/invoices/new.astro";
const $$url = "/premium/invoices/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
