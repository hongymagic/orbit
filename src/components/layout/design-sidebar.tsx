"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { designNav } from "@/lib/design-nav";
import { Icon } from "@/components/icons";
import { BrandMark } from "./brand-mark";
import { ProfileMenu } from "./profile-menu";

export function DesignSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/_design" || href === "/design")
      return pathname === "/_design" || pathname === "/design";
    return pathname.startsWith(href) || pathname.startsWith(href.replace("/_design", "/design"));
  };

  return (
    <aside
      className="sticky top-0 h-screen bg-bg-subtle overflow-hidden flex flex-col shadow-[1px_0_0_var(--color-line)]"
      style={{ width: "var(--sidebar-w)" }}
    >
      <div
        className="flex items-center gap-2.5 px-4 shadow-[0_1px_0_var(--color-line)] shrink-0"
        style={{ height: "var(--topbar-h)" }}
      >
        <BrandMark letter="O" />
        <div className="text-[14px] font-semibold tracking-[-0.02em]">Orbit</div>
        <div className="ml-auto font-mono text-[10px] font-medium text-fg-subtle px-1.5 py-0.5 rounded-xs shadow-[inset_0_0_0_1px_var(--color-line)] uppercase tracking-[0.04em]">
          ds
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2.5 py-3">
        {designNav.map((section) => (
          <div key={section.label} className="mb-[18px]">
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-subtle px-2 pb-1.5 font-medium">
              {section.label}
            </div>
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href as never}
                  aria-current={active || undefined}
                  className={cn(
                    "flex items-center gap-2.5 px-2 py-1.5 rounded-sm",
                    "text-[13px] font-medium select-none transition-colors duration-100",
                    active
                      ? "bg-bg-muted text-fg shadow-[inset_0_0_0_1px_var(--color-line)]"
                      : "text-fg-muted hover:bg-bg-muted hover:text-fg",
                  )}
                >
                  <Icon name={item.icon} />
                  <span className="flex-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="p-2.5 shadow-[0_-1px_0_var(--color-line)] shrink-0">
        <ProfileMenu
          user={{
            initials: "RL",
            name: "Rhea Lin",
            email: "rhea@orbit.app",
            role: "platform · admin",
          }}
        />
      </div>
    </aside>
  );
}
