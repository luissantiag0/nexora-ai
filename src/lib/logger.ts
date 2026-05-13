export type LogLevel = "info" | "warn" | "error" | "audit";

const LOG_PREFIX: Record<LogLevel, string> = {
  info: "[INFO]",
  warn: "[WARN]",
  error: "[ERROR]",
  audit: "[AUDIT]",
};

function log(level: LogLevel, module: string, message: string, data?: Record<string, unknown>) {
  const ts = new Date().toISOString();
  const prefix = LOG_PREFIX[level];
  const dataStr = data ? ` | ${JSON.stringify(data)}` : "";
  const line = `${prefix} ${ts} | ${module} | ${message}${dataStr}`;

  switch (level) {
    case "error": console.error(line); break;
    case "warn": console.warn(line); break;
    default: console.log(line); break;
  }
}

export const logger = {
  info: (module: string, msg: string, data?: Record<string, unknown>) => log("info", module, msg, data),
  warn: (module: string, msg: string, data?: Record<string, unknown>) => log("warn", module, msg, data),
  error: (module: string, msg: string, data?: Record<string, unknown>) => log("error", module, msg, data),
  audit: (action: string, userId: string, details: Record<string, unknown>) => log("audit", "security", `${action} | user=${userId}`, details),
};
