import { c as createComponent } from './astro-component_BGVNwjwV.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_CpdTfaFG.mjs';
import { r as renderComponent } from './entrypoint_CG2pX0pD.mjs';
import { $ as $$LegalLayout } from './LegalLayout_Q4Bnxysz.mjs';

const $$PrivacyPolicy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LegalLayout", $$LegalLayout, { "title": "Política de privacidad", "heading": "Política de privacidad", "description": "Política de privacidad de NexoraAI para servicios SaaS, automatización e IA aplicada." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>
Esta política explica cómo NexoraAI trata los datos personales de usuarios, clientes potenciales y clientes que utilizan el sitio web, formularios, paneles privados, automatizaciones, servicios de consultoría y soluciones SaaS asociadas.
</p> <h2>1. Responsable del tratamiento</h2> <p>
El responsable del tratamiento es NexoraAI. Para cualquier consulta sobre privacidad, derechos de protección de datos o seguridad, puedes escribir a <a href="mailto:legal@nexora.ai">legal@nexora.ai</a>.
</p> <h2>2. Datos que podemos tratar</h2> <ul> <li>Datos identificativos y de contacto: nombre, email, empresa, cargo y datos enviados mediante formularios.</li> <li>Datos comerciales: necesidades del proyecto, estado del lead, notas internas, historial de comunicaciones y preferencias.</li> <li>Datos técnicos: dirección IP, navegador, dispositivo, páginas visitadas, logs de seguridad y eventos de uso.</li> <li>Datos de cuenta: credenciales protegidas, rol, estado premium, fecha de sesión y configuración del panel.</li> <li>Datos de facturación cuando exista una relación contractual activa.</li> </ul> <h2>3. Finalidades</h2> <p>
Tratamos los datos para responder solicitudes, prestar servicios contratados, operar el panel privado, gestionar leads, enviar comunicaciones relacionadas con el servicio, mejorar seguridad, prevenir abuso, cumplir obligaciones legales y analizar el rendimiento de nuestras soluciones.
</p> <h2>4. Base jurídica</h2> <p>
Las bases jurídicas pueden ser la ejecución de medidas precontractuales o contractuales, el consentimiento del usuario, el cumplimiento de obligaciones legales y el interés legítimo en proteger el servicio, mejorar operaciones y mantener comunicaciones comerciales razonables.
</p> <h2>5. Conservación</h2> <p>
Conservamos los datos durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos. Los datos comerciales se conservan mientras exista una relación activa o interés legítimo en el seguimiento. Los logs de seguridad se conservan durante plazos limitados y proporcionados.
</p> <h2>6. Encargados y proveedores</h2> <p>
Podemos trabajar con proveedores de hosting, base de datos, email transaccional, analítica, pagos, automatización y soporte. Estos proveedores solo acceden a datos cuando es necesario y bajo compromisos de confidencialidad y seguridad.
</p> <h2>7. Transferencias internacionales</h2> <p>
Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En esos casos se aplican garantías adecuadas, como cláusulas contractuales tipo, medidas técnicas y evaluaciones de riesgo cuando correspondan.
</p> <h2>8. Seguridad</h2> <p>
NexoraAI aplica medidas técnicas y organizativas como control de acceso, sesiones protegidas, hashing de contraseñas, validaciones del lado servidor, protección CSRF en rutas sensibles y limitación de superficie de datos.
</p> <h2>9. Derechos</h2> <p>
Puedes solicitar acceso, rectificación, supresión, oposición, limitación, portabilidad y retirada del consentimiento escribiendo a <a href="mailto:legal@nexora.ai">legal@nexora.ai</a>. También puedes presentar una reclamación ante la autoridad de control competente.
</p> <h2>10. Cambios en esta política</h2> <p>
Podemos actualizar esta política para reflejar cambios legales, técnicos o de negocio. La versión vigente será siempre la publicada en esta página.
</p> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/legal/privacy-policy.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/legal/privacy-policy.astro";
const $$url = "/legal/privacy-policy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PrivacyPolicy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
