import type { IconName } from "@/components/icons";

export type DesignNavItem = {
  key: string;
  label: string;
  icon: IconName;
  href: string;
  description?: string;
};

export type DesignNavSection = {
  label: string;
  items: readonly DesignNavItem[];
};

export const designNav: readonly DesignNavSection[] = [
  {
    label: "Reference",
    items: [
      { key: "index",      label: "Overview",   icon: "dash",     href: "/_design" },
      { key: "tokens",     label: "Tokens",     icon: "settings", href: "/_design/tokens" },
      { key: "components", label: "Components", icon: "cmd",      href: "/_design/components" },
    ],
  },
  {
    label: "Layouts",
    items: [
      { key: "conservative", label: "Conservative", icon: "logs",  href: "/_design/conservative" },
      { key: "confident",    label: "Confident",    icon: "globe", href: "/_design/confident" },
      { key: "experimental", label: "Experimental", icon: "fn",    href: "/_design/experimental" },
    ],
  },
  {
    label: "AI",
    items: [
      { key: "ai", label: "ai-elements", icon: "play", href: "/_design/ai" },
    ],
  },
] as const;
