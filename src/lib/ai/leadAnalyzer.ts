import { askAI } from "./provider";
import {
  LEAD_ANALYSIS_SYSTEM,
  buildLeadAnalysisPrompt,
} from "./prompts";

export interface LeadAnalysis {
  summary: string;
  priority: string;
  opportunity: string;
  tags: string[];
}

export async function analyzeLead(lead: {
  name: string;
  email: string;
  company?: string | null;
  message: string;
  notes?: string;
}): Promise<LeadAnalysis> {
  const prompt = buildLeadAnalysisPrompt(lead);

  try {
    const raw = await askAI(prompt, LEAD_ANALYSIS_SYSTEM);
    const parsed = JSON.parse(raw);

    return {
      summary: parsed.summary || "",
      priority: parsed.priority || "baja",
      opportunity: parsed.opportunity || "",
      tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 3) : [],
    };
  } catch {
    return {
      summary:
        "Lead pendiente de análisis automático.",
      priority: "media",
      opportunity: "Revisión manual requerida",
      tags: ["pendiente"],
    };
  }
}
