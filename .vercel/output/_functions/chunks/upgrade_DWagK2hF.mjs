import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { r as renderScript } from './script_ROfGK1vk.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CL1qtBP8.mjs';
import { $ as $$Navbar, a as $$Footer } from './Footer_B-WwcvkF.mjs';
import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentAdmin } from './auth_BZvm-TfZ.mjs';

const prerender = false;
const $$Upgrade = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Upgrade;
  const token = Astro2.cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentAdmin(token);
  const isLoggedIn = !!user;
  const isPremium = user?.isPremium === true || user?.role === "admin" || user?.role === "owner";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Premium | NexoraAI", "description": "Activa NexoraAI Premium y desbloquea todas las herramientas de automatización con IA." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="min-h-screen bg-[#07070A]"> <section class="container py-20 md:py-28"> <div class="mx-auto max-w-3xl text-center"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">
Pricing
</p> <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
Elige tu plan
</h1> <p class="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
Empieza gratis y escala cuando lo necesites. Todos los planes incluyen
          acceso SSR seguro y datos en tiempo real.
</p> </div> <div class="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2"> <!-- Free Plan --> <div class="premium-panel p-6 md:p-8"> <h2 class="text-2xl font-semibold text-white">Free</h2> <p class="mt-2 text-sm text-white/50">
Para explorar la plataforma
</p> <p class="mt-6"> <span class="text-5xl font-bold text-white">$0</span> <span class="text-sm text-white/40">/mes</span> </p> <ul class="mt-8 grid gap-3 text-sm" role="list"> <li class="flex items-start gap-3 text-white/70"> <span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-center text-[10px] leading-4 text-emerald-300">&#10003;</span>
Leads básicos
</li> <li class="flex items-start gap-3 text-white/70"> <span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-center text-[10px] leading-4 text-emerald-300">&#10003;</span>
Panel CRM
</li> <li class="flex items-start gap-3 text-white/40"> <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 text-[10px] text-white/40">&mdash;</span>
Ebooks IA
</li> <li class="flex items-start gap-3 text-white/40"> <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 text-[10px] text-white/40">&mdash;</span>
Pitch decks automáticos
</li> <li class="flex items-start gap-3 text-white/40"> <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 text-[10px] text-white/40">&mdash;</span>
Informes avanzados
</li> <li class="flex items-start gap-3 text-white/40"> <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 text-[10px] text-white/40">&mdash;</span>
SEO Swarm
</li> </ul> <div class="mt-8"> ${isLoggedIn ? renderTemplate`<a href="/premium/dashboard" class="btn-secondary w-full justify-center text-center"> ${isPremium ? "Ir al panel" : "Tu plan actual"} </a>` : renderTemplate`<a href="/admin/login" class="btn-secondary w-full justify-center text-center">
Empezar gratis
</a>`} </div> </div> <!-- Premium Plan --> <div class="premium-panel relative overflow-hidden border-cyan-300/30 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(255,255,255,0.04)_48%,rgba(16,185,129,0.1))] p-6 shadow-[0_26px_95px_-58px_rgba(34,211,238,0.9)] md:p-8"> <div class="absolute right-4 top-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-cyan-200">
Recomendado
</div> <h2 class="text-2xl font-semibold text-white">Premium</h2> <p class="mt-2 text-sm text-white/50">
Para equipos y automatización avanzada
</p> <p class="mt-6"> <span class="text-5xl font-bold text-white">$29</span> <span class="text-sm text-white/40">/mes</span> </p> <ul class="mt-8 grid gap-3 text-sm" role="list"> <li class="flex items-start gap-3 text-white/70"> <span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-center text-[10px] leading-4 text-emerald-300">&#10003;</span>
Todo lo de Free
</li> <li class="flex items-start gap-3 text-white/70"> <span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-center text-[10px] leading-4 text-emerald-300">&#10003;</span>
Ebooks IA ilimitados
</li> <li class="flex items-start gap-3 text-white/70"> <span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-center text-[10px] leading-4 text-emerald-300">&#10003;</span>
Pitch decks automáticos
</li> <li class="flex items-start gap-3 text-white/70"> <span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-center text-[10px] leading-4 text-emerald-300">&#10003;</span>
Informes avanzados
</li> <li class="flex items-start gap-3 text-white/70"> <span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-center text-[10px] leading-4 text-emerald-300">&#10003;</span>
SEO Swarm
</li> <li class="flex items-start gap-3 text-white/70"> <span class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-center text-[10px] leading-4 text-emerald-300">&#10003;</span>
Soporte prioritario
</li> </ul> <div class="mt-8"> ${isLoggedIn && isPremium ? renderTemplate`<a href="/premium/dashboard" class="btn-primary w-full justify-center text-center">
Ir al panel premium
</a>` : isLoggedIn ? renderTemplate`<button type="button" data-checkout-trigger class="btn-primary w-full justify-center text-center">
Suscribirse ahora
</button>` : renderTemplate`<a href="/admin/login" class="btn-primary w-full justify-center text-center">
Iniciar sesión
</a>`} </div> </div> </div> <p class="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-white/38">
Cancelación en cualquier momento. Pago seguro procesado por Stripe.
        Tus datos se mantienen cifrados y protegidos bajo estándares bancarios.
</p> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} ${renderScript($$result, "C:/Users/luiss/nexora-ai/src/pages/upgrade.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/luiss/nexora-ai/src/pages/upgrade.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/upgrade.astro";
const $$url = "/upgrade";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Upgrade,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
