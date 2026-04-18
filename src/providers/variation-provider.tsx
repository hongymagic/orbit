"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Variation = "conservative" | "confident" | "experimental";

export const VARIATIONS: readonly { value: Variation; label: string; short: string }[] = [
  { value: "conservative", label: "Conservative", short: "Safe" },
  { value: "confident",    label: "Confident",    short: "Bold" },
  { value: "experimental", label: "Experimental", short: "Lab" },
] as const;

type VariationContextValue = {
  variation: Variation;
  setVariation: (next: Variation) => void;
};

const VariationContext = createContext<VariationContextValue | null>(null);

const STORAGE_KEY = "orbit:variation";
const DEFAULT_VARIATION: Variation = "conservative";

export function VariationProvider({
  children,
  defaultVariation = DEFAULT_VARIATION,
}: {
  children: React.ReactNode;
  defaultVariation?: Variation;
}) {
  const [variation, setVariationState] = useState<Variation>(defaultVariation);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "conservative" || stored === "confident" || stored === "experimental") {
        setVariationState(stored);
      }
    } catch {}
  }, []);

  const setVariation = useCallback((next: Variation) => {
    setVariationState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  return (
    <VariationContext.Provider value={{ variation, setVariation }}>
      {children}
    </VariationContext.Provider>
  );
}

export function useVariation() {
  const ctx = useContext(VariationContext);
  if (!ctx) throw new Error("useVariation must be used within VariationProvider");
  return ctx;
}
