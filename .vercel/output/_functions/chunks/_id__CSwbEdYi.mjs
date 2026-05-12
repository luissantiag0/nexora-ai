import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_WKm3_OPm.mjs';
import { r as renderScript } from './script_ROfGK1vk.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_BQahDiSz.mjs';
import { getUserInvoice } from './invoices_SV_HYBUz.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const user = Astro2.locals.user;
  const invoiceId = Astro2.params.id;
  const invoice = user ? await getUserInvoice(invoiceId, user.id) : null;
  if (!invoice) return Astro2.redirect("/premium/invoices");
  const statusLabels = {
    borrador: "Borrador",
    pendiente: "Pendiente",
    pagada: "Pagada",
    cancelada: "Cancelada"
  };
  const statusColors = {
    borrador: "border-white/10 bg-white/[0.04] text-white/50",
    pendiente: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    pagada: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    cancelada: "border-rose-300/20 bg-rose-300/10 text-rose-100"
  };
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": `Factura: ${invoice.clientName}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/premium/invoices" class="text-sm text-white/45 transition hover:text-cyan-100">← Volver a facturas</a> <section class="mt-5 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.1),rgba(255,255,255,0.035)_48%,rgba(16,185,129,0.09))] p-6 shadow-[0_24px_90px_-54px_rgba(34,211,238,0.85)] md:p-8"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Factura #${invoice.id.slice(0, 8)}</p> <h2 class="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">${invoice.clientName}</h2> </div> <span${addAttribute(`inline-block rounded-full border px-3 py-1 text-xs font-medium ${statusColors[invoice.status] || ""}`, "class")}>${statusLabels[invoice.status] || invoice.status}</span> </div> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Detalle</h2> <dl class="mt-5 grid gap-4 text-sm"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <dt class="text-white/38">Cliente</dt> <dd class="mt-1 text-white">${invoice.clientName}</dd> <dd class="text-white/60">${invoice.clientEmail}</dd> ${invoice.company && renderTemplate`<dd class="text-white/60">${invoice.company}</dd>`} </div> ${invoice.dueDate && renderTemplate`<div class="rounded-2xl border border-white/10 bg-black/20 p-4"><dt class="text-white/38">Vencimiento</dt><dd class="mt-1 text-white">${new Date(invoice.dueDate).toLocaleDateString("es-ES")}</dd></div>`} ${invoice.notes && renderTemplate`<div class="rounded-2xl border border-white/10 bg-black/20 p-4"><dt class="text-white/38">Notas</dt><dd class="mt-1 text-white/70">${invoice.notes}</dd></div>`} </dl> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Resumen</h2> <div class="mt-5 grid gap-4"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"><p class="text-xs uppercase tracking-[0.16em] text-white/38">Subtotal</p><p class="mt-1 text-2xl font-semibold text-white">${invoice.subtotal.toFixed(2)} €</p></div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"><p class="text-xs uppercase tracking-[0.16em] text-white/38">IVA</p><p class="mt-1 text-2xl font-semibold text-white">${invoice.tax.toFixed(2)} €</p></div> <div class="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4"><p class="text-xs uppercase tracking-[0.16em] text-cyan-100/70">Total</p><p class="mt-1 text-3xl font-semibold text-cyan-100">${invoice.total.toFixed(2)} €</p></div> </div> </div> </section> <section class="mt-6 premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Líneas</h2> <div class="mt-5 overflow-x-auto"> <table class="w-full text-sm"> <thead><tr class="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/38"> <th class="px-4 py-3 font-medium">Descripción</th><th class="px-4 py-3 font-medium">Cantidad</th><th class="px-4 py-3 font-medium">Precio</th><th class="px-4 py-3 font-medium text-right">Total</th> </tr></thead> <tbody class="divide-y divide-white/5"> ${invoice.items.map((item) => renderTemplate`<tr><td class="px-4 py-3 text-white">${item.description}</td><td class="px-4 py-3 text-white/60">${item.quantity}</td><td class="px-4 py-3 text-white/60">${item.price.toFixed(2)} €</td><td class="px-4 py-3 text-right font-medium text-white">${item.total.toFixed(2)} €</td></tr>`)} </tbody> </table> </div> </section> <section class="mt-6 flex flex-wrap gap-3"> <a${addAttribute(`/api/invoices/${invoice.id}`, "href")} target="_blank" class="btn-primary px-5 py-3 text-sm">Descargar PDF</a> ${invoice.status === "borrador" && renderTemplate`<button type="button" data-action="emitir"${addAttribute(invoice.id, "data-id")} class="btn-secondary px-5 py-3 text-sm">
Emitir factura
</button>`} ${invoice.status === "pendiente" && renderTemplate`<button type="button" data-action="cobrar"${addAttribute(invoice.id, "data-id")} class="btn-secondary px-5 py-3 text-sm">
Marcar como pagada
</button>`} ${(invoice.status === "borrador" || invoice.status === "pendiente") && renderTemplate`<button type="button" data-action="cancelar"${addAttribute(invoice.id, "data-id")} class="btn-secondary px-5 py-3 text-sm">
Cancelar factura
</button>`} </section> <div id="toast-container" class="fixed bottom-6 right-6 z-50 grid gap-3"></div> ` })} ${renderScript($$result, "C:/Users/luiss/nexora-ai/src/pages/premium/invoices/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/invoices/[id].astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/invoices/[id].astro";
const $$url = "/premium/invoices/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
