import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "../../../lib/session";
import { getCurrentUser, userIsAdmin } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export const prerender = false;

function csvEscape(value: string): string {
  if (!value) return '""';
  const escaped = value.replace(/"/g, '""');
  if (value.startsWith("=") || value.startsWith("+") || value.startsWith("-") || value.startsWith("@")) {
    return `"${escaped}"`;
  }
  return `"${escaped}"`;
}

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser(token);
  if (!user) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401, headers: { "Content-Type": "application/json" } });

  const isAdmin = userIsAdmin(user);
  const leads = await prisma.lead.findMany({
    where: isAdmin ? {} : { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { notes: { orderBy: { createdAt: "desc" }, take: 1 } },
  });

  const header = "Nombre,Email,Empresa,Estado,Creado,Última nota";
  const rows = leads.map((lead) => {
    const lastNote = lead.notes[0]?.text || "";
    return [
      csvEscape(lead.name),
      csvEscape(lead.email),
      csvEscape(lead.company || ""),
      csvEscape(lead.status),
      csvEscape(lead.createdAt.toISOString().split("T")[0]),
      csvEscape(lastNote.slice(0, 100)),
    ].join(",");
  });

  const csv = "\uFEFF" + header + "\n" + rows.join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
};
