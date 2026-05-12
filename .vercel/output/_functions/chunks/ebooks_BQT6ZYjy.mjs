import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { r as renderScript } from './script_ROfGK1vk.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_DLA3BFuR.mjs';
import { a as getUserEbooks } from './ebook_DffwxrtJ.mjs';

const prerender = false;
const $$Ebooks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Ebooks;
  const user = Astro2.locals.user;
  const ebooks = user ? await getUserEbooks(user.id) : [];
  const hasEbooks = ebooks.length > 0;
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Ebooks IA" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Content engine</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Ebooks y briefings</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">Genera documentos comerciales, briefings y guías con ayuda de IA. Exporta a PDF.</p> </div> </div> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Nuevo documento</h2> <form id="ebook-form" class="mt-5 grid gap-4"> <label class="block space-y-1.5"><span class="text-sm text-white/65">Título *</span><input id="ebook-title" type="text" required class="input-premium w-full" placeholder="Ej: Guía de automatización comercial"></label> <label class="block space-y-1.5"><span class="text-sm text-white/65">Tema / Enfoque</span><input id="ebook-topic" type="text" class="input-premium w-full" placeholder="Ej: Automatización de procesos B2B"></label> <label class="block space-y-1.5"><span class="text-sm text-white/65">Audiencia objetivo</span><textarea id="ebook-audience" rows="3" class="input-premium w-full resize-none" placeholder="Ej: Directores de operaciones en pymes tecnológicas"></textarea></label> <div class="flex flex-wrap gap-3"> <button type="button" id="ebook-generate-ai" class="btn-primary px-5 py-3 text-sm">Generar con IA</button> <button type="button" id="ebook-create-manual" class="btn-secondary px-5 py-3 text-sm">Crear borrador</button> </div> </form> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Documentos</h2> ${!hasEbooks ? renderTemplate`<div class="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/15 p-5 text-sm text-white/45">Aún no hay documentos. Genera tu primer ebook.</div>` : renderTemplate`<div class="mt-5 grid gap-3"> ${ebooks.map((ebook) => renderTemplate`<a${addAttribute(`/premium/ebooks/${ebook.id}`, "href")} class="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/30"> <div class="flex items-center justify-between"> <div> <p class="font-medium text-white">${ebook.title}</p> <p class="mt-1 text-xs text-white/45">${ebook.topic || "Sin tema"} · ${ebook.content ? `${ebook.content.length} caracteres` : "Borrador"}</p> </div> <span class="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/50">${ebook.status}</span> </div> </a>`)} </div>`} </div> </section> ` })} ${renderScript($$result, "C:/Users/luiss/nexora-ai/src/pages/premium/ebooks.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/ebooks.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/ebooks.astro";
const $$url = "/premium/ebooks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ebooks,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
