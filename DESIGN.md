# Orbit Design System

A shadow-as-border design system foundation for product surfaces. Next.js 16, React 19, Tailwind v4, shadcn primitives, ai-elements.

This document is the **spec**. The implementation mirrors it exactly — if the two diverge, the code is right and this file needs updating.

Live reference: run `bun dev` and open [`/_design`](http://localhost:3000/_design).

---

## 1. Philosophy

### Shadow-as-border
Every visual boundary in Orbit is a **box-shadow**, not a CSS `border`. The canonical recipe:

```
box-shadow: 0 0 0 1px var(--color-line);            /* ring */
box-shadow: inset 0 0 0 1px var(--color-line);      /* inset ring — buttons, inputs */
```

Cards layer shadow-as-border with ambient softness:

```
--shadow-card:        0 0 0 1px var(--color-line), 0 2px 2px rgb(0 0 0 / 0.02);
--shadow-card-lifted: 0 0 0 1px var(--color-line), 0 2px 2px rgb(0 0 0 / 0.03), 0 8px 16px -8px rgb(0 0 0 / 0.06);
```

**Why not `border`?** Borders participate in the box model (adding pixels, affecting `calc`, clipping children at rounded corners). Shadows don't — they render in their own layer, transition cleanly, and let children occupy the full radius without clipping. Use `border` only when you explicitly need the box-model effect.

### Token-driven
Every design value is a CSS custom property in `@theme` (see `src/app/globals.css`). Themes, accents, and variations swap values at the root; components never branch on `theme === "dark"`.

### Three variations, one system
The same component library renders three distinct surface aesthetics:

| Variation | Intent | When to use |
|-----------|--------|-------------|
| **Conservative** | Data-dense, table-first, familiar | Default for operational surfaces (deployments, logs, settings) |
| **Confident**    | Hero-led, bold type, marketing-adjacent | Overview, onboarding, upsell surfaces |
| **Experimental** | Mono-forward, terminal-esque, brutalist table | Oncall, incident, infra-surface ops |

Switch variation with the **Tweaks** panel (⌘.) or by setting `data-variation="…"` on a wrapping element. Variation-specific CSS is in `globals.css` under `[data-variation="…"] { … }`.

---

## 2. Tokens

Source: [`src/app/globals.css`](./src/app/globals.css).

### Colors

Neutrals — the only hues that form UI chrome:

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--color-bg`        | `#ffffff` | `#0b0b0c` | Page background, card surfaces |
| `--color-bg-subtle` | `#fafafa` | `#0f0f11` | Sidebar, subtle surface tint |
| `--color-bg-muted`  | `#f5f5f5` | `#141416` | Input, hover, muted row |
| `--color-fg`        | `#151515` | `#f2f2f3` | Primary text, headings |
| `--color-fg-muted`  | `#525252` | `#a0a0a5` | Secondary text, description |
| `--color-fg-subtle` | `#8a8a8a` | `#6e6e74` | Tertiary text, captions |
| `--color-fg-faint`  | `#b5b5b5` | `#474749` | Placeholder, disabled |
| `--color-line`        | `rgb(0 0 0/0.08)` | `rgb(255 255 255/0.08)` | Standard ring |
| `--color-line-strong` | `rgb(0 0 0/0.14)` | `rgb(255 255 255/0.14)` | Hover/focus ring |
| `--color-line-subtle` | `rgb(0 0 0/0.04)` | `rgb(255 255 255/0.04)` | Row divider |

**Accent** — swappable at runtime. The only non-neutral color in the main UI chrome:

| Token | Value | Use |
|-------|-------|-----|
| `--color-accent`        | `#7a5cff` (default) | Interactive emphasis, primary action, links |
| `--color-accent-fg`     | `#ffffff`           | Text on accent surfaces |
| `--color-accent-soft`   | `color-mix(…10%)`   | Soft-filled badge, pill |
| `--color-accent-soft-2` | `color-mix(…16%)`   | Selection highlight |
| `--color-accent-ring`   | `color-mix(…30%)`   | Focus ring |

Use `AccentProvider` or the Tweaks panel to change `--color-accent` globally. Preset swatches live in [`src/providers/accent-provider.tsx`](./src/providers/accent-provider.tsx) (`ACCENTS`).

**Workflow colors** — only used inside the `Pipeline` component:

| Token | Value | Stage |
|-------|-------|-------|
| `--color-develop` | `#0a72ef` | Develop |
| `--color-preview` | `#de1d8d` | Preview |
| `--color-ship`    | `#ff5b4f` | Ship |

**Semantic** — status only, never decorative:

| Token | Value |
|-------|-------|
| `--color-success` | `#0f9d58` |
| `--color-warn`    | `#d97706` |
| `--color-error`   | `#dc2626` |

### Radii

| Token | Value | Use |
|-------|-------|-----|
| `--radius-xs`   | 4px    | Inline chips, micro containers |
| `--radius-sm`   | 6px    | Buttons, inputs, interactive elements |
| `--radius-md`   | 8px    | Cards, panels |
| `--radius-lg`   | 12px   | Hero surfaces, featured cards |
| `--radius-xl`   | 16px   | Large composite surfaces |
| `--radius-pill` | 9999px | Badges, avatars, status pills |

### Shadow recipes

| Token | Use |
|-------|-----|
| `--shadow-ring-1` | Inset 1px border on buttons, inputs, tabs |
| `--shadow-ring-2` | Inset 1px stronger border — hover/focus states |
| `--shadow-card`   | Standard card — ring + minimal ambient |
| `--shadow-card-lifted` | Featured card — ring + ambient + distance blur |

### Typography

Fonts are wired in [`src/app/layout.tsx`](./src/app/layout.tsx) via `geist/font/sans` and `geist/font/mono`, exposed as `--font-geist-sans` and `--font-geist-mono`, picked up by `--font-sans` / `--font-mono` tokens.

Three weights only: **400** (body), **500** (UI), **600** (headings). Never 700.

OpenType features on globally: `"liga"`, `"calt"`, `"ss01"`. Base tracking: `-0.01em`.

Type utilities (in `globals.css`):

| Utility | Spec |
|---------|------|
| `text-h1`     | 28px / 1.15 / -0.03em / 600 |
| `text-h2`     | 20px / 1.2  / -0.02em / 600 |
| `text-h3`     | 15px / -0.015em / 600 |
| `text-kicker` | 11px mono, uppercase, +0.08em, fg-subtle |
| `text-mono-caption` | 12px mono / 500 |

Letter-spacing scales inversely with size. At display sizes (44px+), push to `-0.035em`.

---

## 3. Component inventory

**Atoms** — no Radix dependency, tokens-only:

| Component | Path | Variants |
|-----------|------|----------|
| `Button` / `buttonStyles` | `src/components/ui/button.tsx` | `default · primary · accent · ghost` × `sm · md · lg` + `iconOnly` |
| `Badge` | `src/components/ui/badge.tsx` | `neutral · ok · warn · err · info` × `solid` + `dot` |
| `Card` / `CardHead` / `CardBody` | `src/components/ui/card.tsx` | `lifted`, `pad` |
| `Sparkline` | `src/components/ui/sparkline.tsx` | `area`, custom `color` |
| `Metric` / `MetricGrid` | `src/components/ui/metric.tsx` | `withGridBg` (experimental variation) |

**Layout** — app shell + composition:

| Component | Path |
|-----------|------|
| `Sidebar`       | `src/components/layout/sidebar.tsx` |
| `DesignSidebar` | `src/components/layout/design-sidebar.tsx` — `/_design` navigation only |
| `Topbar`        | `src/components/layout/topbar.tsx` |
| `AppShell`      | `src/components/layout/page-shell.tsx` |
| `Page` / `PageHead` | `src/components/layout/page-shell.tsx` |
| `Grid` / `GridSplit` | `src/components/layout/page-shell.tsx` |
| `VariationScope` | `src/components/layout/page-shell.tsx` — wraps a subtree with `data-variation` |
| `BrandMark` / `Avatar` | `src/components/layout/brand-mark.tsx` |

**Data / composites** — domain-neutral building blocks:

| Component | Path | Notes |
|-----------|------|-------|
| `DataTable<T>` | `src/components/data/data-table.tsx` | Generic column definitions, `mono` + `dense` modes |
| `Pipeline` / `PipelineStep` / `PipelineArrow` | `src/components/data/pipeline.tsx` | `stage` prop enforces workflow colors |
| `Console` / `LogRow` | `src/components/data/console.tsx` | Typed `LogLevel` union |
| `Activity` | `src/components/data/activity.tsx` | Avatar + actor + verb + object + time |
| `CodeSnippet` | `src/components/data/code-snippet.tsx` | Static code block, inline `.code-c/-k/-s/-n` classes |

**shadcn primitives** — Radix-backed interactive components, restyled via the token bridge in `globals.css` (`--color-background` → `--color-bg`, etc.).

- Location: [`src/components/shadcn/`](./src/components/shadcn/)
- Used for: Dialog, Popover, DropdownMenu, Tabs, Tooltip, Command, ScrollArea, Sheet, Select, and AI-specific primitives (ButtonGroup, InputGroup, HoverCard, Spinner, etc.)
- Rule: **don't import from `@/components/shadcn/*` for visual atoms** — import from `@/components/ui/*` instead. Shadcn is for interactive/a11y-heavy primitives only.

**ai-elements** — Vercel's AI UI kit, vendored:

- Location: [`src/components/ai-elements/`](./src/components/ai-elements/)
- 48 components covering Conversation, Message, PromptInput, CodeBlock, Tool, Artifact, Sandbox, Terminal, etc.
- All of them compose shadcn primitives, so they inherit Orbit tokens automatically.

**Icons**:

- Registry: [`src/components/icons.tsx`](./src/components/icons.tsx)
- 18 bespoke 16×16 stroke icons — typed `IconName` union
- Usage: `<Icon name="deploy" />` — never inline SVG in components
- To add: append to `paths` record, extend `IconName` union, re-run `bun run typecheck`

---

## 4. Providers & state

Three independent providers, composed in [`src/providers/index.tsx`](./src/providers/index.tsx):

| Provider | Controls | Storage key | Hotkey |
|----------|----------|-------------|--------|
| `ThemeProvider`     | `data-theme` on `<html>` + `color-scheme`       | `orbit:theme`     | — |
| `AccentProvider`    | `--color-accent` on `<html>`                    | `orbit:accent`    | — |
| `VariationProvider` | Returns `variation` to consumers (e.g. `TweaksPanel`) | `orbit:variation` | — |

Each provider emits a **no-flash script** (`ThemeNoFlashScript`, `AccentNoFlashScript`) that runs before hydration to set the right values on `<html>`, so first paint never shows the wrong theme.

The Tweaks panel lives at [`src/components/tweaks/tweaks-panel.tsx`](./src/components/tweaks/tweaks-panel.tsx). Toggle with **⌘.** or `?tweaks=1` query param.

---

## 5. Routes

The app exposes two kinds of surfaces:

### `/` — Landing
Simple intro page pointing at `/_design`. Replace this when you start building the real product.

### `/_design/*` — Design reference
Internal design-system gallery for agents and humans. Backed by `src/app/design/` on disk; `next.config.ts` rewrites `/_design/*` → `/design/*`.

| Path | Purpose |
|------|---------|
| `/_design`              | Index of all sections |
| `/_design/tokens`       | Live token reference (colors, radii, shadows, type scale) |
| `/_design/components`   | Every atom + composite rendered in every variant |
| `/_design/conservative` | Deployments page — table, pipeline, activity, build output |
| `/_design/confident`    | Overview page — hero, metric panel, service table, quickstart, uptime |
| `/_design/experimental` | Ops page — brutalist table, runtime logs, routes |
| `/_design/ai`           | Conversation + PromptInput + CodeBlock demo (stubbed) |

**Every `/_design` page sources real components from `src/components/` and real (mock) data from `src/data/`.** They are the canonical usage examples — copy the patterns into product surfaces.

### `/api/chat`
Stub endpoint ([`src/app/api/chat/route.ts`](./src/app/api/chat/route.ts)). Returns 501. Wire to a real provider via the AI SDK when you need streaming.

---

## 6. Variations in practice

A variation is a data attribute:

```tsx
<VariationScope variation="experimental">
  <YourPage />
</VariationScope>
```

The corresponding CSS in `globals.css`:

```css
[data-variation="experimental"] { font-family: var(--font-mono); }
[data-variation="experimental"] .metric-grid-bg { /* dotted grid bg */ }
[data-variation="experimental"] .brutal-card { /* sharp corners, fg-colored border */ }
```

Components **don't know** which variation they're in — they render tokens. Variation CSS adjusts tokens or adds decoration via scoped selectors. Keep that separation.

---

## 7. Do's and don'ts

### Do
- Use `box-shadow: 0 0 0 1px var(--color-line)` instead of `border: 1px solid …`
- Reach for `shadow-[inset_0_0_0_1px_var(--color-line)]` (Tailwind arbitrary value) on one-off shadow rings
- Use the `Icon` component and the `IconName` union — never inline SVGs in product surfaces
- Import atoms from `@/components/ui/*`
- Import heavy interactive primitives (Dialog, DropdownMenu, Command) from `@/components/shadcn/*`
- Use `font-mono` for technical labels, counts, timestamps, identifiers
- Keep weight hierarchy to 400 / 500 / 600
- Add new icons to `icons.tsx`; keep the bespoke stroke weight (1.5) consistent

### Don't
- Don't use CSS `border` on cards, inputs, sidebars — use shadow
- Don't introduce weight 700 (bold) — use size for hierarchy
- Don't use workflow colors (`--color-develop/preview/ship`) for decoration — only Pipeline stages
- Don't use `text-primary`, `bg-card`, etc. from shadcn's default vocabulary in new components — use Orbit tokens (`text-fg`, `bg-bg`) directly
- Don't add a new provider when an existing token swap can accomplish the same thing
- Don't put variation-specific styles into component files — they go in `globals.css` under `[data-variation="…"]`

---

## 8. Adding a component

1. Add the file to the right directory:
   - Pure visual atom → `src/components/ui/`
   - Layout / shell → `src/components/layout/`
   - Data / composite → `src/components/data/`
2. Use tokens only (`var(--color-fg)`, `bg-bg-muted`, etc.). No literal hexes in the component.
3. If it has variants, use `cva` from `class-variance-authority` — match the style of existing atoms.
4. Add a demo section to `/_design/components`:
   - File: `src/app/design/components/page.tsx`
   - Every variant must render there; the page doubles as the visual regression baseline.
5. Run `bun run typecheck && bun run build` — both must pass before merging.

---

## 9. Stack versions

Pinned in `package.json`:

| Package | Version |
|---------|---------|
| `next` | `16.2.4` |
| `react` / `react-dom` | `19.2.4` |
| `tailwindcss` | `^4` |
| `typescript` | `^5` |
| `geist` | `^1.7` |
| `zod` | `^4` |
| `ai` | `^6` |

Node: Tailwind v4 requires Node 22+. Turbopack is on by default in `next dev` and `next build`.

Package manager: **Bun** (`"packageManager": "bun@1.3.x"`). Use `bun install`, `bun run …`, `bun add …`. Don't mix with npm/pnpm.

---

## 10. Credits & inspiration

The shadow-as-border philosophy, the 3-weight type rule, and the "gallery emptiness" spacing are directly inspired by [Vercel's Geist design system](https://vercel.com/design/geist). Orbit diverges by (a) exposing all tokens as runtime-swappable CSS variables, (b) shipping three first-class layout variations, and (c) integrating ai-elements as a styled first-class surface.

The accent swatches, workflow colors, and data shape are Orbit-original.
