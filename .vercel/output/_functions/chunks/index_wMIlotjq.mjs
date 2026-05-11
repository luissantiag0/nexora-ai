import { c as createComponent } from './astro-component_Dl_Jgkat.mjs';
import 'piccolore';
import { B as maybeRenderHead, T as renderTemplate } from './sequence_C_MYSd8d.mjs';
import { r as renderComponent } from './entrypoint_D_5yUKUO.mjs';
import { $ as $$BaseLayout } from './BaseLayout_D76Wmo3y.mjs';
import 'clsx';

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 border-b border-white/10 bg-[#07070A]/80 backdrop-blur-xl"> <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10"> <!-- LOGO --> <a href="/" class="text-lg font-semibold tracking-tight text-white">
NexoraAI
</a> <!-- NAV --> <nav class="hidden items-center gap-8 text-sm md:flex"> <a href="#services" class="text-white/50 transition hover:text-white">
Servicios
</a> <a href="#use-cases" class="text-white/50 transition hover:text-white">
Casos de uso
</a> <a href="#technology" class="text-white/50 transition hover:text-white">
Tecnología
</a> </nav> <!-- CTA --> <div class="flex items-center gap-3"> <button type="button" data-open-lead-modal aria-label="Abrir formulario de contacto" class="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98]">
Solicitar demo
</button> </div> </div> </header>`;
}, "C:/Users/luiss/nexora-ai/src/components/Navbar.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden pb-20 pt-16 md:pb-24 md:pt-24"> <!-- background glow --> <div class="pointer-events-none absolute inset-0"> <div class="absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div> </div> <div class="relative mx-auto max-w-7xl px-6 md:px-10"> <div class="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16"> <!-- LEFT --> <div> <span class="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/60">
Agencia de Automatización con IA
</span> <h1 class="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
Reduce costes operativos y escala tu negocio con sistemas de IA listos para producción
</h1> <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
Creamos sistemas de automatización con IA que eliminan tareas manuales, aceleran los procesos del negocio y permiten escalar la operación sin aumentar el equipo.
</p> <!-- CTA --> <div class="mt-10 flex flex-wrap gap-4"> <button type="button" data-open-lead-modal class="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">
Solicitar análisis gratuito
</button> <a href="#services" class="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-white">
Ver implementaciones
</a> </div> <p class="mt-5 text-sm text-white/40">
Diseñado para empresas que buscan resultados medibles, no experimentos con IA.
</p> </div> <!-- RIGHT CARD --> <div class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8 transition hover:border-white/20"> <p class="text-xs font-medium uppercase tracking-[0.14em] text-white/50">
Resultados esperados
</p> <ul class="mt-7 space-y-6"> <li class="border-b border-white/10 pb-6"> <p class="text-3xl font-semibold text-white md:text-4xl">-40%</p> <p class="mt-2 text-sm leading-relaxed text-white/60">
Reducción de carga de trabajo manual repetitiva
</p> </li> <li class="border-b border-white/10 pb-6"> <p class="text-3xl font-semibold text-white md:text-4xl">24/7</p> <p class="mt-2 text-sm leading-relaxed text-white/60">
Operación continua sin interrupciones en procesos clave
</p> </li> <li> <p class="text-3xl font-semibold text-white md:text-4xl">Escalable</p> <p class="mt-2 text-sm leading-relaxed text-white/60">
Arquitectura preparada para crecer sin aumentar equipo
</p> </li> </ul> </div> </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/Hero.astro", void 0);

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const services = [
    {
      title: "Sistemas de facturación con IA",
      description: "Reduce retrasos en pagos y carga administrativa automatizando la creación de facturas, recordatorios y conciliación de principio a fin."
    },
    {
      title: "Sistemas de conocimiento con RAG (chat con tus datos)",
      description: "Permite que los equipos obtengan respuestas instantáneas desde la información de la empresa, reduciendo cuellos de botella internos y acelerando la resolución de tareas."
    },
    {
      title: "Generación de ebooks con IA",
      description: "Convierte el conocimiento interno en sistemas de contenido escalables que aceleran la generación de leads y reducen los ciclos de producción."
    },
    {
      title: "Sistemas de automatización empresarial",
      description: "Automatiza flujos de trabajo entre equipos para eliminar tareas manuales, acelerar la ejecución y reducir costes operativos."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="services" class="border-t border-white/10 bg-[#07070A]"> <div class="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32"> <div class="max-w-3xl"> <span class="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/60">
Servicios
</span> <h2 class="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
Sistemas de IA diseñados para la ejecución empresarial
</h2> <p class="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
Construimos e implementamos sistemas de automatización enfocados en resultados reales: reducir costes, acelerar procesos y aumentar la productividad del equipo.
</p> </div> <div class="mt-14 grid gap-6 md:grid-cols-2"> ${services.map((service) => renderTemplate`<article class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"> <h3 class="text-xl font-semibold text-white"> ${service.title} </h3> <p class="mt-3 text-sm leading-relaxed text-white/60"> ${service.description} </p> </article>`)} </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/Services.astro", void 0);

