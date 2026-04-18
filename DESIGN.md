# Orbit Design System

A shadow-as-border design system foundation for product surfaces. Next.js 16, React 19, Tailwind v4, shadcn primitives, ai-elements.

This document is the **spec**. The implementation mirrors it exactly — if the two diverge, the code is right and this file needs updating.

Live reference: run `bun dev` and open [`/_design`](http://localhost:3000/_design).

> **Working on this repo?** Start with the [Where to look map in CLAUDE.md](./CLAUDE.md#where-to-look) — it tells you where every spec, route, and reference file lives.

---

## 1. Philosophy

### Shadow-as-border

Every visual boundary in Orbit is a **box-shadow**, not a CSS `border`. Canonical recipe:

```
box-shadow: 0 0 0 1px var(--color-line);            /* ring */
box-shadow: inset 0 0 0 1px var(--color-line);      /* inset ring — buttons, inputs */
```

Cards layer shadow-as-border with ambient softness:

```
--shadow-card:        0 0 0 1px var(--color-line), 0 2px 2px rgb(0 0 0 / 0.02);
--shadow-card-lifted: 0 0 0 1px var(--color-line), 0 2px 2px rgb(0 0 0 / 0.03), 0 8px 16px -8px rgb(0 0 0 / 0.06);
```

**Why not `border`?** Borders participate in the box model (adding pixels, affecting `calc`, clipping children at rounded corners). Shadows render in their own layer, transition cleanly, and let children occupy the full radius without clipping. Use `border` only when you explicitly need the box-model effect.

### Token-driven

Every design value is a CSS custom property in `@theme` (see `src/app/globals.css`). Themes, accents, and variations swap values at the root; components never branch on `theme === "dark"`.

### Three variations, one system

The same component library renders three distinct surface aesthetics:

| Variation        | Intent                                        | When to use                                                    |
| ---------------- | --------------------------------------------- | -------------------------------------------------------------- |
| **Conservative** | Data-dense, table-first, familiar             | Default for operational surfaces (deployments, logs, settings) |
| **Confident**    | Hero-led, bold type, marketing-adjacent       | Overview, onboarding, upsell                                   |
| **Experimental** | Mono-forward, terminal-esque, brutalist table | Oncall, incident, infra-surface ops                            |

Switch via the **Tweaks** panel (⌘.) or by setting `data-variation="…"` on a wrapping element. Variation CSS lives in `globals.css` under `[data-variation="…"] { … }` — components render tokens only, never branch on variation. Keep that separation.

```tsx
<VariationScope variation="experimental">
  <YourPage />
</VariationScope>
```

---

## 2. Tokens

Source: [`src/app/globals.css`](./src/app/globals.css).

### Colors

Neutrals — the only hues in UI chrome:

| Token                 | Light             | Dark                    | Use                            |
| --------------------- | ----------------- | ----------------------- | ------------------------------ |
| `--color-bg`          | `#ffffff`         | `#0b0b0c`               | Page background, card surfaces |
| `--color-bg-subtle`   | `#fafafa`         | `#0f0f11`               | Sidebar, subtle surface tint   |
| `--color-bg-muted`    | `#f5f5f5`         | `#141416`               | Input, hover, muted row        |
| `--color-fg`          | `#151515`         | `#f2f2f3`               | Primary text, headings         |
| `--color-fg-muted`    | `#525252`         | `#a0a0a5`               | Secondary text, description    |
| `--color-fg-subtle`   | `#8a8a8a`         | `#6e6e74`               | Tertiary text, captions        |
| `--color-fg-faint`    | `#b5b5b5`         | `#474749`               | Placeholder, disabled          |
| `--color-line`        | `rgb(0 0 0/0.08)` | `rgb(255 255 255/0.08)` | Standard ring                  |
| `--color-line-strong` | `rgb(0 0 0/0.14)` | `rgb(255 255 255/0.14)` | Hover/focus ring               |
| `--color-line-subtle` | `rgb(0 0 0/0.04)` | `rgb(255 255 255/0.04)` | Row divider                    |

**Accent** — swappable at runtime; the only non-neutral in main UI chrome:

| Token                   | Value               | Use                                         |
| ----------------------- | ------------------- | ------------------------------------------- |
| `--color-accent`        | `#7a5cff` (default) | Interactive emphasis, primary action, links |
| `--color-accent-fg`     | `#ffffff`           | Text on accent surfaces                     |
| `--color-accent-soft`   | `color-mix(…10%)`   | Soft-filled badge, pill                     |
| `--color-accent-soft-2` | `color-mix(…16%)`   | Selection highlight                         |
| `--color-accent-ring`   | `color-mix(…30%)`   | Focus ring                                  |

Change globally via `AccentProvider` or the Tweaks panel. Presets: [`src/providers/accent-provider.tsx`](./src/providers/accent-provider.tsx) (`ACCENTS`).

**Workflow colors** — only inside the `Pipeline` component:

| Token             | Value     | Stage   |
| ----------------- | --------- | ------- |
| `--color-develop` | `#0a72ef` | Develop |
| `--color-preview` | `#de1d8d` | Preview |
| `--color-ship`    | `#ff5b4f` | Ship    |

**Semantic** — status only, never decorative:

| Token             | Value     |
| ----------------- | --------- |
| `--color-success` | `#0f9d58` |
| `--color-warn`    | `#d97706` |
| `--color-error`   | `#dc2626` |

### Radii

| Token           | Value  | Use                                   |
| --------------- | ------ | ------------------------------------- |
| `--radius-xs`   | 4px    | Inline chips, micro containers        |
| `--radius-sm`   | 6px    | Buttons, inputs, interactive elements |
| `--radius-md`   | 8px    | Cards, panels                         |
| `--radius-lg`   | 12px   | Hero surfaces, featured cards         |
| `--radius-xl`   | 16px   | Large composite surfaces              |
| `--radius-pill` | 9999px | Badges, avatars, status pills         |

### Shadow recipes

| Token                  | Use                                            |
| ---------------------- | ---------------------------------------------- |
| `--shadow-ring-1`      | Inset 1px border on buttons, inputs, tabs      |
| `--shadow-ring-2`      | Inset 1px stronger border — hover/focus states |
| `--shadow-card`        | Standard card — ring + minimal ambient         |
| `--shadow-card-lifted` | Featured card — ring + ambient + distance blur |

### Typography

Fonts are wired in [`src/app/layout.tsx`](./src/app/layout.tsx) via `geist/font/sans` and `geist/font/mono`, exposed as `--font-geist-sans` / `--font-geist-mono`, picked up by `--font-sans` / `--font-mono`.

Three weights only: **400** (body), **500** (UI), **600** (headings). Never 700. OpenType features on globally: `"liga"`, `"calt"`, `"ss01"`. Base tracking: `-0.01em`.

| Utility             | Spec                                     |
| ------------------- | ---------------------------------------- |
| `text-h1`           | 28px / 1.15 / -0.03em / 600              |
| `text-h2`           | 20px / 1.2 / -0.02em / 600               |
| `text-h3`           | 15px / -0.015em / 600                    |
| `text-kicker`       | 11px mono, uppercase, +0.08em, fg-subtle |
| `text-mono-caption` | 12px mono / 500                          |

Letter-spacing scales inversely with size. At display sizes (44px+), push to `-0.035em`.

---

## 3. Component inventory

**Orbit atoms** — no Radix, tokens-only, opinionated 4-variant APIs:

| Component                        | Path                                 | Variants                                                           |
| -------------------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| `Button` / `buttonStyles`        | `src/components/orbit/button.tsx`    | `default · primary · accent · ghost` × `sm · md · lg` + `iconOnly` |
| `Badge`                          | `src/components/orbit/badge.tsx`     | `neutral · ok · warn · err · info` × `solid` + `dot`               |
| `Card` / `CardHead` / `CardBody` | `src/components/orbit/card.tsx`      | `lifted`, `pad`                                                    |
| `Sparkline`                      | `src/components/orbit/sparkline.tsx` | `area`, custom `color`                                             |
| `Metric` / `MetricGrid`          | `src/components/orbit/metric.tsx`    | `withGridBg` (experimental variation)                              |

**Layout** — app shell + composition (`src/components/layout/`): `Sidebar`, `DesignSidebar` (for `/_design`), `Topbar`, `AppShell`, `Page` / `PageHead`, `Grid` / `GridSplit`, `VariationScope`, `BrandMark` / `Avatar`.

**Data / composites** — domain-neutral building blocks:

| Component                                     | Path                                   | Notes                                                |
| --------------------------------------------- | -------------------------------------- | ---------------------------------------------------- |
| `DataTable<T>`                                | `src/components/data/data-table.tsx`   | Generic column defs, `mono` + `dense` modes          |
| `Pipeline` / `PipelineStep` / `PipelineArrow` | `src/components/data/pipeline.tsx`     | `stage` prop enforces workflow colors                |
| `Console` / `LogRow`                          | `src/components/data/console.tsx`      | Typed `LogLevel` union                               |
| `Activity`                                    | `src/components/data/activity.tsx`     | Avatar + actor + verb + object + time                |
| `CodeSnippet`                                 | `src/components/data/code-snippet.tsx` | Static code block, inline `.code-c/-k/-s/-n` classes |

**shadcn primitives** — Radix-backed, restyled via the token bridge in `globals.css` (`--color-background` → `--color-bg`, …). Location: [`src/components/ui/`](./src/components/ui/). Covers Dialog, Popover, DropdownMenu, Tabs, Tooltip, Command, ScrollArea, Sheet, Select, Avatar, Collapsible, Combobox, and AI-specific primitives (ButtonGroup, InputGroup, HoverCard, Spinner, Kbd, …). Also contains shadcn's own `Button`/`Badge`/`Card` — used internally by blocks and ai-elements. Product code picks between these (flexible shadcn API) and Orbit's (opinionated 4-variant API) by use case.

**ai-elements** — Vercel's AI UI kit, vendored at [`src/components/ai-elements/`](./src/components/ai-elements/). 48 components covering Conversation, Message, PromptInput, CodeBlock, Tool, Artifact, Sandbox, Terminal, etc. All compose shadcn primitives, so they inherit Orbit tokens automatically.

**Icons** — [`src/components/icons.tsx`](./src/components/icons.tsx). 18 bespoke 16×16 stroke icons with `IconName` union. Usage: `<Icon name="deploy" />` — never inline SVG in components. To add: append to `paths` record, extend the union, re-run typecheck.

---

## 4. Providers & state

Three independent providers, composed in [`src/providers/index.tsx`](./src/providers/index.tsx):

| Provider            | Controls                                              | Storage key       |
| ------------------- | ----------------------------------------------------- | ----------------- |
| `ThemeProvider`     | `data-theme` on `<html>` + `color-scheme`             | `orbit:theme`     |
| `AccentProvider`    | `--color-accent` on `<html>`                          | `orbit:accent`    |
| `VariationProvider` | Returns `variation` to consumers (e.g. `TweaksPanel`) | `orbit:variation` |

Each provider emits a **no-flash script** (`ThemeNoFlashScript`, `AccentNoFlashScript`) that runs before hydration — first paint never shows the wrong theme.

The Tweaks panel: [`src/components/tweaks/tweaks-panel.tsx`](./src/components/tweaks/tweaks-panel.tsx). Toggle with **⌘.** or `?tweaks=1`.

---

## 5. Routes

Product vs design-reference split is documented in [`README.md § Routes`](./README.md#routes). Key rule: `/_design/*` is the internal gallery (canonical usage examples, backed by `src/app/design/`); product routes live directly under `src/app/`. Copy a surface from `src/components/surfaces/*` into a product route — it just works.

`/api/chat` ([`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts)) is a stub that returns 501. Wire to a real provider via `@/integrations/ai` (see [`src/integrations/README.md`](./src/integrations/README.md)).

---

## 6. Do's and don'ts

### Do

- Use `box-shadow: 0 0 0 1px var(--color-line)` instead of `border: 1px solid …`
- Reach for `shadow-[inset_0_0_0_1px_var(--color-line)]` on one-off shadow rings
- Use the `Icon` component + `IconName` union — never inline SVGs in product surfaces
- Import Orbit atoms from `@/components/orbit/*` (opinionated: `default/primary/accent/ghost`)
- Import shadcn primitives from `@/components/ui/*` (canonical alias; used by blocks and ai-elements)
- Use `font-mono` for technical labels, counts, timestamps, identifiers
- Keep weight hierarchy to 400 / 500 / 600
- Add new icons to `icons.tsx`; keep the bespoke stroke weight (1.5) consistent

### Don't

- Use CSS `border` on cards, inputs, sidebars — use shadow
- Introduce weight 700 — use size for hierarchy
- Use workflow colors (`--color-develop/preview/ship`) for decoration — only Pipeline stages
- Use `text-primary`, `bg-card`, etc. from shadcn's default vocabulary in **Orbit-authored** components — use Orbit tokens (`text-fg`, `bg-bg`) directly. shadcn's own files in `@/components/ui/*` may keep their original class names; the token bridge in `globals.css` remaps them at runtime.
- Add a new provider when an existing token swap can do the job
- Put variation-specific styles into component files — they live in `globals.css` under `[data-variation="…"]`

See [`CLAUDE.md`](./CLAUDE.md) for the agent-facing guardrails (import rules, forbidden edits, git hooks).

---

## 7. Adding a component

1. Place the file:
   - Pure visual atom → `src/components/orbit/` (or `src/components/ui/` for shadcn-style)
   - Layout / shell → `src/components/layout/`
   - Data / composite → `src/components/data/`
2. Tokens only (`var(--color-fg)`, `bg-bg-muted`, …). No literal hexes in the component.
3. If it has variants, use `cva` from `class-variance-authority` — match existing atoms' style.
4. Add a demo section to `/_design/components` (`src/app/design/components/page.tsx`) — every variant must render there. The page doubles as the visual regression baseline.
5. `bun run typecheck && bun run build` — both must pass before merging.

---

## 8. Stack & credits

Exact versions in [`package.json`](./package.json) (no `^` / `~` ranges; `bunfig.toml` + `.npmrc` enforce). Key requirements: **Node 22+** (Tailwind v4 requirement), **Bun 1.3+** as package manager, Turbopack enabled by default in `next dev` and `next build`. Don't mix with npm/pnpm.

Shadow-as-border, the 3-weight type rule, and the "gallery emptiness" spacing are directly inspired by [Vercel's Geist design system](https://vercel.com/design/geist). Orbit diverges by (a) exposing every token as runtime-swappable CSS variables, (b) shipping three first-class layout variations, and (c) integrating ai-elements as a styled first-class surface. Accent swatches, workflow colors, and data shape are Orbit-original.
