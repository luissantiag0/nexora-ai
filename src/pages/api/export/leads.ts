import type { APIRoute } from "astro";

import { obtenerLeads } from "../../../lib/leadStorage";

export const GET: APIRoute = async () => {
  const leads = await obtenerLeads();

  const headers = [
    "id",
    "nombre",
    "email",
    "empresa",
    "estado",
    "mensaje",
    "fecha",
  ];

  const rows = leads.map((lead) => [
    lead.id,
    lead.nombre,
    lead.email,
    lead.empresa || "",
    lead.estado,
    lead.mensaje.replace(/\n/g, " "),
    lead.timestamp,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((field) =>
          `"${String(field).replace(
            /"/g,
            '""'
          )}"`
        )
        .join(",")
    ),
  ].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type":
        "text/csv; charset=utf-8",

      "Content-Disposition":
        'attachment; filename="leads.csv"',
    },
  });
};