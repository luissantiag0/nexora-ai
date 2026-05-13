export interface SummaryResult {
  summary: string;
  priority: string;
}

export async function summarizeLead(lead: {
  name: string;
  message: string;
  notes?: string;
}): Promise<SummaryResult> {
  // TODO: Implement AI summarization
  console.warn("[ai] summarizeLead not implemented");
  return { summary: "", priority: "media" };
}
