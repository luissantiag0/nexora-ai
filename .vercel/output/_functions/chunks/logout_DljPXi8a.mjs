import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import './sequence_CpdTfaFG.mjs';
import 'clsx';
import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser, logoutUser } from './auth_BZvm-TfZ.mjs';

const prerender = false;
const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Logout;
  const token = Astro2.cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (user) {
    await logoutUser(user.id);
  }
  Astro2.cookies.delete(SESSION_COOKIE, { path: "/" });
  return Astro2.redirect("/");
}, "C:/Users/luiss/nexora-ai/src/pages/logout.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
