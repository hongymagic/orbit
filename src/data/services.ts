export type ServiceStatus = "ok" | "warn" | "err";

export type Service = {
  name: string;
  region: string;
  domain: string;
  status: ServiceStatus;
  latency: string;
  req: string;
  cpu: number;
  branch: string;
};

export const services: readonly Service[] = [
  { name: "atlas-web",   region: "iad1",   domain: "atlas.orbit.app",       status: "ok",   latency: "42ms", req: "1.2M", cpu: 42, branch: "main" },
  { name: "atlas-api",   region: "sfo1",   domain: "api.atlas.orbit.app",   status: "ok",   latency: "18ms", req: "4.8M", cpu: 61, branch: "main" },
  { name: "atlas-edge",  region: "global", domain: "edge.atlas.orbit.app",  status: "warn", latency: "88ms", req: "680K", cpu: 33, branch: "main" },
  { name: "atlas-admin", region: "iad1",   domain: "admin.atlas.orbit.app", status: "ok",   latency: "58ms", req: "14K",  cpu: 8,  branch: "main" },
];

export const serviceStatusLabel: Record<ServiceStatus, string> = {
  ok:   "Operational",
  warn: "Degraded",
  err:  "Incident",
};
