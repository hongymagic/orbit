"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete deployment</DialogTitle>
          <DialogDescription>
            This removes the preview URL permanently. Any links in open PRs will break.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Deployment details</SheetTitle>
          <SheetDescription>atlas-web · dpl_x8Ra · production</SheetDescription>
        </SheetHeader>
        <div className="px-4 text-sm text-muted-foreground">
          Sheet body content. Great for detail views, filters, or side panels.
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit target</DrawerTitle>
          <DrawerDescription>Set a rollout percentage for dpl_x8Ra.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          Vaul-powered drawer — matches iOS sheet affordance on mobile.
        </div>
        <DrawerFooter>
          <Button>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 text-sm">
        <div className="font-medium mb-1">Promote dpl_x8Ra?</div>
        <p className="text-muted-foreground">This makes it the production alias for atlas-web.</p>
      </PopoverContent>
    </Popover>
  );
}

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@rhea.lin</Button>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm">
        <div className="font-medium">Rhea Lin</div>
        <div className="text-muted-foreground">platform · admin · iad1</div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Opens the command palette (⌘K)</TooltipContent>
    </Tooltip>
  );
}

export function DropdownMenuDemo() {
  const [sticky, setSticky] = React.useState(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={sticky} onCheckedChange={setSticky}>
          Sticky headers
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function CommandDemo() {
  return (
    <Command className="rounded-md shadow-[inset_0_0_0_1px_var(--color-line)] max-w-md">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Shortcuts">
          <CommandItem>
            Open search
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Deploy current branch
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          <CommandItem>atlas-web</CommandItem>
          <CommandItem>atlas-api</CommandItem>
          <CommandItem>atlas-edge</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

const REGIONS = ["Washington · iad1", "San Francisco · sfo1", "Paris · cdg1", "Sydney · syd1"];

export function ComboboxDemo() {
  return (
    <Combobox items={REGIONS}>
      <ComboboxInput placeholder="Select region…" className="w-[240px]" />
      <ComboboxContent>
        <ComboboxEmpty>No regions match.</ComboboxEmpty>
        <ComboboxList>
          {(region: string) => (
            <ComboboxItem key={region} value={region}>
              {region}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
