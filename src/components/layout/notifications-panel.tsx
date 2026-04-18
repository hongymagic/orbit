"use client";

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/orbit/button";
import { Avatar } from "@/components/layout/brand-mark";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Notification, NotificationSeverity } from "@/data/notifications";

type Filter = "all" | "unread" | "mentions";

const severityIcon: Record<NotificationSeverity, IconName> = {
  ok: "check",
  info: "info",
  warn: "alert",
  err: "x",
};

const severityTone: Record<NotificationSeverity, string> = {
  ok: "text-success",
  info: "text-accent",
  warn: "text-warn",
  err: "text-error",
};

export function NotificationsPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [items, setItems] = useState<readonly Notification[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    fetch("/api/mocks/notifications", { cache: "no-store" })
      .then((r) => r.json() as Promise<readonly Notification[]>)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const filtered = items.filter((n) => {
    if (filter === "unread") return n.unread;
    if (filter === "mentions") return n.mention;
    return true;
  });

  const today = filtered.filter((n) => n.bucket === "today");
  const earlier = filtered.filter((n) => n.bucket === "earlier");
  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[360px] p-0 gap-0 bg-bg"
      >
        <SheetHeader className="px-4 py-3 gap-0 shadow-[0_1px_0_var(--color-line)]">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-[14px] font-semibold tracking-[-0.01em] text-fg">
              Notifications
            </SheetTitle>
            {unreadCount > 0 ? (
              <span className="inline-flex items-center h-4 px-1.5 rounded-pill bg-accent text-accent-fg font-mono text-[10px] font-medium">
                {unreadCount}
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="ml-auto h-7 w-7 inline-flex items-center justify-center rounded-sm text-fg-muted hover:bg-bg-muted"
              aria-label="Close"
            >
              <Icon name="x" />
            </button>
          </div>
          <SheetDescription className="sr-only">
            Recent activity across deployments, secrets, and teammates.
          </SheetDescription>

          <div className="mt-2.5 inline-flex items-center gap-1 p-0.5 rounded-sm bg-bg-muted shadow-[inset_0_0_0_1px_var(--color-line)] w-fit">
            {(["all", "unread", "mentions"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "h-6 px-2 rounded-xs text-[12px] font-medium capitalize transition-colors",
                  filter === f
                    ? "bg-bg text-fg shadow-[inset_0_0_0_1px_var(--color-line)]"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <Empty className="border-0 pt-12">
              <EmptyHeader>
                <div className="h-10 w-10 inline-flex items-center justify-center rounded-pill bg-bg-muted text-fg-muted shadow-[inset_0_0_0_1px_var(--color-line)]">
                  <Icon name="bell" />
                </div>
                <EmptyTitle className="text-[14px] text-fg">Nothing here</EmptyTitle>
                <EmptyDescription className="text-[12px]">
                  {filter === "unread"
                    ? "You're caught up on unread activity."
                    : filter === "mentions"
                      ? "No one's mentioned you — quiet day."
                      : "No notifications yet. Deploys, mentions, and secret rotations will land here."}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <>
              {today.length > 0 ? <NotificationGroup label="Today" items={today} /> : null}
              {earlier.length > 0 ? <NotificationGroup label="Earlier" items={earlier} /> : null}
            </>
          )}
        </div>

        <div className="px-3 py-2.5 shadow-[0_-1px_0_var(--color-line)] flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
            <Icon name="check" /> Mark all read
          </Button>
          <button
            type="button"
            className="ml-auto text-[12px] font-medium text-fg-muted hover:text-fg inline-flex items-center gap-1"
          >
            View archive <Icon name="chev" className="rotate-[-90deg]" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NotificationGroup({ label, items }: { label: string; items: readonly Notification[] }) {
  return (
    <div>
      <div className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-subtle font-medium shadow-[0_1px_0_var(--color-line)] bg-bg-subtle">
        {label}
      </div>
      <ul>
        {items.map((n) => (
          <li
            key={n.id}
            className={cn(
              "relative flex gap-3 px-4 py-3 shadow-[0_1px_0_var(--color-line)]",
              "hover:bg-bg-muted transition-colors cursor-pointer",
            )}
          >
            {n.unread ? (
              <span className="absolute left-1.5 top-5 h-1.5 w-1.5 rounded-full bg-accent" />
            ) : null}
            <Avatar
              initials={n.initials}
              size={28}
              tone={n.initials === "··" ? "muted" : "accent"}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5 text-[13px] leading-[1.35]">
                <span className="font-semibold text-fg">{n.actor}</span>
                <span className="text-fg-muted truncate">{n.title}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] font-mono text-fg-subtle">
                <span className={cn(severityTone[n.severity], "inline-flex items-center")}>
                  <Icon name={severityIcon[n.severity]} size={10} />
                </span>
                <span className="truncate">{n.subtitle}</span>
                <span className="ml-auto shrink-0">{n.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