const $$Features = createComponent(($$result, $$props, $$slots) => {
  const features = [
    {
      title: "Integración con OpenAI / modelos LLM",
      description: "Implementamos capacidades de IA fiables para tu negocio, con respuestas consistentes que apoyan la toma de decisiones diarias."
    },
    {
      title: "Pipelines RAG",
      description: "Transforma documentos dispersos en una capa de conocimiento centralizada para que los equipos encuentren respuestas más rápido y ejecuten mejor."
    },
    {
      title: "Flujos de automatización",
      description: "Automatiza procesos repetitivos en tu stack para reducir tiempos, eliminar tareas manuales y mantener el trabajo en movimiento."
    },
    {
      title: "Arquitectura SaaS escalable",
      description: "Construimos sistemas preparados para crecer con tu empresa sin perder rendimiento ni estabilidad."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="technology" class="border-t border-white/10 bg-[#07070A] py-24 md:py-28"> <div class="mx-auto max-w-7xl px-6 md:px-10"> <!-- HEADER --> <div class="max-w-3xl"> <span class="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/60">
Tecnología
</span> <h2 class="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
Construido con infraestructura moderna de IA
</h2> <p class="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
Nuestra tecnología está diseñada para convertir la IA en ejecución real de negocio, no en experimentos aislados.
</p> </div> <!-- GRID --> <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"> ${features.map((feature) => renderTemplate`<article class="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"> <!-- glow subtle effect --> <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"> <div class="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent"></div> </div> <h3 class="text-lg font-semibold text-white"> ${feature.title} </h3> <p class="mt-3 text-sm leading-relaxed text-white/60"> ${feature.description} </p> </article>`)} </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/Features.astro", void 0);

const $$UseCases = createComponent(($$result, $$props, $$slots) => {
  const useCases = [
    {
      title: "Negocios de ecommerce",
      description: "Automatiza la actualización del catálogo, las consultas de clientes y los flujos postventa para proteger márgenes y mejorar la velocidad de entrega."
    },
    {
      title: "Startups",
      description: "Permite a equipos reducidos ejecutar más con menos contrataciones automatizando operaciones repetitivas, reporting y procesos de atención al cliente."
    },
    {
      title: "Empresas (Enterprise)",
      description: "Estandariza la ejecución entre departamentos con sistemas de IA seguros que reducen fricción operativa y mejoran la consistencia de los procesos."
    },
    {
      title: "Restaurantes / negocios locales",
      description: "Automatiza reservas, comunicación con clientes, facturación y tareas administrativas diarias para liberar al equipo y centrarse en el servicio."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="use-cases" class="border-t border-white/10 bg-[#07070A]"> <div class="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32"> <div class="max-w-3xl"> <span class="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/60">
Casos de uso
</span> <h2 class="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
IA aplicada a los equipos que hacen funcionar tu negocio
</h2> <p class="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
Adaptamos sistemas de IA a los cuellos de botella específicos de cada industria para aumentar la productividad sin aumentar la complejidad operativa.
</p> </div> <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-2"> ${useCases.map((item) => renderTemplate`<article class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"> <h3 class="text-xl font-semibold text-white"> ${item.title} </h3> <p class="mt-3 text-sm leading-relaxed text-white/60"> ${item.description} </p> </article>`)} </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/UseCases.astro", void 0);

const $$CTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="relative border-t border-white/10 bg-gradient-to-b from-[#07070A] to-[#0B0F19] py-24 md:py-28"> <div class="mx-auto max-w-7xl px-6 md:px-10"> <div class="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md md:p-14"> <span class="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/60">
Empieza tu proyecto
</span> <h2 class="mx-auto mt-6 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
Convierte procesos manuales en ejecución escalable con IA
</h2> <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
Detectamos oportunidades de automatización con alto retorno y construimos sistemas de IA listos para producción en tu negocio.
</p> <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"> <button type="button" data-open-lead-modal class="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">
Solicitar análisis estratégico
</button> <a href="#services" class="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-white transition hover:bg-white/10">
Ver servicios
</a> </div> <p class="mt-6 text-sm text-white/40">
Sin presión comercial. Solo análisis enfocado en retorno de inversión.
</p> </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/CTA.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-white/10 bg-[#07070A] py-12"> <div class="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10"> <!-- LEFT --> <p class="text-sm text-white/40">
© ${(/* @__PURE__ */ new Date()).getFullYear()} NexoraAI. Todos los derechos reservados.
</p> <!-- RIGHT LINKS --> <div class="flex flex-wrap items-center gap-6 text-sm"> <a href="#services" class="text-white/50 transition hover:text-white">
Servicios
</a> <a href="#use-cases" class="text-white/50 transition hover:text-white">
Casos de uso
</a> <a href="#technology" class="text-white/50 transition hover:text-white">
Tecnología
</a> <a href="#contact" class="rounded-full border border-white/10 px-3 py-1 text-white/50 transition hover:bg-white/5 hover:text-white">
Contacto
</a> </div> </div> </footer>`;
}, "C:/Users/luiss/nexora-ai/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$LeadCaptureModal = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["<!-- LEAD MODAL -->", '<div id="lead-capture-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" aria-hidden="true" class="fixed inset-0 z-50 hidden items-center justify-center p-4"> <!-- Backdrop --> <div id="lead-modal-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> <!-- Panel --> <div id="lead-modal-panel" class="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0D1117] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-300" style="transform: translateY(16px); opacity: 0;"> <!-- FORM --> <div id="lead-modal-form-state"> <div class="border-b border-white/[0.07] px-6 py-5 md:px-8"> <h2 id="lead-modal-title" class="text-xl font-semibold text-white">\nCuéntanos qué quieres automatizar\n</h2> <p class="mt-2 text-sm text-white/50">\nDiseñamos un sistema de automatización adaptado a tu negocio.\n</p> </div> <form id="lead-capture-form" class="px-6 py-6 md:px-8" novalidate> <input type="hidden" id="lead-submitted-at" name="submittedAt"> <!-- NAME --> <div class="mb-4"> <label class="text-sm text-white/70">Nombre completo</label> <input name="fullName" class="lead-input w-full rounded-xl bg-white/5 p-3 text-white"> <p class="lead-field-error hidden text-xs text-red-400" data-error-for="fullName"></p> </div> <!-- EMAIL --> <div class="mb-4"> <label class="text-sm text-white/70">Email</label> <input name="email" class="lead-input w-full rounded-xl bg-white/5 p-3 text-white"> <p class="lead-field-error hidden text-xs text-red-400" data-error-for="email"></p> </div> <!-- COMPANY --> <div class="mb-4"> <label class="text-sm text-white/70">Empresa</label> <input name="companyName" class="lead-input w-full rounded-xl bg-white/5 p-3 text-white"> <p class="lead-field-error hidden text-xs text-red-400" data-error-for="companyName"></p> </div> <!-- MESSAGE --> <div class="mb-4"> <label class="text-sm text-white/70">Qué necesitas automatizar</label> <textarea name="message" rows="4" class="lead-input w-full rounded-xl bg-white/5 p-3 text-white"></textarea> <p class="lead-field-error hidden text-xs text-red-400" data-error-for="message"></p> </div> <!-- ERROR --> <div id="lead-error-banner" class="hidden mb-3 rounded-xl bg-red-500/10 p-3 text-red-300"> <p id="lead-error-message"></p> </div> <!-- BUTTON --> <button id="lead-submit-btn" type="submit" class="w-full rounded-xl bg-white px-6 py-3 font-semibold text-black"> <span id="lead-submit-label">Solicitar llamada</span> <span id="lead-submit-spinner" class="hidden">⏳</span> </button> </form> </div> <!-- SUCCESS --> <div id="lead-modal-success-state" class="hidden p-10 text-center text-white"> <h3 class="text-xl font-semibold">Solicitud enviada</h3> <p class="mt-2 text-white/60">\nTe contactaremos en menos de 24 horas.\n</p> <button type="button" data-close-lead-modal class="mt-6 rounded-xl border border-white/10 px-5 py-2">\nCerrar\n</button> </div> </div> </div> <script>\n(function () {\n\n  if (window.__leadModalInitialized) return;\n  window.__leadModalInitialized = true;\n\n  const modal = document.getElementById("lead-capture-modal");\n  const form = document.getElementById("lead-capture-form");\n  const panel = document.getElementById("lead-modal-panel");\n  const backdrop = document.getElementById("lead-modal-backdrop");\n\n  const submitBtn = document.getElementById("lead-submit-btn");\n  const submitLabel = document.getElementById("lead-submit-label");\n  const submitSpinner = document.getElementById("lead-submit-spinner");\n\n  const formState = document.getElementById("lead-modal-form-state");\n  const successState = document.getElementById("lead-modal-success-state");\n\n  const errorBanner = document.getElementById("lead-error-banner");\n  const errorMessage = document.getElementById("lead-error-message");\n\n  const submittedAtInput = document.getElementById("lead-submitted-at");\n\n  if (!modal || !form) return;\n\n  let isLoading = false;\n\n  // OPEN MODAL\n  function showModal() {\n    submittedAtInput.value = Date.now();\n\n    formState.classList.remove("hidden");\n    successState.classList.add("hidden");\n\n    modal.classList.remove("hidden");\n    modal.classList.add("flex");\n\n    document.body.style.overflow = "hidden";\n\n    requestAnimationFrame(() => {\n      panel.style.opacity = "1";\n      panel.style.transform = "translateY(0)";\n    });\n  }\n\n  // CLOSE MODAL\n  function hideModal() {\n    modal.classList.add("hidden");\n    modal.classList.remove("flex");\n    document.body.style.overflow = "";\n  }\n\n  function setLoading(state) {\n    isLoading = state;\n    submitBtn.disabled = state;\n    submitLabel.textContent = state ? "Enviando..." : "Solicitar llamada";\n    submitSpinner.classList.toggle("hidden", !state);\n  }\n\n  function showError(msg) {\n    errorMessage.textContent = msg;\n    errorBanner.classList.remove("hidden");\n  }\n\n  function hideError() {\n    errorBanner.classList.add("hidden");\n  }\n\n  function clearErrors() {\n    document.querySelectorAll(".lead-field-error").forEach(e => {\n      e.classList.add("hidden");\n    });\n  }\n\n  // CLICK HANDLER\n  document.addEventListener("click", (e) => {\n    const open = e.target.closest("[data-open-lead-modal]");\n    const close = e.target.closest("[data-close-lead-modal]");\n\n    if (open) {\n      e.preventDefault();\n      e.stopPropagation();\n      showModal();\n    }\n\n    if (close) {\n      hideModal();\n    }\n  });\n\n  backdrop.addEventListener("click", hideModal);\n\n  document.addEventListener("keydown", (e) => {\n    if (e.key === "Escape") hideModal();\n  });\n\n  // SUBMIT\n  form.addEventListener("submit", async (e) => {\n    e.preventDefault();\n    if (isLoading) return;\n\n    clearErrors();\n    hideError();\n\n    const fd = new FormData(form);\n\n    const fullName = fd.get("fullName")?.toString().trim() || "";\n    const email = fd.get("email")?.toString().trim() || "";\n    const companyName = fd.get("companyName")?.toString().trim() || "";\n    const message = fd.get("message")?.toString().trim() || "";\n\n    if (!fullName || !email || !companyName || !message) {\n      showError("Rellena todos los campos");\n      return;\n    }\n\n    setLoading(true);\n\n    try {\n      const res = await fetch("/api/lead", {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify({ fullName, email, companyName, message })\n      });\n\n      if (!res.ok) throw new Error("Error");\n\n      formState.classList.add("hidden");\n      successState.classList.remove("hidden");\n\n      form.reset();\n\n      setTimeout(() => {\n        hideModal();\n      }, 1500);\n\n    } catch (err) {\n      showError("Error enviando el formulario");\n    } finally {\n      setLoading(false);\n    }\n  });\n\n})();\n<\/script>'])), maybeRenderHead());
}, "C:/Users/luiss/nexora-ai/src/components/LeadCaptureModal.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "NexoraAI | Sistemas de automatización con IA para empresas modernas", "description": "NexoraAI desarrolla sistemas de automatización con IA, plataformas RAG, aplicaciones de facturación con IA, generación de ebooks y soluciones SaaS personalizadas." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Services", $$Services, {})} ${renderComponent($$result2, "Features", $$Features, {})} ${renderComponent($$result2, "UseCases", $$UseCases, {})} ${renderComponent($$result2, "CTA", $$CTA, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ${renderComponent($$result2, "LeadCaptureModal", $$LeadCaptureModal, {})} ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/index.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
