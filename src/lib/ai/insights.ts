export interface InsightsResult {
  summary: string;
  opportunities: string[];
  risks: string[];
}

export async function salesInsights(leads: Array<{
  name: string;
  status: string;
  createdAt: Date;
}>): Promise<InsightsResult> {
  // TODO: Implement AI sales insights
  console.warn("[ai] salesInsights not implemented");
  return { summary: "", opportunities: [], risks: [] };
}
