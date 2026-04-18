export type DeploymentStatus = "ok" | "info" | "warn" | "err";

export type Deployment = {
  id: string;
  name: string;
  branch: string;
  sha: string;
  status: DeploymentStatus;
  env: "Production" | "Preview";
  author: string;
  time: string;
  duration: string;
};

export const deployments: readonly Deployment[] = [
  { id: "dpl_x8Ra", name: "atlas-web", branch: "main",              sha: "4e2a1b7", status: "ok",   env: "Production", author: "Rhea Lin",     time: "2m ago",  duration: "1m 24s" },
  { id: "dpl_pK3m", name: "atlas-web", branch: "feat/billing-v2",   sha: "9f1c8e3", status: "info", env: "Preview",    author: "Kian Park",    time: "14m ago", duration: "54s" },
  { id: "dpl_qL92", name: "atlas-api", branch: "fix/rate-limit",    sha: "a7b02d4", status: "warn", env: "Preview",    author: "Dana Soto",    time: "42m ago", duration: "2m 08s" },
  { id: "dpl_mN04", name: "atlas-web", branch: "main",              sha: "c45ff91", status: "err",  env: "Production", author: "Rhea Lin",     time: "1h ago",  duration: "36s" },
  { id: "dpl_tR55", name: "atlas-edge",branch: "main",              sha: "1e0a762", status: "ok",   env: "Production", author: "bot · scheduler", time: "3h ago", duration: "48s" },
  { id: "dpl_zS18", name: "atlas-api", branch: "main",              sha: "880fa0c", status: "ok",   env: "Production", author: "Kian Park",    time: "5h ago",  duration: "1m 52s" },
];

export const statusLabel: Record<DeploymentStatus, string> = {
  ok:   "Ready",
  info: "Building",
  warn: "Queued",
  err:  "Failed",
};
