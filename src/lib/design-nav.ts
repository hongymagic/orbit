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
      { key: "index", label: "Overview", icon: "dash", href: "/_design" },
      { key: "tokens", label: "Tokens", icon: "settings", href: "/_design/tokens" },
      { key: "components", label: "Components", icon: "cmd", href: "/_design/components" },
      { key: "blocks", label: "Blocks", icon: "db", href: "/_design/blocks" },
      { key: "feedback", label: "Feedback", icon: "bell", href: "/_design/feedback" },
      { key: "navigation", label: "Navigation", icon: "team", href: "/_design/navigation" },
    ],
  },
  {
    label: "Blocks",
    items: [
      { key: "block-dashboard", label: "Dashboard", icon: "dash", href: "/_design/dashboard" },
    ],
  },
  {
    label: "Layouts",
    items: [
      { key: "conservative", label: "Conservative", icon: "logs", href: "/_design/conservative" },
      { key: "confident", label: "Confident", icon: "globe", href: "/_design/confident" },
      { key: "experimental", label: "Experimental", icon: "fn", href: "/_design/experimental" },
    ],
  },
  {
    label: "Surfaces",
    items: [
      { key: "surfaces", label: "All surfaces", icon: "dash", href: "/_design/surfaces" },
      { key: "signup", label: "Signup", icon: "plus", href: "/_design/surfaces/signup" },
      { key: "settings", label: "Settings", icon: "settings", href: "/_design/surfaces/settings" },
      { key: "billing", label: "Billing", icon: "key", href: "/_design/surfaces/billing" },
    ],
  },
  {
    label: "AI",
    items: [
      { key: "ai", label: "Conversation", icon: "play", href: "/_design/ai" },
      { key: "ai-reasoning", label: "Reasoning", icon: "cmd", href: "/_design/ai/reasoning" },
      { key: "ai-code", label: "Code", icon: "fn", href: "/_design/ai/code" },
    ],
  },
] as const;
