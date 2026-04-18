"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { useCommandPalette } from "@/components/command-palette/command-palette";

import { BrandMark } from "./brand-mark";
import { Button } from "@/components/orbit/button";
import { Kbd } from "@/components/orbit/kbd";

export type BreadcrumbEntry = string | { label: string; href?: string };

export function Topbar({
  crumbs = ["atlas-web", "Deployments"],
  actions,
  searchHint = "Search, navigate, run a command…",
  onOpenSearch,
  onOpenNotifications,
  onDeploy,
  hideDeploy = false,
}: {
  crumbs?: readonly BreadcrumbEntry[];
  actions?: React.ReactNode;
  searchHint?: string;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onDeploy?: () => void;
  hideDeploy?: boolean;
}) {
  const { setOpen } = useCommandPalette();
  const handleOpenSearch = onOpenSearch ?? (() => setOpen(true));
  return (
    <div
      className="sticky top-0 z-10 flex items-center gap-3 px-5 bg-bg shadow-[0_1px_0_var(--color-line)]"
      style={{ height: "var(--topbar-h)" }}
    >
      <div className="flex items-center gap-2 text-[13px] text-fg-muted">
        <BrandMark
          size={20}
          letter={typeof crumbs[0] === "string" ? crumbs[0][0].toUpperCase() : "A"}
        />
        {crumbs.map((entry, i) => {
          const label = typeof entry === "string" ? entry : entry.label;
          const last = i === crumbs.length - 1;
          return (
            <div key={label} className="flex items-center gap-2">
              {i > 0 ? <span className="text-fg-faint">/</span> : null}
              <span className={cn(last && "text-fg font-medium")}>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="flex-1" />

      <button
        type="button"
        onClick={handleOpenSearch}
        className={cn(
          "hidden md:flex items-center gap-2 px-2.5 py-1 rounded-sm bg-bg min-w-[280px]",
          "text-fg-muted text-[13px] cursor-text transition-shadow duration-100",
          "shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1px_var(--color-line-strong)]",
        )}
      >
        <Icon name="search" />
        <span>{searchHint}</span>
        <Kbd className="ml-auto">⌘K</Kbd>
      </button>

      <Button
        variant="ghost"
        iconOnly
        size="md"
        onClick={onOpenNotifications}
        aria-label="Notifications"
      >
        <Icon name="bell" />
      </Button>

      {actions}

      {!hideDeploy ? (
        <Button variant="accent" onClick={onDeploy}>
          Deploy
        </Button>
      ) : null}
    </div>
  );
}
