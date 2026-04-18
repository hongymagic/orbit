import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icons";

export default function HomePage() {
  return (
    <main className="min-h-screen grid place-items-center px-6 bg-bg text-fg">
      <div className="max-w-[640px] w-full">
        <div className="text-kicker mb-3">Orbit · Foundation</div>
        <h1 className="text-h1 mb-4">
          A design-system foundation, not an app.
        </h1>
        <p className="text-[16px] text-fg-muted leading-[1.7] mb-6">
          This repo is a <span className="font-mono text-fg">Next.js 16</span> scaffold
          with <span className="font-mono text-fg">Tailwind v4</span>,{" "}
          <span className="font-mono text-fg">shadcn</span> primitives, and{" "}
          <span className="font-mono text-fg">ai-elements</span> all re-skinned to
          the Orbit shadow-as-border token layer. Build the real product on top.
        </p>

        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <Badge tone="info" dot>Geist</Badge>
          <Badge tone="info" dot>Tailwind v4</Badge>
          <Badge tone="info" dot>Bun</Badge>
          <Badge tone="info" dot>shadcn</Badge>
          <Badge tone="info" dot>ai-elements</Badge>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/_design"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-sm bg-fg text-bg font-medium text-[14px] hover:opacity-90"
          >
            <Icon name="dash" /> Open /_design
          </Link>
          <Link
            href="/_design/tokens"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-sm font-medium text-[14px] text-fg-muted hover:text-fg shadow-[inset_0_0_0_1px_var(--color-line)]"
          >
            Start with tokens
          </Link>
          <Link
            href="/_design/components"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-sm font-medium text-[14px] text-fg-muted hover:text-fg shadow-[inset_0_0_0_1px_var(--color-line)]"
          >
            Browse components
          </Link>
        </div>

        <div className="mt-10 pt-5 font-mono text-[12px] text-fg-subtle shadow-[0_-1px_0_var(--color-line-subtle)]">
          Press ⌘. inside /_design to toggle the Tweaks panel (theme · accent · variation).
        </div>
      </div>
    </main>
  );
}
