import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$BaseLayout } from './BaseLayout_CL1qtBP8.mjs';
import { $ as $$BrandLogo } from './BrandLogo_CC7uiFi3.mjs';
import { getCurrentUser, registerUser } from './auth_DO-wdbiw.mjs';
import { S as SESSION_COOKIE, s as sessionCookieConfig } from './session_-AL8X7ha.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Register;
  let errors = [];
  const existingSession = Astro2.cookies.get(SESSION_COOKIE)?.value;
  if (Astro2.request.method === "GET" && await getCurrentUser(existingSession)) {
    return Astro2.redirect("/dashboard");
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    if (!name || name.length < 2) {
      errors.push("El nombre debe tener al menos 2 caracteres.");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Email inválido.");
    }
    if (!password || password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres.");
    }
    if (password !== confirmPassword) {
      errors.push("Las contraseñas no coinciden.");
    }
    if (errors.length === 0) {
      try {
        const result = await registerUser(name, email, password);
        Astro2.cookies.set(
          SESSION_COOKIE,
          result.token,
          sessionCookieConfig
        );
        return Astro2.redirect("/dashboard");
      } catch (error) {
        if (error instanceof Error && error.message === "EMAIL_TAKEN") {
          errors.push("Este email ya está registrado. Inicia sesión.");
        } else {
          console.error("[register] Error:", error);
          errors.push("Error al crear la cuenta. Intenta de nuevo.");
        }
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Crear cuenta | NexoraAI", "description": "Regístrate gratis y prueba NexoraAI Premium durante 30 minutos." }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<main class="grid min-h-screen place-items-center bg-[#07070A] px-6 py-16"> <section class="w-full max-w-md"> <div class="premium-panel animated-border p-7 md:p-8"> ', ' <div class="mt-10"> <p class="text-xs uppercase tracking-[0.18em] text-cyan-200/75">\nRegistro\n</p> <h1 class="mt-3 text-3xl font-semibold tracking-tight text-white">\nCrear cuenta gratis\n</h1> <p class="mt-3 text-sm leading-relaxed text-white/50">\nRecibe 30 minutos de acceso premium automático. Sin tarjeta, sin compromiso.\n</p> </div> ', ' <form method="POST" class="mt-7 space-y-4" data-register-form> <label class="block space-y-2"> <span class="text-sm text-white/65">Nombre</span> <input type="text" name="name" autocomplete="name" required minlength="2" placeholder="Tu nombre" class="input-premium w-full"> </label> <label class="block space-y-2"> <span class="text-sm text-white/65">Email</span> <input type="email" name="email" autocomplete="email" required placeholder="tu@email.com" class="input-premium w-full"> </label> <label class="block space-y-2"> <span class="text-sm text-white/65">Contraseña</span> <input type="password" name="password" autocomplete="new-password" required minlength="6" placeholder="Mínimo 6 caracteres" class="input-premium w-full"> </label> <label class="block space-y-2"> <span class="text-sm text-white/65">Confirmar contraseña</span> <input type="password" name="confirmPassword" autocomplete="new-password" required minlength="6" placeholder="Repite la contraseña" class="input-premium w-full"> </label> <button class="btn-primary w-full py-3.5">\nCrear cuenta y empezar\n</button> </form> <p class="mt-6 text-center text-sm text-white/40">\n¿Ya tienes cuenta?', ' <a href="/login" class="text-cyan-200 underline decoration-cyan-300/35 underline-offset-4 transition hover:text-white">\nIniciar sesión\n</a> </p> </div> </section> </main> <script>\n    (() => {\n      const form = document.querySelector("[data-register-form]");\n\n      form?.addEventListener("submit", () => {\n        const button = form.querySelector("button");\n\n        if (button) {\n          button.disabled = true;\n          button.textContent = "Creando cuenta...";\n          button.classList.add("opacity-75");\n        }\n      });\n    })();\n  <\/script> '])), maybeRenderHead(), renderComponent($$result2, "BrandLogo", $$BrandLogo, { "label": "NexoraAI", "markClass": "h-8 w-8", "textClass": "text-sm text-white/70" }), errors.length > 0 && renderTemplate`<div class="mt-6 space-y-2 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"> ${errors.map((err) => renderTemplate`<p>${err}</p>`)} </div>`, " ") })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/register.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
