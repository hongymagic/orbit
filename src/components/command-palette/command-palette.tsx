"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { designNav } from "@/lib/design-nav";
import { Icon, type IconName } from "@/components/icons";
import { ACCENTS, VARIATIONS, useAccent, useTheme, useVariation } from "@/providers";

import { deployments } from "@/data/deployments";
import { services } from "@/data/services";

type CommandPaletteContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return ctx;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandPaletteDialog />
    </CommandPaletteContext.Provider>
  );
}

function CommandPaletteDialog() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();
  const { setTheme } = useTheme();
  const { setAccent } = useAccent();
  const { setVariation } = useVariation();

  const run = useCallback(
    (fn: () => void) => {
      fn();
      setOpen(false);
    },
    [setOpen],
  );

  const navItems = designNav.flatMap((section) =>
    section.items.map((item) => ({ ...item, section: section.label })),
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command palette" description="Search, navigate, or run a command">
      <CommandInput placeholder="Search deployments, services, routes, or commands…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate · design system">
          {navItems.map((item) => (
            <CommandItem
              key={item.key}
              value={`nav ${item.section} ${item.label}`}
              onSelect={() => run(() => router.push(item.href as never))}
            >
              <Icon name={item.icon as IconName} className="mr-2" />
              <span className="flex-1">{item.label}</span>
              <span className="text-[11px] font-mono text-fg-subtle">{item.section}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate · product">
          <CommandItem value="product dashboard" onSelect={() => run(() => router.push("/dashboard"))}>
            <Icon name="dash" className="mr-2" />
            <span>Dashboard</span>
            <CommandShortcut>shadcn block</CommandShortcut>
          </CommandItem>
          <CommandItem value="product login" onSelect={() => run(() => router.push("/login"))}>
            <Icon name="key" className="mr-2" />
            <span>Login</span>
            <CommandShortcut>shadcn block</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Deployments">
          {deployments.map((d) => (
            <CommandItem
              key={d.id}
              value={`deployment ${d.name} ${d.branch} ${d.sha}`}
              onSelect={() => run(() => router.push("/_design/conservative" as never))}
            >
              <Icon name="deploy" className="mr-2" />
              <span className="font-mono">{d.id}</span>
              <CommandShortcut>
                {d.name} · {d.branch}
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Services">
          {services.map((s) => (
            <CommandItem
              key={s.name}
              value={`service ${s.name} ${s.domain}`}
              onSelect={() => run(() => router.push("/_design/confident" as never))}
            >
              <Icon name="globe" className="mr-2" />
              <span>{s.name}</span>
              <CommandShortcut>{s.region}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem value="theme light" onSelect={() => run(() => setTheme("light"))}>
            <Icon name="settings" className="mr-2" />
            <span>Light</span>
          </CommandItem>
          <CommandItem value="theme dark" onSelect={() => run(() => setTheme("dark"))}>
            <Icon name="settings" className="mr-2" />
            <span>Dark</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Accent">
          {ACCENTS.map((a) => (
            <CommandItem
              key={a.name}
              value={`accent ${a.name} ${a.label}`}
              onSelect={() => run(() => setAccent(a.color))}
            >
              <span
                className="mr-2 inline-block w-3 h-3 rounded-pill shadow-[inset_0_0_0_1px_var(--color-line)]"
                style={{ background: a.color }}
              />
              <span>{a.label}</span>
              <CommandShortcut>{a.color}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Variation">
          {VARIATIONS.map((v) => (
            <CommandItem
              key={v.value}
              value={`variation ${v.value} ${v.label}`}
              onSelect={() => run(() => setVariation(v.value))}
            >
              <Icon name="cmd" className="mr-2" />
              <span>{v.label}</span>
              <CommandShortcut>{v.short}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem value="action tweaks" onSelect={() => run(() => window.dispatchEvent(new Event("orbit:open-tweaks")))}>
            <Icon name="settings" className="mr-2" />
            <span>Open Tweaks panel</span>
            <CommandShortcut>⌘.</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
