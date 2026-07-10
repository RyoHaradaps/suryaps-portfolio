type ErrorReportOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

export function reportError(
  error: unknown,
  context: Record<string, unknown> = {},
  options: ErrorReportOptions = {},
) {
  if (typeof window === "undefined") return;
  // Neutral error reporting hook. Wire up to your own telemetry as needed.
  if (typeof console !== "undefined") {
    console.error("[error-boundary]", error, { ...context, ...options });
  }
}
