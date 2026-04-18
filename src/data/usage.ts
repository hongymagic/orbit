export type UsageMetric = {
  key: string;
  label: string;
  used: number;
  cap: number;
  unit: string;
};

export type UsagePayload = {
  period: string;
  metrics: readonly UsageMetric[];
};

export const usageApril: UsagePayload = {
  period: "April 2026",
  metrics: [
    { key: "deployments", label: "Deployments", used: 842, cap: 2000, unit: "" },
    { key: "previews", label: "Preview envs", used: 14, cap: 20, unit: "" },
    { key: "build-minutes", label: "Build minutes", used: 1_240, cap: 5_000, unit: "min" },
    { key: "bandwidth", label: "Edge bandwidth", used: 128, cap: 500, unit: "GB" },
  ],
};
