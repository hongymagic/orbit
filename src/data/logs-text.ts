import type { LogEntry } from "@/components/data/console";

export type LogLevel = LogEntry["level"];

export type TextLogEntry = {
  time: string;
  level: LogLevel;
  message: string;
};

export const buildLogsText: readonly TextLogEntry[] = [
  { time: "14:22:01", level: "ready", message: "$ installing dependencies · bun install" },
  { time: "14:22:03", level: "info", message: "resolved 1,204 packages in 1.87s" },
  { time: "14:22:04", level: "info", message: "$ next build · v16.0.2" },
  { time: "14:22:09", level: "info", message: "collecting page data · 38 routes" },
  { time: "14:22:14", level: "pass", message: "type-check · 0 errors in 4.2s" },
  { time: "14:22:21", level: "warn", message: "route /api/webhook/stripe uses dynamic rendering" },
  { time: "14:22:28", level: "info", message: "compiling edge functions · 12 functions · 418 KB" },
  { time: "14:22:34", level: "pass", message: "build · 1m 12s · bundle 1.1 MB (−38 KB from main)" },
  { time: "14:22:35", level: "info", message: "deploying to preview · atlas-web-pk3m.orbit.app" },
  { time: "14:22:38", level: "info", message: "uploading build outputs · 18 chunks · 1.1 MB" },
  { time: "14:22:41", level: "pass", message: "preview ready · https://atlas-web-pk3m.orbit.app" },
  { time: "14:22:42", level: "ok", message: "health check · 200 · 24ms" },
];
