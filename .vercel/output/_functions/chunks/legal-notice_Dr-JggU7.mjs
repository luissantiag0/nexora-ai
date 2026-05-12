import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint__iTNmQ7m.mjs';
import { $ as $$LegalLayout } from './LegalLayout_Mkhom3U5.mjs';

const $$LegalNotice = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LegalLayout", $$LegalLayout, { "title": "Aviso legal", "heading": "Aviso legal", "description": "Aviso legal de NexoraAI para sitio web, paneles y servicios digitales." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>
Este aviso regula la información general del sitio web y el uso básico de los contenidos publicados por NexoraAI.
</p> <h2>1. Identificación</h2> <p>
El sitio web y los servicios asociados son operados bajo la marca NexoraAI. Para comunicaciones legales, de privacidad o seguridad, puedes escribir a <a href="mailto:legal@nexora.ai">legal@nexora.ai</a>.
</p> <h2>2. Objeto del sitio</h2> <p>
El sitio presenta servicios de automatización, IA aplicada, sistemas SaaS, CRM, generación de contenido, soluciones RAG y consultoría tecnológica.
</p> <h2>3. Condiciones de acceso</h2> <p>
El acceso público al sitio es gratuito salvo costes de conexión del usuario. Las áreas privadas, paneles premium o servicios contratados pueden requerir autenticación, permisos específicos y pago.
</p> <h2>4. Propiedad intelectual e industrial</h2> <p>
Los textos, diseños, interfaz, marca, logotipo, componentes, código, documentación y materiales del sitio pertenecen a NexoraAI o a sus licenciantes, salvo indicación expresa en contrario.
</p> <h2>5. Responsabilidad del usuario</h2> <p>
El usuario se compromete a utilizar el sitio de forma diligente, lícita y respetuosa con derechos de terceros. Queda prohibido dañar sistemas, intentar accesos no autorizados o explotar vulnerabilidades.
</p> <h2>6. Enlaces externos</h2> <p>
El sitio puede incluir enlaces a servicios de terceros. NexoraAI no controla ni asume responsabilidad por contenidos, políticas o prácticas de dichos terceros.
</p> <h2>7. Legislación aplicable</h2> <p>
Este aviso se interpretará conforme a la normativa aplicable al responsable del sitio y a la relación contractual correspondiente cuando exista un acuerdo específico.
</p> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/legal/legal-notice.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/legal/legal-notice.astro";
const $$url = "/legal/legal-notice";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LegalNotice,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
