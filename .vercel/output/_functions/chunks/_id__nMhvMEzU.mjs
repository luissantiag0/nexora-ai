import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { r as renderScript } from './script_ROfGK1vk.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_DLA3BFuR.mjs';
import { g as getUserPitchDeck } from './pitchDeck_9MaHces2.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const user = Astro2.locals.user;
  const deckId = Astro2.params.id;
  const deck = user ? await getUserPitchDeck(deckId, user.id) : null;
  if (!deck) return Astro2.redirect("/premium/pitchdecks");
  const sections = deck.sections ? JSON.parse(deck.sections) : [];
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": deck.title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/premium/pitchdecks" class="text-sm text-white/45 transition hover:text-cyan-100">← Volver</a> <section class="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Pitch deck</p> <h2 class="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">${deck.title}</h2> ${deck.clientType && renderTemplate`<p class="mt-2 text-sm text-white/55">${deck.clientType}${deck.objective ? ` · ${deck.objective}` : ""}</p>`} </div> <div class="flex flex-wrap gap-3"> <a${addAttribute(`/api/pitchdecks/${deck.id}`, "href")} target="_blank" class="btn-primary px-5 py-2.5 text-sm">Exportar PDF</a> <button type="button" id="save-deck" class="btn-secondary px-5 py-2.5 text-sm">Guardar</button> </div> </div> </section> <section class="mt-8 grid gap-6"> ${sections.map((section, index) => renderTemplate`<div class="premium-panel p-5 md:p-6"> <div class="flex items-center justify-between"> <h3 class="text-lg font-semibold text-white"> <span class="text-cyan-100/60">0${index + 1}.</span> ${section.title} </h3> <span class="text-xs text-white/35"${addAttribute(index, "data-word-count")}>0 palabras</span> </div> <textarea${addAttribute(index, "data-section")} rows="5" class="input-premium mt-4 w-full resize-y" placeholder="Escribe el contenido de esta sección...">${section.content}</textarea> </div>`)} </section> ` })} ${renderScript($$result, "C:/Users/luiss/nexora-ai/src/pages/premium/pitchdecks/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/pitchdecks/[id].astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/pitchdecks/[id].astro";
const $$url = "/premium/pitchdecks/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
