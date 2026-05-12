import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { B as maybeRenderHead, T as renderTemplate, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_WKm3_OPm.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CL1qtBP8.mjs';
import { $ as $$Navbar, a as $$Footer } from './Footer_B023ByGI.mjs';
import 'clsx';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const signals = [
    { label: "Ahorro operativo", value: "-40%" },
    { label: "Lead response", value: "2 min" },
    { label: "Flujos activos", value: "24/7" }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden border-b border-white/10 pb-20 pt-16 md:pb-24 md:pt-24"> <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"></div> <div class="absolute inset-0 -z-10 bg-[linear-gradient(140deg,rgba(34,211,238,0.08),transparent_34%),linear-gradient(40deg,transparent_35%,rgba(16,185,129,0.07),transparent_62%)]"></div> <div class="container"> <div class="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"> <div data-reveal> <span class="badge bg-cyan-300/10 text-cyan-100">
Agencia de Automatización con IA
</span> <h1 class="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
Reduce costes operativos y escala tu negocio con sistemas de IA listos para producción
</h1> <p class="mt-6 max-w-2xl text-base leading-relaxed text-white/62 md:text-lg">
Creamos automatizaciones con IA, RAG y flujos internos que convierten procesos lentos en ejecución medible sin aumentar equipo.
</p> <div class="mt-9 flex flex-wrap gap-4"> <a href="/register" class="btn-primary">
Probar gratis
</a> <button type="button" data-open-lead-modal class="btn-secondary">
Solicitar análisis gratuito
</button> <a href="#services" class="btn-secondary">
Ver implementaciones
</a> </div> <div class="mt-8 grid max-w-xl grid-cols-3 gap-3"> ${signals.map((signal) => renderTemplate`<div class="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-white/[0.06]"> <p class="text-2xl font-semibold text-white">${signal.value}</p> <p class="mt-1 text-xs leading-relaxed text-white/45">${signal.label}</p> </div>`)} </div> </div> <div class="relative" data-reveal> <div class="premium-panel animated-border p-5 md:p-6 motion-soft"> <div class="flex items-center justify-between border-b border-white/10 pb-4"> <div> <p class="text-xs uppercase tracking-[0.18em] text-cyan-200/70">
Nexora Control Layer
</p> <h2 class="mt-2 text-xl font-semibold text-white">
Automatizaciones en producción
</h2> </div> <div class="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
Live
</div> </div> <div class="mt-5 grid gap-4"> <div class="rounded-2xl border border-white/10 bg-black/25 p-4"> <div class="flex items-center justify-between"> <p class="text-sm font-medium text-white">Lead intake</p> <span class="h-2 w-20 overflow-hidden rounded-full bg-white/10"> <span class="block h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"></span> </span> </div> <div class="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 text-xs text-white/55"> <span class="rounded-xl bg-white/[0.04] px-3 py-2">Formulario</span> <span class="text-cyan-200">→</span> <span class="rounded-xl bg-white/[0.04] px-3 py-2">CRM</span> <span class="text-cyan-200">→</span> <span class="rounded-xl bg-white/[0.04] px-3 py-2">Email</span> </div> </div> <div class="grid gap-4 sm:grid-cols-2"> <div class="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/30"> <p class="text-xs text-white/45">Tiempo recuperado</p> <p class="mt-2 text-3xl font-semibold text-white">18h</p> <p class="mt-2 text-xs text-emerald-200">por semana</p> </div> <div class="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-purple-300/30"> <p class="text-xs text-white/45">Tareas automatizadas</p> <p class="mt-2 text-3xl font-semibold text-white">1.248</p> <p class="mt-2 text-xs text-cyan-200">últimos 30 días</p> </div> </div> <div class="rounded-2xl border border-white/10 bg-black/25 p-4"> <div class="flex items-center justify-between text-sm"> <span class="text-white/70">Siguiente acción sugerida</span> <span class="text-emerald-200">Alta confianza</span> </div> <p class="mt-3 text-sm leading-relaxed text-white/80">
Priorizar leads con intención alta y enviar propuesta personalizada en menos de 24 horas.
</p> </div> </div> </div> </div> </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/Hero.astro", void 0);

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const services = [
    {
      title: "Sistemas de facturación con IA",
      description: "Reduce retrasos en pagos y carga administrativa automatizando facturas, recordatorios y conciliación de principio a fin."
    },
    {
      title: "Sistemas de conocimiento con RAG",
      description: "Permite que los equipos obtengan respuestas instantáneas desde la información de la empresa y resuelvan tareas más rápido."
    },
    {
      title: "Generación de ebooks con IA",
      description: "Convierte conocimiento interno en sistemas de contenido escalables para captar leads sin ciclos de producción pesados."
    },
    {
      title: "Automatización empresarial",
      description: "Conecta herramientas, equipos y decisiones para eliminar tareas manuales y mantener el trabajo avanzando."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="services" class="border-t border-white/10 bg-[#07070A]"> <div class="container py-24 md:py-32"> <div class="max-w-3xl" data-reveal> <span class="badge bg-cyan-300/10 text-cyan-100">
Servicios
</span> <h2 class="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
Sistemas de IA diseñados para ejecución empresarial
</h2> <p class="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
Implementamos automatizaciones enfocadas en resultados reales: reducir costes, acelerar procesos y aumentar la productividad del equipo.
</p> </div> <div class="mt-14 grid gap-6 md:grid-cols-2"> ${services.map((service) => renderTemplate`<article class="interactive-card group" data-reveal> <div class="mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-purple-300 opacity-70 transition duration-300 group-hover:w-24 group-hover:opacity-100"></div> <h3 class="text-xl font-semibold text-white"> ${service.title} </h3> <p class="mt-3 text-sm leading-relaxed text-white/60"> ${service.description} </p> </article>`)} </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/Services.astro", void 0);

const $$Features = createComponent(($$result, $$props, $$slots) => {
  const features = [
    {
      title: "LLM integrados",
      description: "Capacidades de IA fiables para ejecutar decisiones repetibles, no respuestas improvisadas."
    },
    {
      title: "Pipelines RAG",
      description: "Documentos, SOPs y conocimiento interno convertidos en una capa de consulta útil para equipos."
    },
    {
      title: "Flujos automatizados",
      description: "Automatizaciones entre herramientas para reducir tiempos muertos y mantener el trabajo en movimiento."
    },
    {
      title: "Arquitectura SaaS",
      description: "Sistemas preparados para crecer con tu operación sin perder rendimiento ni estabilidad."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="technology" class="border-t border-white/10 bg-[#07070A] py-24 md:py-28"> <div class="container"> <div class="max-w-3xl" data-reveal> <span class="badge bg-purple-300/10 text-purple-100">
Tecnología
</span> <h2 class="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
Infraestructura moderna para IA aplicada
</h2> <p class="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
Diseñamos sistemas que conectan modelos, datos y procesos internos para convertir la IA en ejecución diaria.
</p> </div> <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4"> ${features.map((feature, index) => renderTemplate`<article class="interactive-card group" data-reveal> <div class="mb-6 flex items-center justify-between"> <span class="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-sm text-cyan-100 transition group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10">
0${index + 1} </span> <span class="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent"></span> </div> <h3 class="text-lg font-semibold text-white"> ${feature.title} </h3> <p class="mt-3 text-sm leading-relaxed text-white/60"> ${feature.description} </p> </article>`)} </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/Features.astro", void 0);

const $$UseCases = createComponent(($$result, $$props, $$slots) => {
  const useCases = [
    {
      title: "Ecommerce",
      description: "Actualización de catálogo, consultas de clientes y flujos postventa para proteger margen y velocidad."
    },
    {
      title: "Startups",
      description: "Operaciones repetitivas, reporting y soporte automatizado para ejecutar más sin aumentar estructura."
    },
    {
      title: "Empresas",
      description: "Estandarización entre departamentos con sistemas seguros, medibles y fáciles de adoptar."
    },
    {
      title: "Negocios locales",
      description: "Reservas, comunicación, facturación y tareas administrativas diarias con menos fricción."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="use-cases" class="border-t border-white/10 bg-[#07070A]"> <div class="container py-24 md:py-32"> <div class="max-w-3xl" data-reveal> <span class="badge bg-emerald-300/10 text-emerald-100">
Casos de uso
</span> <h2 class="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
IA aplicada a los equipos que hacen funcionar tu negocio
</h2> <p class="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
Adaptamos sistemas de IA a cuellos de botella específicos para aumentar productividad sin añadir complejidad operativa.
</p> </div> <div class="mt-14 grid gap-6 md:grid-cols-2"> ${useCases.map((item) => renderTemplate`<article class="interactive-card group flex min-h-48 flex-col justify-between" data-reveal> <div> <div class="mb-5 flex items-center gap-3"> <span class="h-px w-8 bg-emerald-300/70"></span> <span class="text-xs uppercase tracking-[0.16em] text-white/40">Aplicación</span> </div> <h3 class="text-xl font-semibold text-white"> ${item.title} </h3> <p class="mt-3 text-sm leading-relaxed text-white/60"> ${item.description} </p> </div> <button type="button" data-open-lead-modal class="mt-6 w-fit text-sm font-semibold text-cyan-100 transition group-hover:translate-x-1">
Explorar caso →
</button> </article>`)} </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/UseCases.astro", void 0);

const $$FAQ = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      question: "¿Qué es NexoraAI?",
      answer: "NexoraAI es una plataforma para gestionar leads, automatizar seguimiento y usar IA en procesos comerciales sin añadir complejidad al equipo."
    },
    {
      question: "¿Cómo funciona?",
      answer: "Recoge solicitudes desde tus formularios, las organiza en un CRM interno y te ayuda a priorizar cada oportunidad con estados, notas y seguimiento claro."
    },
    {
      question: "¿Qué ventajas tiene frente a un CRM tradicional?",
      answer: "Está pensado para actuar, no solo para almacenar contactos: combina captación, pipeline, alertas, notas y automatización en un flujo más ágil."
    },
    {
      question: "¿Qué incluye el plan gratuito?",
      answer: "Incluye un análisis inicial para detectar oportunidades de automatización y entender cómo NexoraAI puede ayudarte a gestionar mejor tus leads."
    },
    {
      question: "¿Cómo se gestionan los leads?",
      answer: "Cada lead se guarda en el panel, puede cambiar de estado, recibir notas internas y avanzar por el pipeline para que no se pierda ninguna oportunidad."
    },
    {
      question: "¿Necesito conocimientos técnicos?",
      answer: "No. El panel está diseñado para que cualquier persona pueda revisar leads, actualizar estados y dar seguimiento sin depender de un equipo técnico."
    },
    {
      question: "¿Cómo protege NexoraAI mis datos?",
      answer: "Usa autenticación de administrador, sesiones seguras y una base de datos privada para que la información comercial quede protegida y controlada."
    },
    {
      question: "¿Puedo cancelar cuando quiera?",
      answer: "Sí. La idea es que NexoraAI se adapte a tu operación, no que te ate a procesos rígidos. Puedes pausar o cancelar el servicio cuando lo necesites."
    },
    {
      question: "¿Qué diferencia NexoraAI de otros CRM?",
      answer: "NexoraAI une CRM, automatización e IA en una experiencia más enfocada a velocidad comercial, seguimiento real y reducción de trabajo manual."
    },
    {
      question: "¿Para qué tipo de negocios sirve?",
      answer: "Funciona especialmente bien para empresas, startups, servicios profesionales y negocios que reciben leads y necesitan responder con más rapidez."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="faq" class="relative border-t border-white/10 bg-[#07070A] py-24 md:py-32" data-astro-cid-al2ca2vr> <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" data-astro-cid-al2ca2vr></div> <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.11),transparent_28rem),radial-gradient(circle_at_82%_45%,rgba(16,185,129,0.08),transparent_30rem)]" data-astro-cid-al2ca2vr></div> <div class="container" data-astro-cid-al2ca2vr> <div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start" data-astro-cid-al2ca2vr> <div class="lg:sticky lg:top-28" data-reveal data-astro-cid-al2ca2vr> <span class="badge bg-cyan-300/10 text-cyan-100" data-astro-cid-al2ca2vr>
Preguntas frecuentes
</span> <h2 class="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-white md:text-5xl" data-astro-cid-al2ca2vr>
Dudas claras antes de dar el siguiente paso
</h2> <p class="mt-5 max-w-lg text-base leading-relaxed text-white/60 md:text-lg" data-astro-cid-al2ca2vr>
Resolvemos lo esencial sobre NexoraAI, la gestión de leads y cómo empezar sin fricción.
</p> <div class="premium-panel animated-border mt-8 p-5" data-astro-cid-al2ca2vr> <p class="text-sm font-medium text-white" data-astro-cid-al2ca2vr>
¿Quieres verlo aplicado a tu negocio?
</p> <p class="mt-2 text-sm leading-relaxed text-white/55" data-astro-cid-al2ca2vr>
Solicita un análisis gratuito y recibe una visión clara de qué procesos puedes automatizar primero.
</p> <button type="button" data-open-lead-modal class="btn-primary mt-5 w-full sm:w-auto" data-astro-cid-al2ca2vr>
Solicitar análisis gratuito
</button> </div> </div> <div class="grid gap-4" data-astro-cid-al2ca2vr> ${faqs.map((item, index) => renderTemplate`<details class="faq-item interactive-card group p-0" data-reveal${addAttribute(index === 0, "open")} data-astro-cid-al2ca2vr> <summary class="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left md:px-6" data-astro-cid-al2ca2vr> <span class="text-base font-semibold leading-snug text-white md:text-lg" data-astro-cid-al2ca2vr> ${item.question} </span> <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-xl leading-none text-cyan-100 transition duration-300 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10 group-open:rotate-45" data-astro-cid-al2ca2vr>
+
</span> </summary> <div class="faq-answer px-5 pb-5 md:px-6 md:pb-6" data-astro-cid-al2ca2vr> <div class="h-px w-full bg-gradient-to-r from-cyan-300/30 via-white/10 to-transparent" data-astro-cid-al2ca2vr></div> <p class="mt-4 max-w-2xl text-sm leading-relaxed text-white/62 md:text-base" data-astro-cid-al2ca2vr> ${item.answer} </p> </div> </details>`)} </div> </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/FAQ.astro", void 0);

const $$CTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="relative border-t border-white/10 bg-[#07070A] py-24 md:py-28"> <div class="container"> <div class="premium-panel animated-border mx-auto max-w-5xl p-8 text-center md:p-14" data-reveal> <span class="badge bg-emerald-300/10 text-emerald-100">
Empieza tu proyecto
</span> <h2 class="mx-auto mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
Convierte procesos manuales en ejecución escalable con IA
</h2> <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
Detectamos automatizaciones de alto retorno y construimos sistemas listos para producción: CRM, RAG, reporting, facturación y operaciones internas.
</p> <div class="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"> <button type="button" data-open-lead-modal class="btn-primary">
Solicitar análisis estratégico
</button> <a href="#services" class="btn-secondary">
Ver servicios
</a> </div> <div class="mt-8 grid gap-3 text-left sm:grid-cols-3"> <div class="rounded-2xl border border-white/10 bg-white/[0.035] p-4"> <p class="text-sm font-medium text-white">Diagnóstico</p> <p class="mt-1 text-xs leading-relaxed text-white/45">Mapa de oportunidades y fricción operativa.</p> </div> <div class="rounded-2xl border border-white/10 bg-white/[0.035] p-4"> <p class="text-sm font-medium text-white">Plan técnico</p> <p class="mt-1 text-xs leading-relaxed text-white/45">Stack, integración y estimación de impacto.</p> </div> <div class="rounded-2xl border border-white/10 bg-white/[0.035] p-4"> <p class="text-sm font-medium text-white">Ejecución</p> <p class="mt-1 text-xs leading-relaxed text-white/45">Entrega orientada a producción y medición.</p> </div> </div> </div> </div> </section>`;
}, "C:/Users/luiss/nexora-ai/src/components/CTA.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$LeadCaptureModal = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div id="lead-capture-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" aria-hidden="true" class="fixed inset-0 z-50 hidden items-center justify-center p-4"> <div id="lead-modal-backdrop" class="absolute inset-0 bg-black/70 opacity-0 backdrop-blur-xl transition-opacity duration-300"></div> <div id="lead-modal-panel" class="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#090C12]/95 shadow-[0_30px_90px_-35px_rgba(34,211,238,0.7)] ring-1 ring-white/[0.04] transition duration-300" style="transform: translateY(18px) scale(0.98); opacity: 0;"> <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"></div> <div id="lead-modal-form-state"> <div class="border-b border-white/[0.08] px-6 py-5 md:px-8"> <div class="flex items-start justify-between gap-5"> <div> <p class="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200/80">\nAnálisis gratuito\n</p> <h2 id="lead-modal-title" class="mt-3 text-2xl font-semibold tracking-tight text-white">\nCuéntanos qué quieres automatizar\n</h2> <p class="mt-2 text-sm leading-relaxed text-white/55">\nRevisamos tu flujo actual y te respondemos con oportunidades claras de automatización.\n</p> </div> <button type="button" data-close-lead-modal aria-label="Cerrar formulario" class="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-xl leading-none text-white/60 transition hover:border-white/25 hover:bg-white/10 hover:text-white">\n×\n</button> </div> </div> <form id="lead-capture-form" class="space-y-4 px-6 py-6 md:px-8" novalidate> <input type="hidden" id="lead-submitted-at" name="submittedAt"> <div class="hidden" aria-hidden="true"> <label>\nWeb\n<input tabindex="-1" autocomplete="off" name="companyWebsite"> </label> </div> <div class="grid gap-4 sm:grid-cols-2"> <label class="space-y-2"> <span class="text-sm text-white/70">Nombre completo</span> <input name="fullName" autocomplete="name" class="lead-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="Tu nombre"> <span class="lead-field-error hidden text-xs text-red-300" data-error-for="fullName"></span> </label> <label class="space-y-2"> <span class="text-sm text-white/70">Email</span> <input type="email" name="email" autocomplete="email" class="lead-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="tu@email.com"> <span class="lead-field-error hidden text-xs text-red-300" data-error-for="email"></span> </label> </div> <label class="block space-y-2"> <span class="text-sm text-white/70">Empresa</span> <input name="companyName" autocomplete="organization" class="lead-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="Nombre de tu empresa"> <span class="lead-field-error hidden text-xs text-red-300" data-error-for="companyName"></span> </label> <label class="block space-y-2"> <span class="text-sm text-white/70">Qué necesitas automatizar</span> <textarea name="message" rows="4" class="lead-input w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="Cuéntanos el proceso, herramienta o cuello de botella..."></textarea> <span class="lead-field-error hidden text-xs text-red-300" data-error-for="message"></span> </label> <div id="lead-error-banner" class="hidden rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"> <p id="lead-error-message"></p> </div> <button id="lead-submit-btn" type="submit" class="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-3.5 font-semibold text-black shadow-[0_18px_55px_-26px_rgba(255,255,255,0.9)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-24px_rgba(34,211,238,0.9)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"> <span class="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent transition duration-700 group-hover:translate-x-[120%]"></span> <span id="lead-submit-label" class="relative">Solicitar llamada</span> <span id="lead-submit-spinner" class="relative ml-3 hidden h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black"></span> </button> <p class="text-center text-xs text-white/35">\nTu solicitud se enviará directamente al equipo de NexoraAI.\n</p> </form> </div> <div id="lead-modal-success-state" class="hidden px-8 py-12 text-center"> <div class="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">\n✓\n</div> <h3 class="mt-6 text-2xl font-semibold text-white">\nSolicitud enviada\n</h3> <p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">\nHemos recibido tu información. Te contactaremos en menos de 24 horas.\n</p> <button type="button" data-close-lead-modal class="mt-7 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10">\nCerrar\n</button> </div> </div> </div> <script>\n(() => {\n  if (window.__leadModalInitialized) return;\n  window.__leadModalInitialized = true;\n\n  const modal = document.getElementById("lead-capture-modal");\n  const form = document.getElementById("lead-capture-form");\n  const panel = document.getElementById("lead-modal-panel");\n  const backdrop = document.getElementById("lead-modal-backdrop");\n  const submitBtn = document.getElementById("lead-submit-btn");\n  const submitLabel = document.getElementById("lead-submit-label");\n  const submitSpinner = document.getElementById("lead-submit-spinner");\n  const formState = document.getElementById("lead-modal-form-state");\n  const successState = document.getElementById("lead-modal-success-state");\n  const errorBanner = document.getElementById("lead-error-banner");\n  const errorMessage = document.getElementById("lead-error-message");\n  const submittedAtInput = document.getElementById("lead-submitted-at");\n\n  if (!modal || !form || !panel || !backdrop) return;\n\n  let isLoading = false;\n  let lastFocusedElement = null;\n\n  const setSubmittedAt = () => {\n    if (submittedAtInput) submittedAtInput.value = String(Date.now());\n  };\n\n  const openModal = () => {\n    lastFocusedElement = document.activeElement;\n    setSubmittedAt();\n    hideError();\n    clearErrors();\n    formState.classList.remove("hidden");\n    successState.classList.add("hidden");\n    modal.classList.remove("hidden");\n    modal.classList.add("flex");\n    modal.setAttribute("aria-hidden", "false");\n    document.body.style.overflow = "hidden";\n\n    requestAnimationFrame(() => {\n      backdrop.style.opacity = "1";\n      panel.style.opacity = "1";\n      panel.style.transform = "translateY(0) scale(1)";\n      form.querySelector("input[name=\'fullName\']")?.focus();\n    });\n  };\n\n  const closeModal = () => {\n    if (isLoading) return;\n    backdrop.style.opacity = "0";\n    panel.style.opacity = "0";\n    panel.style.transform = "translateY(18px) scale(0.98)";\n\n    window.setTimeout(() => {\n      modal.classList.add("hidden");\n      modal.classList.remove("flex");\n      modal.setAttribute("aria-hidden", "true");\n      document.body.style.overflow = "";\n      lastFocusedElement?.focus?.();\n    }, 220);\n  };\n\n  const setLoading = (state) => {\n    isLoading = state;\n    submitBtn.disabled = state;\n    submitLabel.textContent = state ? "Enviando..." : "Solicitar llamada";\n    submitSpinner.classList.toggle("hidden", !state);\n  };\n\n  function showError(message) {\n    errorMessage.textContent = message;\n    errorBanner.classList.remove("hidden");\n  }\n\n  function hideError() {\n    errorBanner.classList.add("hidden");\n    errorMessage.textContent = "";\n  }\n\n  function clearErrors() {\n    form.querySelectorAll(".lead-field-error").forEach((item) => {\n      item.textContent = "";\n      item.classList.add("hidden");\n    });\n\n    form.querySelectorAll(".lead-input").forEach((item) => {\n      item.classList.remove("border-red-300/60", "ring-4", "ring-red-300/10");\n    });\n  }\n\n  function setFieldError(name, message) {\n    const field = form.querySelector(`[name="${name}"]`);\n    const target = form.querySelector(`[data-error-for="${name}"]`);\n\n    if (field) {\n      field.classList.add("border-red-300/60", "ring-4", "ring-red-300/10");\n    }\n\n    if (target) {\n      target.textContent = message;\n      target.classList.remove("hidden");\n    }\n  }\n\n  const validate = (values) => {\n    const errors = {};\n    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n\n    if (!values.fullName) errors.fullName = "Indica tu nombre.";\n    if (!values.email) errors.email = "Indica tu email.";\n    if (values.email && !emailPattern.test(values.email)) errors.email = "Introduce un email válido.";\n    if (!values.companyName) errors.companyName = "Indica tu empresa.";\n    if (!values.message) errors.message = "Cuéntanos qué necesitas automatizar.";\n\n    return errors;\n  };\n\n  document.addEventListener("click", (event) => {\n    const openTrigger = event.target.closest("[data-open-lead-modal]");\n    const closeTrigger = event.target.closest("[data-close-lead-modal]");\n\n    if (openTrigger) {\n      event.preventDefault();\n      event.stopImmediatePropagation();\n      openModal();\n      return;\n    }\n\n    if (closeTrigger) {\n      event.preventDefault();\n      closeModal();\n    }\n  });\n\n  backdrop.addEventListener("click", closeModal);\n\n  document.addEventListener("keydown", (event) => {\n    if (event.key === "Escape" && !modal.classList.contains("hidden")) {\n      closeModal();\n    }\n  });\n\n  form.addEventListener("submit", async (event) => {\n    event.preventDefault();\n    if (isLoading) return;\n\n    clearErrors();\n    hideError();\n\n    const formData = new FormData(form);\n    const values = {\n      fullName: String(formData.get("fullName") || "").trim(),\n      email: String(formData.get("email") || "").trim(),\n      companyName: String(formData.get("companyName") || "").trim(),\n      message: String(formData.get("message") || "").trim(),\n      companyWebsite: String(formData.get("companyWebsite") || "").trim(),\n      submittedAt: Number(formData.get("submittedAt") || Date.now()),\n    };\n\n    const errors = validate(values);\n    const errorEntries = Object.entries(errors);\n\n    if (errorEntries.length) {\n      errorEntries.forEach(([name, message]) => setFieldError(name, message));\n      showError("Revisa los campos marcados.");\n      return;\n    }\n\n    setLoading(true);\n\n    try {\n      const response = await fetch("/api/leads/create", {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          "Accept": "application/json",\n        },\n        body: JSON.stringify(values),\n      });\n\n      const result = await response.json().catch(() => ({}));\n\n      if (!response.ok || result.success === false) {\n        throw new Error(result.message || "No se pudo enviar el formulario.");\n      }\n\n      form.reset();\n      formState.classList.add("hidden");\n      successState.classList.remove("hidden");\n\n      window.setTimeout(closeModal, 2200);\n    } catch (error) {\n      showError(error.message || "Error enviando el formulario. Inténtalo de nuevo.");\n    } finally {\n      setLoading(false);\n      setSubmittedAt();\n    }\n  });\n})();\n<\/script>'], ["", '<div id="lead-capture-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" aria-hidden="true" class="fixed inset-0 z-50 hidden items-center justify-center p-4"> <div id="lead-modal-backdrop" class="absolute inset-0 bg-black/70 opacity-0 backdrop-blur-xl transition-opacity duration-300"></div> <div id="lead-modal-panel" class="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#090C12]/95 shadow-[0_30px_90px_-35px_rgba(34,211,238,0.7)] ring-1 ring-white/[0.04] transition duration-300" style="transform: translateY(18px) scale(0.98); opacity: 0;"> <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"></div> <div id="lead-modal-form-state"> <div class="border-b border-white/[0.08] px-6 py-5 md:px-8"> <div class="flex items-start justify-between gap-5"> <div> <p class="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200/80">\nAnálisis gratuito\n</p> <h2 id="lead-modal-title" class="mt-3 text-2xl font-semibold tracking-tight text-white">\nCuéntanos qué quieres automatizar\n</h2> <p class="mt-2 text-sm leading-relaxed text-white/55">\nRevisamos tu flujo actual y te respondemos con oportunidades claras de automatización.\n</p> </div> <button type="button" data-close-lead-modal aria-label="Cerrar formulario" class="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-xl leading-none text-white/60 transition hover:border-white/25 hover:bg-white/10 hover:text-white">\n×\n</button> </div> </div> <form id="lead-capture-form" class="space-y-4 px-6 py-6 md:px-8" novalidate> <input type="hidden" id="lead-submitted-at" name="submittedAt"> <div class="hidden" aria-hidden="true"> <label>\nWeb\n<input tabindex="-1" autocomplete="off" name="companyWebsite"> </label> </div> <div class="grid gap-4 sm:grid-cols-2"> <label class="space-y-2"> <span class="text-sm text-white/70">Nombre completo</span> <input name="fullName" autocomplete="name" class="lead-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="Tu nombre"> <span class="lead-field-error hidden text-xs text-red-300" data-error-for="fullName"></span> </label> <label class="space-y-2"> <span class="text-sm text-white/70">Email</span> <input type="email" name="email" autocomplete="email" class="lead-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="tu@email.com"> <span class="lead-field-error hidden text-xs text-red-300" data-error-for="email"></span> </label> </div> <label class="block space-y-2"> <span class="text-sm text-white/70">Empresa</span> <input name="companyName" autocomplete="organization" class="lead-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="Nombre de tu empresa"> <span class="lead-field-error hidden text-xs text-red-300" data-error-for="companyName"></span> </label> <label class="block space-y-2"> <span class="text-sm text-white/70">Qué necesitas automatizar</span> <textarea name="message" rows="4" class="lead-input w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10" placeholder="Cuéntanos el proceso, herramienta o cuello de botella..."></textarea> <span class="lead-field-error hidden text-xs text-red-300" data-error-for="message"></span> </label> <div id="lead-error-banner" class="hidden rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"> <p id="lead-error-message"></p> </div> <button id="lead-submit-btn" type="submit" class="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-3.5 font-semibold text-black shadow-[0_18px_55px_-26px_rgba(255,255,255,0.9)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-24px_rgba(34,211,238,0.9)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"> <span class="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent transition duration-700 group-hover:translate-x-[120%]"></span> <span id="lead-submit-label" class="relative">Solicitar llamada</span> <span id="lead-submit-spinner" class="relative ml-3 hidden h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black"></span> </button> <p class="text-center text-xs text-white/35">\nTu solicitud se enviará directamente al equipo de NexoraAI.\n</p> </form> </div> <div id="lead-modal-success-state" class="hidden px-8 py-12 text-center"> <div class="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">\n✓\n</div> <h3 class="mt-6 text-2xl font-semibold text-white">\nSolicitud enviada\n</h3> <p class="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">\nHemos recibido tu información. Te contactaremos en menos de 24 horas.\n</p> <button type="button" data-close-lead-modal class="mt-7 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10">\nCerrar\n</button> </div> </div> </div> <script>\n(() => {\n  if (window.__leadModalInitialized) return;\n  window.__leadModalInitialized = true;\n\n  const modal = document.getElementById("lead-capture-modal");\n  const form = document.getElementById("lead-capture-form");\n  const panel = document.getElementById("lead-modal-panel");\n  const backdrop = document.getElementById("lead-modal-backdrop");\n  const submitBtn = document.getElementById("lead-submit-btn");\n  const submitLabel = document.getElementById("lead-submit-label");\n  const submitSpinner = document.getElementById("lead-submit-spinner");\n  const formState = document.getElementById("lead-modal-form-state");\n  const successState = document.getElementById("lead-modal-success-state");\n  const errorBanner = document.getElementById("lead-error-banner");\n  const errorMessage = document.getElementById("lead-error-message");\n  const submittedAtInput = document.getElementById("lead-submitted-at");\n\n  if (!modal || !form || !panel || !backdrop) return;\n\n  let isLoading = false;\n  let lastFocusedElement = null;\n\n  const setSubmittedAt = () => {\n    if (submittedAtInput) submittedAtInput.value = String(Date.now());\n  };\n\n  const openModal = () => {\n    lastFocusedElement = document.activeElement;\n    setSubmittedAt();\n    hideError();\n    clearErrors();\n    formState.classList.remove("hidden");\n    successState.classList.add("hidden");\n    modal.classList.remove("hidden");\n    modal.classList.add("flex");\n    modal.setAttribute("aria-hidden", "false");\n    document.body.style.overflow = "hidden";\n\n    requestAnimationFrame(() => {\n      backdrop.style.opacity = "1";\n      panel.style.opacity = "1";\n      panel.style.transform = "translateY(0) scale(1)";\n      form.querySelector("input[name=\'fullName\']")?.focus();\n    });\n  };\n\n  const closeModal = () => {\n    if (isLoading) return;\n    backdrop.style.opacity = "0";\n    panel.style.opacity = "0";\n    panel.style.transform = "translateY(18px) scale(0.98)";\n\n    window.setTimeout(() => {\n      modal.classList.add("hidden");\n      modal.classList.remove("flex");\n      modal.setAttribute("aria-hidden", "true");\n      document.body.style.overflow = "";\n      lastFocusedElement?.focus?.();\n    }, 220);\n  };\n\n  const setLoading = (state) => {\n    isLoading = state;\n    submitBtn.disabled = state;\n    submitLabel.textContent = state ? "Enviando..." : "Solicitar llamada";\n    submitSpinner.classList.toggle("hidden", !state);\n  };\n\n  function showError(message) {\n    errorMessage.textContent = message;\n    errorBanner.classList.remove("hidden");\n  }\n\n  function hideError() {\n    errorBanner.classList.add("hidden");\n    errorMessage.textContent = "";\n  }\n\n  function clearErrors() {\n    form.querySelectorAll(".lead-field-error").forEach((item) => {\n      item.textContent = "";\n      item.classList.add("hidden");\n    });\n\n    form.querySelectorAll(".lead-input").forEach((item) => {\n      item.classList.remove("border-red-300/60", "ring-4", "ring-red-300/10");\n    });\n  }\n\n  function setFieldError(name, message) {\n    const field = form.querySelector(\\`[name="\\${name}"]\\`);\n    const target = form.querySelector(\\`[data-error-for="\\${name}"]\\`);\n\n    if (field) {\n      field.classList.add("border-red-300/60", "ring-4", "ring-red-300/10");\n    }\n\n    if (target) {\n      target.textContent = message;\n      target.classList.remove("hidden");\n    }\n  }\n\n  const validate = (values) => {\n    const errors = {};\n    const emailPattern = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;\n\n    if (!values.fullName) errors.fullName = "Indica tu nombre.";\n    if (!values.email) errors.email = "Indica tu email.";\n    if (values.email && !emailPattern.test(values.email)) errors.email = "Introduce un email válido.";\n    if (!values.companyName) errors.companyName = "Indica tu empresa.";\n    if (!values.message) errors.message = "Cuéntanos qué necesitas automatizar.";\n\n    return errors;\n  };\n\n  document.addEventListener("click", (event) => {\n    const openTrigger = event.target.closest("[data-open-lead-modal]");\n    const closeTrigger = event.target.closest("[data-close-lead-modal]");\n\n    if (openTrigger) {\n      event.preventDefault();\n      event.stopImmediatePropagation();\n      openModal();\n      return;\n    }\n\n    if (closeTrigger) {\n      event.preventDefault();\n      closeModal();\n    }\n  });\n\n  backdrop.addEventListener("click", closeModal);\n\n  document.addEventListener("keydown", (event) => {\n    if (event.key === "Escape" && !modal.classList.contains("hidden")) {\n      closeModal();\n    }\n  });\n\n  form.addEventListener("submit", async (event) => {\n    event.preventDefault();\n    if (isLoading) return;\n\n    clearErrors();\n    hideError();\n\n    const formData = new FormData(form);\n    const values = {\n      fullName: String(formData.get("fullName") || "").trim(),\n      email: String(formData.get("email") || "").trim(),\n      companyName: String(formData.get("companyName") || "").trim(),\n      message: String(formData.get("message") || "").trim(),\n      companyWebsite: String(formData.get("companyWebsite") || "").trim(),\n      submittedAt: Number(formData.get("submittedAt") || Date.now()),\n    };\n\n    const errors = validate(values);\n    const errorEntries = Object.entries(errors);\n\n    if (errorEntries.length) {\n      errorEntries.forEach(([name, message]) => setFieldError(name, message));\n      showError("Revisa los campos marcados.");\n      return;\n    }\n\n    setLoading(true);\n\n    try {\n      const response = await fetch("/api/leads/create", {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/json",\n          "Accept": "application/json",\n        },\n        body: JSON.stringify(values),\n      });\n\n      const result = await response.json().catch(() => ({}));\n\n      if (!response.ok || result.success === false) {\n        throw new Error(result.message || "No se pudo enviar el formulario.");\n      }\n\n      form.reset();\n      formState.classList.add("hidden");\n      successState.classList.remove("hidden");\n\n      window.setTimeout(closeModal, 2200);\n    } catch (error) {\n      showError(error.message || "Error enviando el formulario. Inténtalo de nuevo.");\n    } finally {\n      setLoading(false);\n      setSubmittedAt();\n    }\n  });\n})();\n<\/script>'])), maybeRenderHead());
}, "C:/Users/luiss/nexora-ai/src/components/LeadCaptureModal.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "NexoraAI | Sistemas de automatización con IA para empresas modernas", "description": "NexoraAI desarrolla sistemas de automatización con IA, plataformas RAG, aplicaciones de facturación con IA, generación de ebooks y soluciones SaaS personalizadas." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "Services", $$Services, {})} ${renderComponent($$result2, "Features", $$Features, {})} ${renderComponent($$result2, "UseCases", $$UseCases, {})} ${renderComponent($$result2, "FAQ", $$FAQ, {})} ${renderComponent($$result2, "CTA", $$CTA, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ${renderComponent($$result2, "LeadCaptureModal", $$LeadCaptureModal, {})} ` })}`;
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
