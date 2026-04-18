import { cn } from "@/lib/utils";

export type PipelineStage = "develop" | "preview" | "ship";

const stageColor: Record<PipelineStage, string> = {
  develop: "text-develop",
  preview: "text-preview",
  ship:    "text-ship",
};

export function Pipeline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 16px 1fr 16px 1fr",
        alignItems: "stretch",
      }}
    >
      {children}
    </div>
  );
}

export function PipelineStep({
  stage,
  title,
  sub,
  label,
}: {
  stage: PipelineStage;
  title: React.ReactNode;
  sub?: React.ReactNode;
  label?: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3.5 bg-bg rounded-md shadow-[inset_0_0_0_1px_var(--color-line)]">
      <div className={cn("text-kicker mb-1.5", stageColor[stage])}>
        {label ?? stage}
      </div>
      <div className="text-[14px] font-semibold tracking-[-0.01em] mb-1">{title}</div>
      {sub ? <div className="text-[12px] text-fg-muted">{sub}</div> : null}
    </div>
  );
}

export function PipelineArrow() {
  return (
    <div className="self-center text-center text-fg-faint font-mono">→</div>
  );
}
