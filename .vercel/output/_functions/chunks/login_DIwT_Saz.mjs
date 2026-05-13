import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CL1qtBP8.mjs';
import { $ as $$BrandLogo } from './BrandLogo_CC7uiFi3.mjs';
import { getCurrentAdmin, userIsAdmin, loginAdmin } from './auth_BZvm-TfZ.mjs';
import { S as SESSION_COOKIE, s as sessionCookieConfig } from './session_-AL8X7ha.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  let error = "";
  const expiredSession = Astro2.url.searchParams.get("expired") === "1";
  const existingSession = Astro2.cookies.get(SESSION_COOKIE)?.value;
  if (Astro2.request.method === "GET") {
    const existingUser = await getCurrentAdmin(existingSession);
    if (existingUser) {
      if (userIsAdmin(existingUser)) {
        return Astro2.redirect("/admin");
      }
      return Astro2.redirect("/dashboard");
    }
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const result = await loginAdmin(email, password);
    if (!result) {
      error = "Credenciales incorrectas.";
    } else {
      Astro2.cookies.set(
        SESSION_COOKIE,
        result.token,
        sessionCookieConfig
      );
      return Astro2.redirect("/admin");
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Login Admin | NexoraAI", "description": "Acceso interno CRM NexoraAI" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<main class="grid min-h-screen place-items-center bg-[#07070A] px-6 py-16"> <section class="w-full max-w-md"> <div class="premium-panel animated-border p-7 md:p-8"> ', ' <div class="mt-10"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-200/75">\nAcceso seguro\n</p> <h1 class="mt-3 text-3xl font-semibold tracking-tight text-white">\nLogin Admin\n</h1> <p class="mt-3 text-sm leading-relaxed text-white/50">\nEntra para gestionar leads, pipeline, notas y seguimiento comercial.\n</p> </div> ', " ", ' <form method="POST" class="mt-7 space-y-4" data-login-form> <label class="block space-y-2"> <span class="text-sm text-white/65">Email</span> <input type="email" name="email" autocomplete="email" required placeholder="admin@nexora.ai" class="input-premium w-full"> </label> <label class="block space-y-2"> <span class="text-sm text-white/65">Contraseña</span> <input type="password" name="password" autocomplete="current-password" required placeholder="••••••••" class="input-premium w-full"> </label> <button class="btn-primary w-full py-3.5">\nEntrar al panel\n</button> </form> </div> </section> </main> <script>\n    (() => {\n      const form = document.querySelector("[data-login-form]");\n\n      form?.addEventListener("submit", () => {\n        const button = form.querySelector("button");\n\n        if (button) {\n          button.disabled = true;\n          button.textContent = "Entrando...";\n          button.classList.add("opacity-75");\n        }\n      });\n    })();\n  <\/script> '])), maybeRenderHead(), renderComponent($$result2, "BrandLogo", $$BrandLogo, { "label": "NexoraAI CRM", "markClass": "h-8 w-8", "textClass": "text-sm text-white/70" }), error && renderTemplate`<div class="mt-6 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"> ${error} </div>`, !error && expiredSession && renderTemplate`<div class="mt-6 rounded-xl border border-amber-300/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
Tu sesión de prueba ha caducado después de 30 minutos. Inicia sesión de nuevo para continuar.
</div>`) })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
