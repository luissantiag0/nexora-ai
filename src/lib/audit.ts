export function auditLog(
  action: string,
  details: Record<string, unknown>
) {
  const timestamp = new Date().toISOString();
  const message = `[audit] ${timestamp} | ${action} | ${JSON.stringify(details)}`;
  console.log(message);
}

export function auditError(
  action: string,
  error: unknown,
  details?: Record<string, unknown>
) {
  const timestamp = new Date().toISOString();
  const errMsg = error instanceof Error ? error.message : String(error);
  const message = `[audit:error] ${timestamp} | ${action} | ${errMsg}${details ? " | " + JSON.stringify(details) : ""}`;
  console.error(message);
}
