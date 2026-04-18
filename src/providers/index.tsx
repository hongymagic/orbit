"use client";

import { TooltipProvider } from "@/components/shadcn/tooltip";
import { Toaster } from "@/components/shadcn/sonner";

import { AccentProvider } from "./accent-provider";
import { ThemeProvider } from "./theme-provider";
import { VariationProvider } from "./variation-provider";

export { useTheme } from "./theme-provider";
export { useAccent, ACCENTS } from "./accent-provider";
export { useVariation, VARIATIONS } from "./variation-provider";
export type { Theme } from "./theme-provider";
export type { Accent, AccentName } from "./accent-provider";
export type { Variation } from "./variation-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AccentProvider>
        <VariationProvider>
          <TooltipProvider delayDuration={200}>
            {children}
            <Toaster />
          </TooltipProvider>
        </VariationProvider>
      </AccentProvider>
    </ThemeProvider>
  );
}
