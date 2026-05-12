import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, F as Fragment, a4 as addAttribute } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_WKm3_OPm.mjs';
import { $ as $$PremiumLayout } from './PremiumLayout_BQahDiSz.mjs';
import { a as ADMIN_SESSION_DURATION_SECONDS } from './session_-AL8X7ha.mjs';
import { p as prisma } from './prisma_JAVnBMvn.mjs';

const prerender = false;
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Settings;
  const user = Astro2.locals.user;
  const minutes = Math.round(ADMIN_SESSION_DURATION_SECONDS / 60);
  const dbUser = user ? await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
      isPremium: true,
      premiumSince: true
    }
  }) : null;
  const subStatus = dbUser?.subscriptionStatus;
  const periodEnd = dbUser?.subscriptionCurrentPeriodEnd;
  !!dbUser?.stripeCustomerId;
  const statusLabel = {
    active: "Activa",
    trialing: "Prueba",
    past_due: "Vencida",
    canceled: "Cancelada",
    unpaid: "No pagada",
    incomplete: "Incompleta",
    incomplete_expired: "Expirada"
  };
  const statusColor = {
    active: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    trialing: "text-cyan-300 border-cyan-300/20 bg-cyan-300/10",
    past_due: "text-amber-300 border-amber-400/20 bg-amber-400/10",
    canceled: "text-white/40 border-white/10 bg-white/[0.04]",
    unpaid: "text-red-300 border-red-400/20 bg-red-400/10"
  };
  return renderTemplate`${renderComponent($$result, "PremiumLayout", $$PremiumLayout, { "title": "Ajustes" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Cuenta y facturación</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Ajustes premium</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">
Revisa el estado de tu suscripción, gestión de pagos y controles de sesión.
</p> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Cuenta</h2> <dl class="mt-5 grid gap-4 text-sm"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <dt class="text-white/38">Email</dt> <dd class="mt-1 text-white">${user?.email ?? "No disponible"}</dd> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <dt class="text-white/38">Rol</dt> <dd class="mt-1 text-white">${user?.role ?? "client"}</dd> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <dt class="text-white/38">Premium</dt> <dd class="mt-1 text-white"> ${subStatus === "active" || subStatus === "trialing" || user?.role === "admin" ? "Activo" : "Inactivo"} </dd> </div> </dl> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Suscripción</h2> <div class="mt-5 grid gap-4"> ${dbUser?.isPremium && subStatus === "active" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="rounded-2xl border border-white/10 bg-black/20 p-5"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Estado</p> <p class="mt-2"> <span${addAttribute(`inline-block rounded-full border px-3 py-1 text-xs font-medium ${statusColor[subStatus] || "text-white/40 border-white/10 bg-white/[0.04]"}`, "class")}> ${statusLabel[subStatus] || subStatus} </span> </p> </div> ${periodEnd && renderTemplate`<div class="rounded-2xl border border-white/10 bg-black/20 p-5"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Próxima renovación</p> <p class="mt-2 text-sm text-white"> ${periodEnd.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </p> </div>`}<form method="POST" action="/api/stripe/customer-portal"> <button type="submit" class="btn-primary w-full px-5 py-3 text-sm">
Gestionar suscripción
</button> </form> <p class="text-xs leading-relaxed text-white/38">
Abre el portal de Stripe para cambiar método de pago, descargar
              facturas o cancelar tu suscripción.
</p> ` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="rounded-2xl border border-white/10 bg-black/20 p-5"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Estado</p> <p class="mt-2"> <span class="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/40">
Sin suscripción activa
</span> </p> </div> <a${addAttribute(user?.isPremium ? "/premium/dashboard" : "/upgrade", "href")} class="btn-primary w-full justify-center px-5 py-3 text-sm text-center"> ${user?.isPremium ? "Ir al dashboard" : "Ver planes"} </a> ` })}`} </div> </div> </section> <section class="mt-8 premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Seguridad SSR</h2> <div class="mt-5 grid gap-4"> <div class="rounded-2xl border border-white/10 bg-black/20 p-5"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Ventana de acceso</p> <p class="mt-2 text-3xl font-semibold text-cyan-100">${minutes} min</p> <p class="mt-3 text-sm leading-relaxed text-white/55">
El acceso a paneles protegidos caduca en servidor y se invalida junto con la cookie de sesión.
</p> </div> <form method="POST" action="/admin"> <input type="hidden" name="intent" value="logout"> <button class="btn-primary px-5 py-3 text-sm">Cerrar sesión</button> </form> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/premium/settings.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/settings.astro";
const $$url = "/premium/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
