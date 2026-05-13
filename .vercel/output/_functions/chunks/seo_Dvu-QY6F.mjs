import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout___0AHu2F.mjs';

const prerender = false;
const $$Seo = createComponent(($$result, $$props, $$slots) => {
  const clusters = [
    { topic: "Automatización con IA", pages: 12, score: "Alta" },
    { topic: "RAG empresarial", pages: 8, score: "Media" },
    { topic: "Facturación inteligente", pages: 6, score: "Alta" }
  ];
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "SEO Swarm" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Organic growth</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">SEO Swarm</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">
Planifica clústeres semánticos, contenido y oportunidades orgánicas con una capa de IA controlada.
</p> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Nuevo análisis</h2> <form class="mt-5 grid gap-4"> <input class="input-premium" placeholder="Dominio o URL objetivo"> <input class="input-premium" placeholder="Mercado o país"> <textarea rows="5" class="input-premium resize-none" placeholder="Servicios, competidores o keywords prioritarias"></textarea> <button type="button" class="btn-primary w-fit px-5 py-3 text-sm">Analizar oportunidad</button> </form> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Clústeres priorizados</h2> <div class="mt-5 grid gap-3"> ${clusters.map((cluster) => renderTemplate`<div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"> <div> <h3 class="font-medium text-white">${cluster.topic}</h3> <p class="mt-1 text-sm text-white/45">${cluster.pages} páginas sugeridas</p> </div> <span class="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100"> ${cluster.score} </span> </div> </div>`)} </div> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/seo.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/seo.astro";
const $$url = "/premium/seo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Seo,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
