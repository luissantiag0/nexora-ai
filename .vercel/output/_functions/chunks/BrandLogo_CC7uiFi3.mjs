import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { B as maybeRenderHead, a4 as addAttribute, T as renderTemplate } from './sequence_CpdTfaFG.mjs';
import 'clsx';

const $$BrandLogo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BrandLogo;
  const {
    href = "/",
    label = "NexoraAI",
    showText = true,
    markClass = "h-9 w-9",
    textClass = "text-lg",
    class: className = ""
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(`group inline-flex items-center gap-3 font-semibold tracking-tight text-white transition duration-300 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070A] ${className}`, "class")}${addAttribute(label, "aria-label")}> <span${addAttribute(`grid shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-white/[0.035] p-1.5 shadow-[0_16px_42px_-28px_rgba(34,211,238,0.95)] ring-1 ring-white/[0.03] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan-300/45 group-hover:bg-cyan-300/10 ${markClass}`, "class")}> <img src="/logo-nexora.png"${addAttribute(showText ? "" : label, "alt")}${addAttribute(showText ? "true" : "false", "aria-hidden")} width="139" height="120" loading="eager" decoding="async" class="h-full w-full object-contain"> </span> ${showText && renderTemplate`<span${addAttribute(textClass, "class")}> ${label} </span>`} </a>`;
}, "C:/Users/luiss/nexora-ai/src/components/BrandLogo.astro", void 0);

export { $$BrandLogo as $ };
