export interface EmailResult {
  subject: string;
  body: string;
}

export async function generateSalesEmail(lead: {
  name: string;
  company?: string | null;
  message: string;
}): Promise<EmailResult> {
  // TODO: Implement AI email generation
  console.warn("[ai] generateSalesEmail not implemented");
  return { subject: "", body: "" };
}
