"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type AccentName = "indigo" | "violet" | "emerald" | "rose" | "amber" | "mono";

export type Accent = {
  name: AccentName;
  color: string;
  label: string;
};

export const ACCENTS: readonly Accent[] = [
  { name: "indigo", color: "#3b5bff", label: "Indigo" },
  { name: "violet", color: "#7a5cff", label: "Violet" },
  { name: "emerald", color: "#10a37f", label: "Emerald" },
  { name: "rose", color: "#e5484d", label: "Rose" },
  { name: "amber", color: "#e08600", label: "Amber" },
  { name: "mono", color: "#171717", label: "Mono" },
] as const;

type AccentContextValue = {
  accent: string;
  accentName: AccentName | "custom";
  setAccent: (hex: string) => void;
  setAccentByName: (name: AccentName) => void;
};

const AccentContext = createContext<AccentContextValue | null>(null);

const STORAGE_KEY = "orbit:accent";
const DEFAULT_ACCENT = "#7a5cff";

export function AccentProvider({
  children,
  defaultAccent = DEFAULT_ACCENT,
}: {
  children: React.ReactNode;
  defaultAccent?: string;
}) {
  const [accent, setAccentState] = useState<string>(defaultAccent);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && /^#[0-9a-f]{6}$/i.test(stored)) setAccentState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", accent);
  }, [accent]);

  const setAccent = useCallback((hex: string) => {
    setAccentState(hex);
    try {
      window.localStorage.setItem(STORAGE_KEY, hex);
    } catch {}
  }, []);

  const setAccentByName = useCallback(
    (name: AccentName) => {
      const match = ACCENTS.find((a) => a.name === name);
      if (match) setAccent(match.color);
    },
    [setAccent],
  );

  const accentName: AccentName | "custom" =
    ACCENTS.find((a) => a.color.toLowerCase() === accent.toLowerCase())?.name ?? "custom";

  const value = useMemo(
    () => ({ accent, accentName, setAccent, setAccentByName }),
    [accent, accentName, setAccent, setAccentByName],
  );

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within AccentProvider");
  return ctx;
}

export function AccentNoFlashScript({
  defaultAccent = DEFAULT_ACCENT,
}: {
  defaultAccent?: string;
}) {
  const code = `
(function(){
  try {
    var a = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    if (!a || !/^#[0-9a-f]{6}$/i.test(a)) a = ${JSON.stringify(defaultAccent)};
    document.documentElement.style.setProperty('--color-accent', a);
  } catch(e) {
    document.documentElement.style.setProperty('--color-accent', ${JSON.stringify(defaultAccent)});
  }
})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
