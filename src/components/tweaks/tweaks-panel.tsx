"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useHotkey } from "@/lib/use-hotkey";
import { Icon } from "@/components/icons";
import { Button } from "@/components/orbit/button";
import { ACCENTS, VARIATIONS, useAccent, useTheme, useVariation } from "@/providers";

export function TweaksPanel({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);

  useHotkey({ key: ".", modifiers: ["meta"] }, () => setOpen((o) => !o));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("tweaks") === "1") setOpen(true);

    const handleOpenEvent = () => setOpen(true);
    window.addEventListener("orbit:open-tweaks", handleOpenEvent);
    return () => window.removeEventListener("orbit:open-tweaks", handleOpenEvent);
  }, []);

  const { theme, setTheme } = useTheme();
  const { accent, setAccent } = useAccent();
  const { variation, setVariation } = useVariation();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed right-4 bottom-4 z-40 h-8 w-8 rounded-pill bg-bg",
          "shadow-[0_0_0_1px_var(--color-line),0_2px_2px_rgb(0_0_0/0.08)]",
          "grid place-items-center text-fg-muted hover:text-fg cursor-pointer",
          open && "opacity-0 pointer-events-none",
        )}
        aria-label="Open tweaks"
        title="Tweaks (⌘.)"
      >
        <Icon name="settings" />
      </button>

      <div
        className={cn(
          "fixed right-4 bottom-4 z-50 w-[280px]",
          "bg-bg rounded-md p-3.5",
          "shadow-[0_0_0_1px_var(--color-line),0_2px_2px_rgb(0_0_0/0.03),0_8px_16px_-8px_rgb(0_0_0/0.08)]",
          open ? "block" : "hidden",
        )}
        role="dialog"
        aria-label="Tweaks"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            Tweaks
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={() => setOpen(false)}
            aria-label="Close tweaks"
          >
            <Icon name="x" />
          </Button>
        </div>

        <Row label="Theme">
          <Segment
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            value={theme}
            onChange={(v) => setTheme(v as "light" | "dark")}
          />
        </Row>

        <Row label="Accent">
          <div className="inline-flex gap-1.5">
            {ACCENTS.map((a) => {
              const selected = accent.toLowerCase() === a.color.toLowerCase();
              return (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setAccent(a.color)}
                  title={a.label}
                  aria-label={a.label}
                  aria-pressed={selected}
                  className={cn(
                    "w-5 h-5 rounded-pill cursor-pointer transition-transform duration-100",
                    "shadow-[inset_0_0_0_1px_var(--color-line)]",
                    selected && "shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-fg)]",
                    "hover:scale-110",
                  )}
                  style={{ background: a.color }}
                />
              );
            })}
          </div>
        </Row>

        <Row label="Variation" last>
          <Segment
            options={VARIATIONS.map((v) => ({ value: v.value, label: v.short }))}
            value={variation}
            onChange={(v) => setVariation(v as typeof variation)}
          />
        </Row>

        <div className="mt-2.5 text-[11px] text-fg-subtle font-mono">
          ⌘. to toggle · ?tweaks=1 to open
        </div>
      </div>
    </>
  );
}

function Row({
  label,
  last,
  children,
}: {
  label: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2",
        !last && "shadow-[0_1px_0_var(--color-line-subtle)]",
      )}
    >
      <label className="text-[13px] font-medium">{label}</label>
      {children}
    </div>
  );
}

function Segment<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      className={cn(
        "inline-flex rounded-sm overflow-hidden",
        "shadow-[inset_0_0_0_1px_var(--color-line)]",
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-6 px-2.5 text-[12px] font-medium cursor-pointer transition-colors",
              selected ? "bg-fg text-bg" : "bg-transparent text-fg-muted hover:text-fg",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
