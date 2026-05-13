import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_NsQSNwDU.mjs';
import { p as prisma } from './prisma_jaorxYCI.mjs';

const prerender = false;
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Settings;
  const user = Astro2.locals.user;
  const dbUser = user ? await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      name: true,
      email: true,
      role: true,
      isPremium: true,
      trialEndsAt: true
    }
  }) : null;
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Ajustes" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-100/70">Cuenta</p> <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">Ajustes de cuenta</h2> <p class="mt-3 max-w-3xl text-sm leading-relaxed text-white/55">
Revisa y gestiona la información de tu cuenta.
</p> </section> <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Perfil</h2> <dl class="mt-5 grid gap-4 text-sm"> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <dt class="text-white/38">Nombre</dt> <dd class="mt-1 text-white">${dbUser?.name ?? "—"}</dd> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <dt class="text-white/38">Email</dt> <dd class="mt-1 text-white">${dbUser?.email ?? "—"}</dd> </div> <div class="rounded-2xl border border-white/10 bg-black/20 p-4"> <dt class="text-white/38">Plan</dt> <dd class="mt-1 text-white"> ${dbUser?.isPremium ? "Premium" : dbUser?.trialEndsAt && /* @__PURE__ */ new Date() < dbUser.trialEndsAt ? "Trial" : "Free"} </dd> </div> </dl> </div> <div class="premium-panel p-5 md:p-6"> <h2 class="text-xl font-semibold text-white">Sesión</h2> <div class="mt-5 grid gap-4"> <div class="rounded-2xl border border-white/10 bg-black/20 p-5"> <p class="text-xs uppercase tracking-[0.16em] text-white/38">Acceso</p> <p class="mt-2 text-sm leading-relaxed text-white/55">
Tu sesión permanece activa mientras uses la plataforma. Puedes cerrarla en cualquier momento.
</p> </div> <form method="POST" action="/logout"> <button class="btn-primary w-full px-5 py-3 text-sm">
Cerrar sesión
</button> </form> </div> </div> </section> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/dashboard/settings.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/dashboard/settings.astro";
const $$url = "/dashboard/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
