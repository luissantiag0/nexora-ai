import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import './sequence_CpdTfaFG.mjs';
import 'clsx';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  return Astro2.redirect("/premium/dashboard");
}, "C:/Users/luiss/nexora-ai/src/pages/premium/index.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/premium/index.astro";
const $$url = "/premium";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
