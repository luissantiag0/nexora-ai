import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, D as renderSlot } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CL1qtBP8.mjs';
import { $ as $$Navbar, a as $$Footer } from './Footer_B-WwcvkF.mjs';

const $$LegalLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LegalLayout;
  const {
    title,
    description,
    heading,
    eyebrow = "Legal",
    updated = "12 de mayo de 2026"
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${title} | NexoraAI`, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="min-h-screen bg-[#07070A]"> <section class="border-b border-white/10 px-6 py-16 md:px-10 md:py-22"> <div class="mx-auto max-w-4xl"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70"> ${eyebrow} </p> <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl"> ${heading} </h1> <p class="mt-5 text-sm text-white/45">
Última actualización: ${updated} </p> </div> </section> <article class="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16"> <div class="legal-content"> ${renderSlot($$result2, $$slots["default"])} </div> </article> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/luiss/nexora-ai/src/layouts/LegalLayout.astro", void 0);

export { $$LegalLayout as $ };
