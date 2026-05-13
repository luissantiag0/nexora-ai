export interface ClassificationResult {
  category: string;
  confidence: number;
  tags: string[];
}

export async function classifyLead(lead: {
  name: string;
  email: string;
  company?: string | null;
  message: string;
}): Promise<ClassificationResult> {
  // TODO: Implement AI classification
  console.warn("[ai] classifyLead not implemented");
  return { category: "sin-clasificar", confidence: 0, tags: [] };
}
