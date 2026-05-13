import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { r as renderScript } from './script_ROfGK1vk.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout___0AHu2F.mjs';
import { a as getUserPitchDecks } from './pitchDeck_CWazJWSX.mjs';

const prerender = false;
const $$Pitchdecks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Pitchdecks;
  const user = Astro2.locals.user;
  const decks = user ? await getUserPitchDecks(user.id) : [];
  const hasDecks = decks.length > 0;
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Pitch decks" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Sales enablement</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Pitch decks</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">Crea presentaciones comerciales con IA o edítalas manualmente. Exporta a PDF.</p> </div> </div> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Nuevo pitch deck</h2> <form id="deck-form" class="mt-5 grid gap-4"> <label class="block space-y-1.5"><span class="text-sm text-white/65">Título *</span><input id="deck-title" type="text" required class="input-premium w-full" placeholder="Ej: Automatización para Retail"></label> <label class="block space-y-1.5"><span class="text-sm text-white/65">Tipo de cliente</span><input id="deck-client" type="text" class="input-premium w-full" placeholder="Ej: Pyme, Corporación, Startup"></label> <label class="block space-y-1.5"><span class="text-sm text-white/65">Objetivo comercial</span><textarea id="deck-objective" rows="3" class="input-premium w-full resize-none" placeholder="Ej: Vender automatización de procesos comerciales"></textarea></label> <div class="flex flex-wrap gap-3"> <button type="button" id="deck-generate-ai" class="btn-primary px-5 py-3 text-sm">Generar con IA</button> <button type="button" id="deck-create-manual" class="btn-secondary px-5 py-3 text-sm">Crear vacío</button> </div> </form> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Mis pitch decks</h2> ${!hasDecks ? renderTemplate`<div class="mt-5 rounded-2xl border border-dashed border-white/10 bg-black/15 p-5 text-sm text-white/45">Aún no tienes pitch decks. Crea uno nuevo.</div>` : renderTemplate`<div class="mt-5 grid gap-3"> ${decks.map((deck) => {
    const sections = deck.sections ? JSON.parse(deck.sections) : [];
    const completed = sections.filter((s) => s.content).length;
    return renderTemplate`<a${addAttribute(`/premium/pitchdecks/${deck.id}`, "href")} class="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/30"> <div class="flex items-center justify-between"> <div> <p class="font-medium text-white">${deck.title}</p> <p class="mt-1 text-xs text-white/45">${deck.clientType || "Sin tipo"} · ${completed}/${sections.length} secciones</p> </div> <span class="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/50">${deck.status}</span> </div> </a>`;
  })} </div>`} </div> </section> ` })} ${renderScript($$result, "C:/Users/luiss/nexora-ai/src/pages/premium/pitchdecks.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/pitchdecks.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/pitchdecks.astro";
const $$url = "/premium/pitchdecks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pitchdecks,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
