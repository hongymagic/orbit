import type { IconName } from "@/components/icons";

export type NavItem = {
  key: string;
  label: string;
  icon: IconName;
  count?: number;
  href?: string;
};

export type NavSection = {
  label: string;
  items: readonly NavItem[];
};

export const defaultNav: readonly NavSection[] = [
  {
    label: "Project · atlas-web",
    items: [
      { key: "overview",    label: "Overview",    icon: "dash" },
      { key: "deployments", label: "Deployments", icon: "deploy", count: 247 },
      { key: "branches",    label: "Branches",    icon: "git",    count: 18 },
      { key: "logs",        label: "Logs",        icon: "logs" },
      { key: "functions",   label: "Functions",   icon: "fn" },
      { key: "domains",     label: "Domains",     icon: "globe" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { key: "storage",  label: "Storage",  icon: "db" },
      { key: "secrets",  label: "Secrets",  icon: "key",      count: 34 },
      { key: "team",     label: "Team",     icon: "team" },
      { key: "settings", label: "Settings", icon: "settings" },
    ],
  },
] as const;
