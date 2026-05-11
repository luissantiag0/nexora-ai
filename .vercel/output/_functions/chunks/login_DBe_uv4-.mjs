import { c as createComponent } from './astro-component_Dl_Jgkat.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_C_MYSd8d.mjs';
import { r as renderComponent } from './entrypoint_D_5yUKUO.mjs';
import { $ as $$BaseLayout } from './BaseLayout_D76Wmo3y.mjs';
import { u as ui } from './uiClasses_Bu9-IoKB.mjs';
import { l as loginAdmin, S as SESSION_COOKIE, s as sessionCookieConfig } from './auth_C9y5BevA.mjs';

const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  let error = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = String(
      formData.get("email") || ""
    );
    const password = String(
      formData.get("password") || ""
    );
    const result = await loginAdmin(
      email,
      password
    );
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Login Admin", "description": "Acceso CRM" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main${addAttribute(ui.section, "class")}> <div class="mx-auto max-w-md"> <h1 class="text-3xl font-semibold text-white">
Login Admin
</h1> <p class="mt-2 text-white/60">
Acceso interno NexoraAI
</p> ${error && renderTemplate`<p class="mt-5 text-red-400"> ${error} </p>`} <form method="POST" class="mt-8 space-y-4"> <input type="email" name="email" placeholder="Email" class="w-full rounded-xl bg-white/5 p-4 text-white"> <input type="password" name="password" placeholder="Contraseña" class="w-full rounded-xl bg-white/5 p-4 text-white"> <button class="w-full rounded-xl bg-white py-4 text-black">
Entrar
</button> </form> </div> </main> ` })}`;
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
