"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { useCommandPalette } from "@/components/command-palette/command-palette";
import { ACCENTS, VARIATIONS, useAccent, useTheme, useVariation } from "@/providers";

import { Avatar } from "./brand-mark";

export type ProfileUser = {
  initials: string;
  name: string;
  email: string;
  role?: string;
};

export function ProfileMenu({
  user = {
    initials: "RL",
    name: "Rhea Lin",
    email: "rhea@orbit.app",
    role: "platform · admin",
  },
  className,
}: {
  user?: ProfileUser;
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const { accent, setAccent } = useAccent();
  const { variation, setVariation } = useVariation();
  const { setOpen: setPaletteOpen } = useCommandPalette();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2.5 px-2 py-1.5 rounded-sm w-full text-left",
            "hover:bg-bg-muted cursor-pointer transition-colors",
            className,
          )}
        >
          <Avatar initials={user.initials} />
          <div className="leading-[1.2] min-w-0">
            <div className="text-[13px] font-medium truncate">{user.name}</div>
            <div className="text-[11px] text-fg-subtle font-mono truncate">
              {user.role ?? user.email}
            </div>
          </div>
          <div className="ml-auto text-fg-faint">
            <Icon name="chev" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-medium">{user.name}</span>
            <span className="text-[11px] font-mono text-fg-subtle">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/settings" as never}>
              <Icon name="team" />
              Account
              <DropdownMenuShortcut>/settings</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/billing" as never}>
              <Icon name="key" />
              Billing
              <DropdownMenuShortcut>/billing</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/settings#team" as never}>
              <Icon name="team" />
              Team settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => setPaletteOpen(true)}>
          <Icon name="search" />
          Command palette
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon name="settings" />
            Theme
            <span className="ml-auto text-[11px] font-mono text-fg-subtle capitalize">{theme}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(v) => setTheme(v as "light" | "dark")}
              >
                <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span
              className="h-3 w-3 rounded-pill shadow-[inset_0_0_0_1px_var(--color-line)]"
              style={{ background: accent }}
            />
            Accent
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {ACCENTS.map((a) => (
                <DropdownMenuItem key={a.name} onSelect={() => setAccent(a.color)}>
                  <span
                    className="h-3 w-3 rounded-pill shadow-[inset_0_0_0_1px_var(--color-line)]"
                    style={{ background: a.color }}
                  />
                  {a.label}
                  {accent.toLowerCase() === a.color.toLowerCase() ? (
                    <span className="ml-auto text-fg-muted">
                      <Icon name="check" />
                    </span>
                  ) : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon name="cmd" />
            Variation
            <span className="ml-auto text-[11px] font-mono text-fg-subtle capitalize">
              {variation}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={variation}
                onValueChange={(v) => setVariation(v as typeof variation)}
              >
                {VARIATIONS.map((v) => (
                  <DropdownMenuRadioItem key={v.value} value={v.value}>
                    {v.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <Icon name="x" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
