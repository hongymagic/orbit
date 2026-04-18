import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Providers } from "@/providers";
import { AccentNoFlashScript } from "@/providers/accent-provider";
import { ThemeNoFlashScript } from "@/providers/theme-provider";

// oxlint-disable-next-line import/no-unassigned-import -- required side-effect import for Tailwind layer
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Orbit — Design System",
    template: "%s · Orbit",
  },
  description:
    "A shadow-as-border design system foundation. Next.js 16, Tailwind v4, shadcn, ai-elements.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeNoFlashScript />
        <AccentNoFlashScript />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
