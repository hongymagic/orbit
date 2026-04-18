"use client";

import { cn } from "@/lib/utils";
import { defaultNav, type NavSection } from "@/lib/nav";
import { Icon } from "@/components/icons";

import { Avatar, BrandMark } from "./brand-mark";

export function Sidebar({
  active,
  sections = defaultNav,
  onNavigate,
  env = "prod",
  brandLetter = "O",
  brandName = "Orbit",
  user = { initials: "RL", name: "Rhea Lin", role: "platform · admin" },
}: {
  active?: string;
  sections?: readonly NavSection[];
  onNavigate?: (key: string) => void;
  env?: string;
  brandLetter?: string;
  brandName?: string;
  user?: { initials: string; name: string; role: string };
}) {
  return (
    <aside
      className="sticky top-0 h-screen bg-bg-subtle overflow-hidden flex flex-col shadow-[1px_0_0_var(--color-line)]"
      style={{ width: "var(--sidebar-w)" }}
    >
      <div
        className="flex items-center gap-2.5 px-4 shadow-[0_1px_0_var(--color-line)] shrink-0"
        style={{ height: "var(--topbar-h)" }}
      >
        <BrandMark letter={brandLetter} />
        <div className="text-[14px] font-semibold tracking-[-0.02em]">{brandName}</div>
        <div className="ml-auto font-mono text-[10px] font-medium text-fg-subtle px-1.5 py-0.5 rounded-xs shadow-[inset_0_0_0_1px_var(--color-line)] uppercase tracking-[0.04em]">
          {env}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2.5 py-3">
        {sections.map((section) => (
          <div key={section.label} className="mb-[18px]">
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-subtle px-2 pb-1.5 font-medium">
              {section.label}
            </div>
            {section.items.map((item) => {
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate?.(item.key)}
                  aria-current={isActive || undefined}
                  type="button"
                  className={cn(
                    "flex items-center gap-2.5 px-2 py-1.5 rounded-sm w-full text-left",
                    "text-[13px] font-medium cursor-pointer select-none",
                    "transition-colors duration-100",
                    isActive
                      ? "bg-bg-muted text-fg shadow-[inset_0_0_0_1px_var(--color-line)]"
                      : "text-fg-muted hover:bg-bg-muted hover:text-fg",
                  )}
                >
                  <Icon name={item.icon} />
                  <span className="flex-1">{item.label}</span>
                  {item.count ? (
                    <span className="font-mono text-[11px] text-fg-subtle">{item.count}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="p-2.5 shadow-[0_-1px_0_var(--color-line)] shrink-0">
        <button
          type="button"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-sm w-full text-left hover:bg-bg-muted cursor-pointer"
        >
          <Avatar initials={user.initials} />
          <div className="leading-[1.2] min-w-0">
            <div className="text-[13px] font-medium truncate">{user.name}</div>
            <div className="text-[11px] text-fg-subtle font-mono truncate">{user.role}</div>
          </div>
          <div className="ml-auto text-fg-faint">
            <Icon name="chev" />
          </div>
        </button>
      </div>
    </aside>
  );
}
