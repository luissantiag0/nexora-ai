import { c as createComponent } from './astro-component_Dl_Jgkat.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_C_MYSd8d.mjs';
import { r as renderComponent } from './entrypoint_D_5yUKUO.mjs';
import { $ as $$BaseLayout } from './BaseLayout_D76Wmo3y.mjs';
import { u as ui } from './uiClasses_Bu9-IoKB.mjs';
import { a as actualizarEstadoLead, b as a_adirNotaLead, o as obtenerLeads, E as ESTADOS_LEAD } from './leadStorage_DT8eBzY6.mjs';
import { p as prisma } from './prisma_Dd9Pg7uq.mjs';
import bcrypt from 'bcryptjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const LEADS_POR_PAGINA = 10;
  const statusLabels = {
    nuevo: "Nuevo",
    contactado: "Contactado",
    cualificado: "Cualificado",
    propuesta_enviada: "Propuesta enviada",
    ganado: "Ganado",
    perdido: "Perdido"
  };
  const statusBadgeClass = {
    nuevo: "border border-sky-400/30 bg-sky-500/10 text-sky-200",
    contactado: "border border-amber-400/30 bg-amber-500/10 text-amber-200",
    cualificado: "border border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    propuesta_enviada: "border border-purple-400/30 bg-purple-500/10 text-purple-200",
    ganado: "border border-green-400/30 bg-green-500/10 text-green-200",
    perdido: "border border-rose-400/30 bg-rose-500/10 text-rose-200"
  };
  const sessionCookie = "nexora_admin_session";
  const sessionToken = Astro2.cookies.get(sessionCookie)?.value;
  let currentUser = null;
  if (sessionToken) {
    currentUser = await prisma.user.findFirst({
      where: {
        adminSessionToken: sessionToken
      }
    });
  }
  let isAuthed = !!currentUser;
  let authError = "";
  let actionMessage = "";
  const url = new URL(Astro2.request.url);
  const filtroEstado = url.searchParams.get("estado") || "";
  const busqueda = url.searchParams.get("q") || "";
  const paginaActual = Number(
    url.searchParams.get("page") || "1"
  );
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const intent = String(
      formData.get("intent") || ""
    );
    if (intent === "login") {
      const email = String(
        formData.get("email") || ""
      );
      const password = String(
        formData.get("password") || ""
      );
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      });
      if (!user) {
        authError = "Usuario no encontrado.";
      } else {
        const validPassword = await bcrypt.compare(
          password,
          user.passwordHash
        );
        if (!validPassword) {
          authError = "Contraseña incorrecta.";
        } else {
          const sessionToken2 = crypto.randomUUID();
          await prisma.user.update({
            where: {
              id: user.id
            },
            data: {
              adminSessionToken: sessionToken2
            }
          });
          Astro2.cookies.set(
            sessionCookie,
            sessionToken2,
            {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              path: "/",
              maxAge: 60 * 60 * 24 * 7
            }
          );
          return Astro2.redirect("/admin");
        }
      }
    }
    if (intent === "logout") {
      if (currentUser) {
        await prisma.user.update({
          where: {
            id: currentUser.id
          },
          data: {
            adminSessionToken: null
          }
        });
      }
      Astro2.cookies.delete(sessionCookie, {
        path: "/"
      });
      return Astro2.redirect("/admin");
    }
    if (intent === "update-status" && isAuthed) {
      const leadId = String(
        formData.get("leadId") || ""
      );
      const status = String(
        formData.get("status") || ""
      );
      await actualizarEstadoLead(
        leadId,
        status
      );
      actionMessage = "Estado actualizado correctamente.";
    }
    if (intent === "add-note" && isAuthed) {
      const leadId = String(
        formData.get("leadId") || ""
      );
      const note = String(
        formData.get("note") || ""
      );
      await a_adirNotaLead(
        leadId,
        note
      );
      actionMessage = "Nota añadida correctamente.";
    }
  }
  let leads = isAuthed ? await obtenerLeads() : [];
  if (filtroEstado) {
    leads = leads.filter(
      (lead) => lead.estado === filtroEstado
    );
  }
  if (busqueda) {
    const query = busqueda.toLowerCase();
    leads = leads.filter(
      (lead) => lead.nombre.toLowerCase().includes(query) || lead.email.toLowerCase().includes(query)
    );
  }
  const totalLeads = leads.length;
  const totalPaginas = Math.ceil(
    totalLeads / LEADS_POR_PAGINA
  );
  const offset = (paginaActual - 1) * LEADS_POR_PAGINA;
  const leadsPaginados = leads.slice(
    offset,
    offset + LEADS_POR_PAGINA
  );
  const buildPageUrl = (page) => {
    const params = new URLSearchParams();
    if (filtroEstado) {
      params.set(
        "estado",
        filtroEstado
      );
    }
    if (busqueda) {
      params.set("q", busqueda);
    }
    params.set("page", String(page));
    return `/admin?${params.toString()}`;
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Panel Admin", "description": "CRM NexoraAI" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main${addAttribute(ui.section, "class")}> <div${addAttribute(ui.pageShell, "class")}>  ${!isAuthed ? renderTemplate`<div class="mx-auto max-w-md"> <h1 class="text-3xl font-semibold text-white">
Login Admin
</h1> ${authError && renderTemplate`<p class="mt-4 text-red-400"> ${authError} </p>`} <form method="POST" class="mt-8 space-y-4"> <input type="hidden" name="intent" value="login"> <input type="email" name="email" placeholder="Email" class="w-full rounded-xl bg-white/5 p-4 text-white"> <input type="password" name="password" placeholder="Contraseña" class="w-full rounded-xl bg-white/5 p-4 text-white"> <button class="w-full rounded-xl bg-white py-4 text-black">
Entrar
</button> </form> </div>` : renderTemplate`<div>  <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"> <div> <h1 class="text-3xl font-semibold text-white">
Panel de Leads
</h1> <p class="mt-2 text-white/60">
CRM interno NexoraAI
</p> </div> <div class="flex gap-3"> <a href="/api/export/leads" class="rounded-xl bg-emerald-400 px-5 py-3 text-black">
Exportar CSV
</a> <form method="POST"> <input type="hidden" name="intent" value="logout"> <button class="rounded-xl bg-white px-5 py-3 text-black">
Cerrar sesión
</button> </form> </div> </div>  <div class="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5"> <form method="GET" class="grid gap-4 lg:grid-cols-[1fr_220px_auto]"> <input type="text" name="q"${addAttribute(busqueda, "value")} placeholder="Buscar por nombre o email..." class="rounded-xl bg-black/30 p-4 text-white"> <select name="estado" class="rounded-xl bg-black/30 p-4 text-white"> <option value="">
Todos los estados
</option> ${ESTADOS_LEAD.map(
    (estado) => renderTemplate`<option${addAttribute(estado, "value")}${addAttribute(
      filtroEstado === estado,
      "selected"
    )}> ${statusLabels[estado]} </option>`
  )} </select> <button class="rounded-xl bg-white px-5 text-black">
Filtrar
</button> </form> </div>  ${actionMessage && renderTemplate`<p class="mt-6 text-green-300"> ${actionMessage} </p>`}  <div class="mt-10 space-y-6"> ${leadsPaginados.map((lead) => renderTemplate`<article class="rounded-2xl border border-white/10 bg-white/5 p-6"> <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"> <div> <a${addAttribute(`/dashboard/leads/${lead.id}`, "href")} class="text-xl font-semibold text-white hover:underline"> ${lead.nombre} </a> <p class="mt-1 text-white/60"> ${lead.email} </p> ${lead.empresa && renderTemplate`<p class="mt-1 text-white/40"> ${lead.empresa} </p>`} </div> <span${addAttribute(`rounded-full px-3 py-1 text-xs ${statusBadgeClass[lead.estado]}`, "class")}> ${statusLabels[lead.estado]} </span> </div> <p class="mt-5 text-white/80"> ${lead.mensaje} </p> <p class="mt-4 text-xs text-white/40"> ${new Date(
    lead.timestamp
  ).toLocaleString(
    "es-ES"
  )} </p>  <form method="POST" class="mt-6 flex flex-col gap-3 lg:flex-row"> <input type="hidden" name="intent" value="update-status"> <input type="hidden" name="leadId"${addAttribute(lead.id, "value")}> <select name="status" class="rounded-xl bg-black/30 p-3 text-white"> ${ESTADOS_LEAD.map(
    (estado) => renderTemplate`<option${addAttribute(estado, "value")}${addAttribute(
      lead.estado === estado,
      "selected"
    )}> ${statusLabels[estado]} </option>`
  )} </select> <button class="rounded-xl bg-white px-4 text-black">
Actualizar
</button> </form>  <form method="POST" class="mt-4 flex flex-col gap-3 lg:flex-row"> <input type="hidden" name="intent" value="add-note"> <input type="hidden" name="leadId"${addAttribute(lead.id, "value")}> <input type="text" name="note" placeholder="Añadir nota..." class="w-full rounded-xl bg-black/30 p-3 text-white"> <button class="rounded-xl bg-white px-4 text-black">
Añadir
</button> </form> </article>`)} </div>  <div class="mt-10 flex items-center justify-between"> <div class="text-sm text-white/50">
Página ${paginaActual} de${" "} ${totalPaginas || 1} </div> <div class="flex gap-3"> ${paginaActual > 1 && renderTemplate`<a${addAttribute(buildPageUrl(
    paginaActual - 1
  ), "href")} class="rounded-xl border border-white/10 px-4 py-2 text-white">
← Anterior
</a>`} ${paginaActual < totalPaginas && renderTemplate`<a${addAttribute(buildPageUrl(
    paginaActual + 1
  ), "href")} class="rounded-xl border border-white/10 px-4 py-2 text-white">
Siguiente →
</a>`} </div> </div> </div>`} </div> </main> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
