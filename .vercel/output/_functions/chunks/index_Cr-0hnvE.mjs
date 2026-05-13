import { S as SESSION_COOKIE } from './session_-AL8X7ha.mjs';
import { getCurrentUser } from './auth_BZvm-TfZ.mjs';
import { o as obtenerLeads } from './leadStorage_C3jvhflq.mjs';
import { p as prisma } from './prisma_jaorxYCI.mjs';
import { c as generateReportPdf } from './pdf_DQMHRl9e.mjs';

const prerender = false;
const GET = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const allLeads = await obtenerLeads();
  const total = allLeads.length;
  const won = allLeads.filter((l) => l.estado === "ganado").length;
  const lost = allLeads.filter((l) => l.estado === "perdido").length;
  const open = total - won - lost;
  const conversion = total > 0 ? Math.round(won / total * 100) : 0;
  const userCount = await prisma.user.count();
  const premiumCount = await prisma.user.count({
    where: { OR: [{ isPremium: true }, { subscriptionStatus: "active" }] }
  });
  const pdf = await generateReportPdf({
    title: "Informe Ejecutivo NexoraAI",
    metrics: [
      { label: "Leads totales", value: String(total) },
      { label: "Oportunidades abiertas", value: String(open) },
      { label: "Tasa de conversión", value: `${conversion}%` },
      { label: "Clientes ganados", value: String(won) }
    ],
    sections: [
      {
        title: "Rendimiento comercial",
        content: `El pipeline actual gestiona ${total} leads, con ${open} oportunidades en fase activa. Se han cerrado ${won} ventas exitosas con una tasa de conversión del ${conversion}%. ${lost} leads se perdieron en el proceso comercial.`
      },
      {
        title: "Productividad operativa",
        content: `La plataforma cuenta con ${userCount} usuarios registrados, de los cuales ${premiumCount} son cuentas premium. El sistema de automatización ha procesado ${total} leads de forma eficiente.`
      },
      {
        title: "Forecast y proyecciones",
        content: `Con ${open} oportunidades activas y una tasa de conversión actual del ${conversion}%, la proyección de ingresos estimada es de ${open * 2900} €. Se recomienda mantener el seguimiento sobre leads en fase de propuesta y negociación.`
      }
    ]
  });
  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="informe-ejecutivo-nexoraai.pdf"'
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
