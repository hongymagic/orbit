"use client";

import { useEffect, useRef } from "react";

export type HotkeyModifier = "meta" | "ctrl" | "alt" | "shift";

export type HotkeyDescriptor = {
  key: string;
  modifiers?: readonly HotkeyModifier[];
};

function matches(e: KeyboardEvent, descriptor: HotkeyDescriptor) {
  const mods = new Set(descriptor.modifiers ?? []);
  if ((mods.has("meta") || mods.has("ctrl")) && !(e.metaKey || e.ctrlKey)) return false;
  if (mods.has("alt") && !e.altKey) return false;
  if (mods.has("shift") && !e.shiftKey) return false;
  return e.key.toLowerCase() === descriptor.key.toLowerCase();
}

export function useHotkey(descriptor: HotkeyDescriptor, handler: (e: KeyboardEvent) => void) {
  const descriptorRef = useRef(descriptor);
  const handlerRef = useRef(handler);

  descriptorRef.current = descriptor;
  handlerRef.current = handler;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (matches(e, descriptorRef.current)) {
        e.preventDefault();
        handlerRef.current(e);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
