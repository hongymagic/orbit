import { cn } from "@/lib/cn";

export type ActivityEvent = {
  initials: string;
  actor: string;
  verb: React.ReactNode;
  object: React.ReactNode;
  time: string;
};

export function Activity({
  events,
  className,
}: {
  events: readonly ActivityEvent[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {events.map((event, i) => (
        <div
          key={i}
          className={cn(
            "grid items-center gap-2.5 px-4 py-2.5",
            "shadow-[0_1px_0_var(--color-line-subtle)] last:shadow-none",
          )}
          style={{ gridTemplateColumns: "28px 1fr auto" }}
        >
          <div className="grid place-items-center w-[22px] h-[22px] rounded-pill bg-bg-muted shadow-[inset_0_0_0_1px_var(--color-line)] text-[10px] font-semibold text-fg-muted">
            {event.initials}
          </div>
          <div className="text-[13px] text-fg min-w-0 truncate">
            <span className="font-semibold">{event.actor}</span>{" "}
            <span className="text-fg-muted">{event.verb}</span>{" "}
            <span className="font-mono text-[12px] text-fg-muted">{event.object}</span>
          </div>
          <div className="font-mono text-[11px] text-fg-subtle">{event.time}</div>
        </div>
      ))}
    </div>
  );
}
