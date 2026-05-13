import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { r as renderScript } from './script_ROfGK1vk.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout___0AHu2F.mjs';
import { getUserInvoices, getInvoiceCounts } from './invoices_weJHw2DQ.mjs';

const prerender = false;
const $$Invoices = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Invoices;
  const user = Astro2.locals.user;
  const [invoices, counts] = user ? await Promise.all([getUserInvoices(user.id), getInvoiceCounts(user.id)]) : [[], null];
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
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Facturas" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Facturación</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Facturas</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">Gestiona tus facturas, crea nuevas y exporta a PDF.</p> </div> <a href="/premium/invoices/new" class="btn-primary shrink-0 px-5 py-3 text-sm text-center">+ Nueva factura</a> </div> </section> <section class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"> <div class="premium-panel p-4"><p class="text-xs text-white/45">Totales</p><p class="mt-1 text-2xl font-semibold text-white">${counts?.total ?? 0}</p></div> <div class="premium-panel p-4"><p class="text-xs text-white/45">Pendientes</p><p class="mt-1 text-2xl font-semibold text-amber-100">${counts?.pendiente ?? 0}</p></div> <div class="premium-panel p-4"><p class="text-xs text-white/45">Pagadas</p><p class="mt-1 text-2xl font-semibold text-emerald-100">${counts?.pagada ?? 0}</p></div> <div class="premium-panel p-4"><p class="text-xs text-white/45">Ingresos</p><p class="mt-1 text-2xl font-semibold text-cyan-100">${counts?.paidAmount.toFixed(0) ?? 0} €</p></div> </section> <section class="mt-6 premium-panel overflow-hidden"> ${invoices.length === 0 ? renderTemplate`<div class="p-8 text-center"> <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"><span class="text-2xl text-white/30">📄</span></div> <h3 class="mt-4 text-lg font-medium text-white">Sin facturas</h3> <p class="mt-2 text-sm text-white/45">Crea tu primera factura o conviértela desde un lead ganado.</p> <a href="/premium/invoices/new" class="btn-primary mt-6 inline-flex px-5 py-3 text-sm">+ Crear factura</a> </div>` : renderTemplate`<div class="overflow-x-auto"> <table class="w-full text-sm"> <thead><tr class="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/38"> <th class="px-4 py-4 font-medium">Cliente</th> <th class="px-4 py-4 font-medium hidden md:table-cell">Email</th> <th class="px-4 py-4 font-medium">Estado</th> <th class="px-4 py-4 font-medium">Total</th> <th class="px-4 py-4 font-medium hidden lg:table-cell">Vencimiento</th> <th class="px-4 py-4 font-medium text-right">Acción</th> </tr></thead> <tbody class="divide-y divide-white/5"> ${invoices.map((inv) => renderTemplate`<tr class="transition hover:bg-white/[0.02]"> <td class="px-4 py-3 font-medium text-white">${inv.clientName}</td> <td class="px-4 py-3 text-white/60 hidden md:table-cell">${inv.clientEmail}</td> <td class="px-4 py-3"><span${addAttribute(`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusColors[inv.status] || ""}`, "class")}>${statusLabels[inv.status] || inv.status}</span></td> <td class="px-4 py-3 text-white font-medium">${inv.total.toFixed(2)} €</td> <td class="px-4 py-3 text-white/40 text-xs hidden lg:table-cell">${inv.dueDate ? new Date(inv.dueDate).toLocaleDateString("es-ES") : "—"}</td> <td class="px-4 py-3 text-right"> <div class="flex items-center justify-end gap-2"> <a${addAttribute(`/premium/invoices/${inv.id}`, "href")} class="text-xs text-cyan-200 hover:text-white transition">Ver</a> <button type="button"${addAttribute(inv.id, "data-delete-invoice")} class="text-xs text-rose-300 hover:text-rose-100 transition">Eliminar</button> </div> </td> </tr>`)} </tbody> </table> </div>`} </section> <div id="toast-container" class="fixed bottom-6 right-6 z-50 grid gap-3"></div> ` })} ${renderScript($$result, "C:/Users/luiss/nexora-ai/src/pages/premium/invoices.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/invoices.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/invoices.astro";
const $$url = "/premium/invoices";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Invoices,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
