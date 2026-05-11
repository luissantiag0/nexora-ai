import { c as createComponent } from './astro-component_Dl_Jgkat.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_C_MYSd8d.mjs';
import { r as renderComponent } from './entrypoint_D_5yUKUO.mjs';
import { $ as $$BaseLayout } from './BaseLayout_D76Wmo3y.mjs';
import { u as ui } from './uiClasses_Bu9-IoKB.mjs';
import { c as getSuggestedNextAction, b as a_adirNotaLead, o as obtenerLeads, d as obtenerAccionSiguiente } from './leadStorage_DT8eBzY6.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const iaSuggestion = await getSuggestedNextAction(
    lead
  );
  const { id } = Astro2.params;
  const cookieName = "nexora_admin_auth";
  const existingCookie = Astro2.cookies.get(cookieName)?.value;
  const isAuthed = existingCookie === "1";
  if (!isAuthed) {
    return Astro2.redirect("/admin");
  }
  let actionMessage = "";
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const intent = String(
      formData.get("intent") || ""
    );
    if (intent === "add-note") {
      const note = String(
        formData.get("note") || ""
      );
      const ok = await a_adirNotaLead(
        String(id),
        note
      );
      if (ok) {
        actionMessage = "Nota añadida correctamente.";
      } else {
        errorMessage = "No se pudo añadir la nota.";
      }
    }
  }
  const leads = await obtenerLeads();
  const lead = leads.find(
    (lead2) => lead2.id === id
  );
  if (!lead) {
    throw new Error("Lead no encontrado");
  }
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
  const timeline = [
    {
      tipo: "estado",
      estado: lead.estado,
      fecha: lead.timestamp
    },
    ...lead.notas.map((nota) => ({
      tipo: "nota",
      texto: nota.texto,
      fecha: nota.createdAt
    }))
  ].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
  const accionSugerida = obtenerAccionSiguiente(lead.estado);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Lead ${lead.nombre}`, "description": "Detalle del lead" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main${addAttribute(ui.section, "class")}> <div${addAttribute(ui.pageShell, "class")}>  <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"> <div> <a href="/admin" class="text-sm text-white/50 hover:text-white">
← Volver al panel
</a> <h1 class="mt-3 text-3xl font-semibold text-white"> ${lead.nombre} </h1> <p class="mt-2 text-white/60"> ${lead.email} </p> ${lead.empresa && renderTemplate`<p class="mt-1 text-white/40">
Empresa: ${lead.empresa} </p>`} </div> <span${addAttribute(`w-fit rounded-full px-4 py-2 text-sm ${statusBadgeClass[lead.estado]}`, "class")}> ${statusLabels[lead.estado]} </span> </div>  ${actionMessage && renderTemplate`<div class="mt-6 rounded-xl border border-green-400/20 bg-green-500/10 p-4 text-green-200"> ${actionMessage} </div>`} ${errorMessage && renderTemplate`<div class="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-red-200"> ${errorMessage} </div>`}  <div class="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">  <div class="space-y-8">  <section class="rounded-2xl border border-white/10 bg-white/5 p-6"> <h2 class="text-xl font-semibold text-white">
Mensaje del Lead
</h2> <div class="mt-5 rounded-xl border border-white/10 bg-black/20 p-5"> <p class="whitespace-pre-line text-white/80"> ${lead.mensaje} </p> </div> <p class="mt-4 text-xs text-white/40">
Creado el${" "} ${new Date(
    lead.timestamp
  ).toLocaleString("es-ES")} </p> </section>  <section class="rounded-2xl border border-white/10 bg-white/5 p-6"> <h2 class="text-xl font-semibold text-white">
Añadir Nota
</h2> <form method="POST" class="mt-5"> <input type="hidden" name="intent" value="add-note"> <textarea name="note" rows="5" placeholder="Escribe una nota interna..." class="w-full rounded-xl border border-white/10 bg-black/30 p-4 text-white outline-none"></textarea> <button class="mt-4 rounded-xl bg-white px-5 py-3 text-black">
Guardar nota
</button> </form> </section>  <section class="rounded-2xl border border-white/10 bg-white/5 p-6"> <div class="flex items-center justify-between"> <h2 class="text-xl font-semibold text-white">
Notas Internas
</h2> <span class="text-sm text-white/40"> ${lead.notas.length} notas
</span> </div> <div class="mt-6 space-y-4"> ${lead.notas.length === 0 ? renderTemplate`<div class="rounded-xl border border-white/10 bg-black/20 p-5"> <p class="text-white/50">
No hay notas todavía.
</p> </div>` : lead.notas.map((nota) => renderTemplate`<div class="rounded-xl border border-white/10 bg-black/20 p-5"> <p class="whitespace-pre-line text-white/80"> ${nota.texto} </p> <p class="mt-4 text-xs text-white/40"> ${new Date(
    nota.createdAt
  ).toLocaleString("es-ES")} </p> </div>`)} </div> </section> </div>  <aside class="space-y-8">  <section class="rounded-2xl border border-white/10 bg-white/5 p-6"> <h2 class="text-xl font-semibold text-white">
Acción sugerida
</h2> <div class="mt-5 rounded-xl border border-white/10 bg-black/20 p-5"> <p class="text-white/80"> ${accionSugerida} </p> </div> </section>  <section class="rounded-2xl border border-white/10 bg-white/5 p-6"> <div class="flex items-center justify-between"> <div> <h2 class="text-xl font-semibold text-white">
Timeline
</h2> <p class="mt-1 text-sm text-white/50">
Actividad del lead
</p> </div> <span class="text-sm text-white/40"> ${timeline.length} eventos
</span> </div> <div class="relative mt-8"> <div class="absolute left-[11px] top-0 h-full w-px bg-white/10"></div> <div class="space-y-8"> ${timeline.map((evento) => renderTemplate`<div class="relative flex gap-5">  <div${addAttribute(`relative z-10 mt-1 h-6 w-6 rounded-full border ${evento.tipo === "estado" ? "border-emerald-400 bg-emerald-500/20" : "border-sky-400 bg-sky-500/20"}`, "class")}></div>  <div class="flex-1 rounded-2xl border border-white/10 bg-black/20 p-5"> <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"> <div> ${evento.tipo === "estado" ? renderTemplate`<div> <p class="text-sm uppercase tracking-wide text-emerald-300">
Cambio de estado
</p> <h3 class="mt-1 text-lg font-medium text-white"> ${statusLabels[evento.estado]} </h3> </div>` : renderTemplate`<div> <p class="text-sm uppercase tracking-wide text-sky-300">
Nota interna
</p> <h3 class="mt-1 text-lg font-medium text-white">
Nueva nota añadida
</h3> </div>`} </div> <p class="text-sm text-white/40"> ${new Date(
    evento.fecha
  ).toLocaleString("es-ES")} </p> </div> ${evento.tipo === "nota" && renderTemplate`<div class="mt-4"> <p class="whitespace-pre-line text-white/80"> ${evento.texto} </p> </div>`} </div> </div>`)} </div> </div> </section>  <section class="rounded-2xl border border-white/10 bg-white/5 p-6"> <h2 class="text-xl font-semibold text-white">
Información técnica
</h2> <div class="mt-5 space-y-5 text-sm"> <div> <p class="text-white/40">
ID del Lead
</p> <p class="mt-1 break-all text-white/80"> ${lead.id} </p> </div> <div> <p class="text-white/40">
User ID
</p> <p class="mt-1 break-all text-white/80"> ${lead.userId} </p> </div> </div> </section> <section class="rounded-2xl border border-white/10 bg-white/5 p-6"> <h2 class="text-xl font-semibold text-white">
Sugerencia IA
</h2> <div class="mt-5 rounded-xl border border-white/10 bg-black/20 p-5"> <p class="text-sm uppercase tracking-wide text-white/40">
Siguiente acción
</p> <p class="mt-2 text-white"> ${iaSuggestion.accion} </p> <div class="mt-6"> <p class="text-sm uppercase tracking-wide text-white/40">
Mensaje sugerido
</p> <p class="mt-2 whitespace-pre-line text-white/80"> ${iaSuggestion.seguimiento} </p> </div> </div> </section> </aside> </div> </div> </main> ` })}`;
}, "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads/[id].astro", void 0);

const $$file = "C:/Users/luiss/nexora-ai/src/pages/dashboard/leads/[id].astro";
const $$url = "/dashboard/leads/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
