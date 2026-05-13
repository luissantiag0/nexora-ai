import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CL1qtBP8.mjs';
import { $ as $$BrandLogo } from './BrandLogo_CC7uiFi3.mjs';
import { getCurrentUser, loginUser } from './auth_BZvm-TfZ.mjs';
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
  const existingSession = Astro2.cookies.get(SESSION_COOKIE)?.value;
  if (Astro2.request.method === "GET" && await getCurrentUser(existingSession)) {
    return Astro2.redirect("/dashboard");
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const result = await loginUser(email, password);
    if (!result) {
      error = "Credenciales incorrectas.";
    } else {
      Astro2.cookies.set(
        SESSION_COOKIE,
        result.token,
        sessionCookieConfig
      );
      return Astro2.redirect("/dashboard");
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Iniciar sesión | NexoraAI", "description": "Accede a tu panel NexoraAI" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<main class="grid min-h-screen place-items-center bg-[#07070A] px-6 py-16"> <section class="w-full max-w-md"> <div class="premium-panel animated-border p-7 md:p-8"> ', ' <div class="mt-10"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-200/75">\nAcceso usuarios\n</p> <h1 class="mt-3 text-3xl font-semibold tracking-tight text-white">\nIniciar sesión\n</h1> <p class="mt-3 text-sm leading-relaxed text-white/50">\nEntra a tu panel para gestionar leads, informes y automatizaciones.\n</p> </div> ', ' <form method="POST" class="mt-7 space-y-4" data-login-form> <label class="block space-y-2"> <span class="text-sm text-white/65">Email</span> <input type="email" name="email" autocomplete="email" required placeholder="tu@email.com" class="input-premium w-full"> </label> <label class="block space-y-2"> <span class="text-sm text-white/65">Contraseña</span> <input type="password" name="password" autocomplete="current-password" required placeholder="••••••••" class="input-premium w-full"> </label> <button class="btn-primary w-full py-3.5">\nEntrar al panel\n</button> </form> <p class="mt-6 text-center text-sm text-white/40">\n¿No tienes cuenta?', ' <a href="/register" class="text-cyan-200 underline decoration-cyan-300/35 underline-offset-4 transition hover:text-white">\nCrear cuenta gratis\n</a> </p> </div> </section> </main> <script>\n    (() => {\n      const form = document.querySelector("[data-login-form]");\n\n      form?.addEventListener("submit", () => {\n        const button = form.querySelector("button");\n\n        if (button) {\n          button.disabled = true;\n          button.textContent = "Entrando...";\n          button.classList.add("opacity-75");\n        }\n      });\n    })();\n  <\/script> '])), maybeRenderHead(), renderComponent($$result2, "BrandLogo", $$BrandLogo, { "label": "NexoraAI", "markClass": "h-8 w-8", "textClass": "text-sm text-white/70" }), error && renderTemplate`<div class="mt-6 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"> ${error} </div>`, " ") })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/login.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
