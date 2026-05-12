import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_WKm3_OPm.mjs';
import { $ as $$LegalLayout } from './LegalLayout_HhhS7fLi.mjs';

const $$Cookies = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LegalLayout", $$LegalLayout, { "title": "Política de cookies", "heading": "Política de cookies", "description": "Información sobre cookies y tecnologías similares utilizadas por NexoraAI." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>
Esta política describe el uso de cookies y tecnologías similares en el sitio web y paneles de NexoraAI.
</p> <h2>1. Qué son las cookies</h2> <p>
Las cookies son pequeños archivos que se almacenan en el navegador para recordar información técnica, preferencias, sesiones o mediciones de uso.
</p> <h2>2. Tipos de cookies</h2> <ul> <li><strong>Cookies técnicas:</strong> necesarias para navegación, seguridad, autenticación y funcionamiento del panel.</li> <li><strong>Cookies de preferencias:</strong> recuerdan configuraciones de interfaz cuando existan.</li> <li><strong>Cookies analíticas:</strong> ayudan a entender uso agregado y mejorar el servicio.</li> <li><strong>Cookies de terceros:</strong> pueden ser establecidas por proveedores de infraestructura, analítica, pagos o comunicación.</li> </ul> <h2>3. Cookies de sesión</h2> <p>
Las áreas privadas utilizan cookies de sesión seguras y HTTP-only para verificar autenticación en servidor. Estas cookies no están diseñadas para seguimiento publicitario.
</p> <h2>4. Gestión y bloqueo</h2> <p>
Puedes bloquear o eliminar cookies desde la configuración del navegador. Si desactivas cookies técnicas, algunas funciones, incluyendo acceso a paneles privados, pueden dejar de funcionar.
</p> <h2>5. Cambios</h2> <p>
Esta política puede actualizarse si incorporamos nuevas herramientas, proveedores o finalidades. La versión vigente será la publicada en esta página.
</p> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/legal/cookies.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/legal/cookies.astro";
const $$url = "/legal/cookies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cookies,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
