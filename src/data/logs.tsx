import type { LogEntry } from "@/components/data/console";

export const buildLogs: readonly LogEntry[] = [
  {
    time: "14:22:01",
    level: "ready",
    message: (
      <>
        <span className="code-k">$</span> installing dependencies · bun install
      </>
    ),
  },
  { time: "14:22:03", level: "info", message: "resolved 1,204 packages in 1.87s" },
  {
    time: "14:22:04",
    level: "info",
    message: (
      <>
        <span className="code-k">$</span> next build · v16.0.2
      </>
    ),
  },
  { time: "14:22:09", level: "info", message: "collecting page data · 38 routes" },
  { time: "14:22:14", level: "pass", message: "type-check · 0 errors in 4.2s" },
  { time: "14:22:21", level: "warn", message: "route /api/webhook/stripe uses dynamic rendering" },
  { time: "14:22:28", level: "info", message: "compiling edge functions · 12 functions · 418 KB" },
  { time: "14:22:34", level: "pass", message: "build · 1m 12s · bundle 1.1 MB (−38 KB from main)" },
  { time: "14:22:35", level: "info", message: "deploying to preview · atlas-web-pk3m.orbit.app" },
];

export const runtimeLogs: readonly LogEntry[] = [
  {
    time: "14:22:34",
    level: "ok",
    message: (
      <>
        <span className="code-k">GET</span> /api/billing/plans · 200 · 18ms · cache=HIT
      </>
    ),
  },
  {
    time: "14:22:33",
    level: "ok",
    message: (
      <>
        <span className="code-k">POST</span> /api/sessions · 201 · 34ms
      </>
    ),
  },
  { time: "14:22:32", level: "info", message: "fn:resize-image · cold start · 312ms" },
  {
    time: "14:22:31",
    level: "warn",
    message: "rate-limit hit · ip=192.0.2.14 · route=/api/search",
  },
  {
    time: "14:22:30",
    level: "ok",
    message: (
      <>
        <span className="code-k">GET</span> /dashboard · 200 · 22ms · ssr
      </>
    ),
  },
  {
    time: "14:22:29",
    level: "error",
    message: (
      <>
        <span className="code-k">POST</span> /api/webhook/stripe · 500 ·
        StripeSignatureVerificationError
      </>
    ),
  },
  {
    time: "14:22:28",
    level: "ok",
    message: (
      <>
        <span className="code-k">GET</span> /pricing · 200 · 12ms · cache=HIT
      </>
    ),
  },
  { time: "14:22:27", level: "info", message: "fn:auth-session · warm · 4ms" },
  {
    time: "14:22:26",
    level: "ok",
    message: (
      <>
        <span className="code-k">GET</span> /api/me · 200 · 8ms
      </>
    ),
  },
];
