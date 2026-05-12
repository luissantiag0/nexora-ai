import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_DLA3BFuR.mjs';
import { g as getUserEbook } from './ebook_DffwxrtJ.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const user = Astro2.locals.user;
  const ebookId = Astro2.params.id;
  const ebook = user ? await getUserEbook(ebookId, user.id) : null;
  if (!ebook) return Astro2.redirect("/premium/ebooks");
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": ebook.title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/premium/ebooks" class="text-sm text-white/45 transition hover:text-cyan-100">← Volver</a> <section class="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Documento</p> <h2 class="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">${ebook.title}</h2> <div class="mt-3 flex flex-wrap gap-3 text-sm text-white/45"> ${ebook.topic && renderTemplate`<span>Tema: ${ebook.topic}</span>`} ${ebook.audience && renderTemplate`<span>Audiencia: ${ebook.audience}</span>`} <span>Estado: ${ebook.status}</span> </div> </div> <div class="flex flex-wrap gap-3"> <a${addAttribute(`/api/ebooks/${ebook.id}`, "href")} target="_blank" class="btn-primary px-5 py-2.5 text-sm">Descargar PDF</a> </div> </div> </section> <section class="mt-8 premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Contenido</h2> ${ebook.content ? renderTemplate`<div class="mt-5 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-6 text-sm leading-relaxed text-white/75 font-sans"> ${ebook.content} </div>` : renderTemplate`<div class="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/15 p-5 text-sm text-white/45">
Este documento está en borrador. Usa la opción "Generar con IA" desde la lista para crear contenido automáticamente.
</div>`} </section> ${ebook.structure && renderTemplate`<section class="mt-6 premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Estructura</h2> <div class="mt-5 grid gap-3"> ${JSON.parse(ebook.structure).map((item, i) => renderTemplate`<div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"> <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-xs text-cyan-100">${i + 1}</span> <span class="text-sm text-white/70">${item}</span> </div>`)} </div> </section>`}` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/ebooks/[id].astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/ebooks/[id].astro";
const $$url = "/premium/ebooks/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
