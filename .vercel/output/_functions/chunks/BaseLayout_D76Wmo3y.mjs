import { c as createComponent } from './astro-component_Dl_Jgkat.mjs';
import 'piccolore';
import { T as renderTemplate, D as renderSlot, bb as renderHead, a4 as addAttribute } from './sequence_C_MYSd8d.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "NexoraAI | AI Automation Agency",
    description = "NexoraAI builds AI automation systems, RAG platforms, AI invoicing tools, ebook generation systems, and custom SaaS solutions for modern businesses."
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description"', '><meta name="theme-color" content="#07070A"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image">', '</head> <body class="min-h-screen bg-[#07070A] text-white antialiased selection:bg-cyan-300/20 selection:text-cyan-100"> ', ' <script>\n      if (window.__modalInit) return;\n      window.__modalInit = true;\n\n      console.log("GLOBAL MODAL SCRIPT LOADED");\n\n      function getModal() {\n        return document.getElementById("lead-capture-modal");\n      }\n\n      function getPanel() {\n        return document.getElementById("lead-modal-panel");\n      }\n\n      function showModal() {\n        const modal = getModal();\n        const panel = getPanel();\n\n        if (!modal || !panel) return;\n\n        // reset estado SIEMPRE al abrir\n        panel.style.transition = "none";\n        panel.style.opacity = "0";\n        panel.style.transform = "translateY(16px)";\n\n        modal.classList.remove("hidden");\n        modal.classList.add("flex");\n        modal.setAttribute("aria-hidden", "false");\n\n        document.body.style.overflow = "hidden";\n\n        requestAnimationFrame(() => {\n          panel.style.transition = "transform 280ms ease, opacity 280ms ease";\n          panel.style.opacity = "1";\n          panel.style.transform = "translateY(0)";\n        });\n      }\n\n      function hideModal() {\n        const modal = getModal();\n        const panel = getPanel();\n\n        if (!modal || !panel) return;\n\n        panel.style.transition = "transform 200ms ease, opacity 200ms ease";\n        panel.style.opacity = "0";\n        panel.style.transform = "translateY(16px)";\n\n        setTimeout(() => {\n          modal.classList.add("hidden");\n          modal.classList.remove("flex");\n          modal.setAttribute("aria-hidden", "true");\n          document.body.style.overflow = "";\n        }, 200);\n      }\n\n      document.addEventListener("click", (e) => {\n        const openTrigger = e.target.closest("[data-open-lead-modal]");\n        const closeTrigger = e.target.closest("[data-close-lead-modal]");\n\n        if (openTrigger) {\n          e.preventDefault();\n          showModal();\n          return;\n        }\n\n        if (closeTrigger) {\n          hideModal();\n          return;\n        }\n      });\n    <\/script> </body> </html>'])), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/luiss/nexora-ai/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
