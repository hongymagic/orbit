import { cn } from "@/lib/utils";

export type LogLevel = "ok" | "info" | "warn" | "error" | "ready" | "pass";

export type LogEntry = {
  time: string;
  level: LogLevel;
  message: React.ReactNode;
};

const levelClass: Record<LogLevel, string> = {
  ok: "text-success",
  info: "text-accent",
  warn: "text-warn",
  error: "text-error",
  ready: "text-success",
  pass: "text-success",
};

export function Console({
  entries,
  maxHeight = 360,
  flush = false,
  className,
}: {
  entries: readonly LogEntry[];
  maxHeight?: number;
  flush?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-[12px] leading-[1.7] overflow-auto",
        flush
          ? undefined
          : "bg-bg-subtle rounded-md px-4 py-3.5 shadow-[inset_0_0_0_1px_var(--color-line)]",
        className,
      )}
      style={{ maxHeight }}
    >
      {entries.map((entry) => (
        <LogRow key={`${entry.time}-${entry.level}`} {...entry} />
      ))}
    </div>
  );
}

export function LogRow({ time, level, message }: LogEntry) {
  return (
    <div className="grid items-baseline" style={{ gridTemplateColumns: "60px 68px 1fr", gap: 14 }}>
      <span className="text-fg-faint text-[11px]">{time}</span>
      <span className={cn("text-[10px] uppercase tracking-[0.08em]", levelClass[level])}>
        {level}
      </span>
      <span className="text-fg">{message}</span>
    </div>
  );
}
