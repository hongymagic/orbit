@AGENTS.md

# Orbit — agent quickstart

You are working in a **Next.js 16 / Tailwind v4 / Bun / TypeScript** design-system foundation. The product hasn't been built yet — this repo is the scaffolding to build on.

The authoritative design document is [`DESIGN.md`](./DESIGN.md). Read it before making any visual decisions.

## Where to find examples

**All example patterns live at `/_design/*`.** The pages under [`src/app/design/`](./src/app/design/) are the canonical usage demos — every component, every variant, composed the way the design system intends.

| To find examples of… | Open | On disk |
|----------------------|------|---------|
| Tokens (colors, radii, shadows, type) | `/_design/tokens`      | `src/app/design/tokens/page.tsx` |
| Every component variant               | `/_design/components`  | `src/app/design/components/page.tsx` |
| Data-dense table + pipeline layout    | `/_design/conservative`| `src/app/design/conservative/page.tsx` |
| Hero + metric + quickstart layout     | `/_design/confident`   | `src/app/design/confident/page.tsx` |
| Terminal-style ops layout             | `/_design/experimental`| `src/app/design/experimental/page.tsx` |
| ai-elements AI surfaces               | `/_design/ai`          | `src/app/design/ai/page.tsx` |

Before inventing a new component, **check if a pattern already exists at `/_design/components`**. Before inventing a new layout, **check the three variation routes** — one of them usually covers it.

Run the dev server with `bun dev` and browse `/_design` to see the live gallery.

## Repo layout

```
src/
├── app/
│   ├── (public routes — build the real product here)
│   ├── design/          # /_design/* — design-system reference, do not ship to end users
│   ├── api/chat/        # stubbed AI endpoint
│   └── layout.tsx       # root layout, wires Providers + no-flash scripts
├── components/
│   ├── ui/              # atoms (Button, Badge, Card, Metric, Sparkline) — import from here
│   ├── layout/          # shell (Sidebar, Topbar, PageShell, BrandMark)
│   ├── data/            # composites (DataTable, Pipeline, Console, Activity)
│   ├── views/           # the three variation page compositions
│   ├── tweaks/          # floating tweaks panel (⌘.)
│   ├── shadcn/          # Radix-backed primitives (import for Dialog/Popover/Tabs only)
│   ├── ai-elements/     # vendored AI UI kit — drop-in components, pre-skinned
│   └── icons.tsx        # typed icon registry
├── providers/           # Theme · Accent · Variation providers
├── lib/                 # cn, nav config, hotkey hook
├── data/                # mock data (deployments, services, logs, activity, sparks)
└── app/globals.css      # @theme tokens + dark variant + variation overrides
```

## Conventions

### Import rules

| Import | From |
|--------|------|
| Orbit atoms (Button, Badge, Card, Metric, Sparkline) | `@/components/orbit/*` |
| shadcn primitives + AI-shadcn deps (Button, Badge, Card, Dialog, Popover, DropdownMenu, Tabs, Sheet, Tooltip, Command, Avatar, Collapsible, etc.) | `@/components/ui/*` |
| Layout (Sidebar, Topbar, Page, Grid) | `@/components/layout/*` |
| Data composites (DataTable, Pipeline, Console, Activity) | `@/components/data/*` |
| Icons | `@/components/icons` — use `<Icon name="…" />`, not inline SVG |
| AI surfaces (Conversation, Message, PromptInput, CodeBlock, Tool) | `@/components/ai-elements/*` |
| Theme/accent/variation state | `@/providers` |
| `cn` helper | `@/lib/utils` |

**Paths follow shadcn conventions**: `@/components/ui/*` = shadcn, `@/lib/utils` = cn helper. This is the default every shadcn/ai-elements doc snippet assumes, so pasted code works without rewriting.

**Orbit atoms live at `@/components/orbit/*`** — intentionally opinionated 4-variant `Button`/`Badge`/`Card`/`Metric`/`Sparkline` with Orbit tokens. When a shadcn *block* or *ai-element* internally imports `@/components/ui/button`, it gets shadcn's Button (restyled via tokens). When *product code* wants the Orbit button API, import from `@/components/orbit/*`.

### Styling rules

- Use **shadow-as-border** — `shadow-[inset_0_0_0_1px_var(--color-line)]` or `shadow-[0_0_0_1px_var(--color-line)]` instead of CSS `border`.
- Use **Orbit tokens** — `bg-bg`, `text-fg-muted`, `bg-accent`, `text-ship`. Not `bg-white`, `text-gray-500`, `bg-blue-500`.
- **No literal hex colors** in components. Everything goes through a CSS variable.
- **Font weights**: 400, 500, 600. Never 700.
- Technical labels, counts, timestamps, identifiers → `font-mono` (Geist Mono).
- Variation-specific decoration → `src/app/globals.css` under `[data-variation="…"]`. Never in component files.

### TypeScript rules

- `tsconfig.json` has `strict: true`. Keep it. Prefer explicit types on exported functions; let inference handle locals.
- Component data shapes live in `src/data/` typed as `readonly T[]` with discriminated unions where applicable.
- Column definitions for `DataTable` are typed: `Column<RowShape>`.

## Reference files

`_reference/` contains the **original vanilla-React mock** that seeded this design system (`components.jsx`, `styles.css`, `view-*.jsx`, `Orbit IDP.html`). It is **reference-only** — do not import from it, do not execute it. If you need to understand the original intent behind a component, read the mock; then express it through the foundation layer.

## Commands

```bash
bun install              # install
bun dev                  # dev server — http://localhost:3000
bun run build            # production build
bun run typecheck        # tsc --noEmit
bun run start            # serve production build
```

All scripts export `NODE_OPTIONS='--use-system-ca'` so corporate CAs and mkcert certs work out of the box.

### Adding a shadcn component
```bash
bunx --bun shadcn@latest add <name>
```
Drops into `src/components/ui/` (canonical shadcn alias). Review the generated file; the token bridge in `globals.css` remaps shadcn's semantic class names (`bg-primary`, `text-muted-foreground`, etc.) to Orbit values at runtime, so you usually don't need to touch classes. Only edit if the component uses arbitrary colors that bypass the bridge.

### Adding an ai-element component
ai-elements are already vendored. If the one you need is missing, add via:
```bash
bunx --bun ai-elements@latest add <name>
```

## Things you should NOT do

- **Don't edit files in `src/components/ai-elements/`** unless fixing a TypeScript or runtime bug. These are vendored. If you need a customization, create a wrapper in `src/components/ui/ai/`.
- **Don't edit shadcn primitives** to hard-code Orbit styles. The token bridge in `globals.css` is the only place those mappings should live.
- **Don't build new pages under `src/app/design/`** — that route is for the design system, not the product. New product routes go under `src/app/` directly (or under route groups).
- **Don't add dependencies** without checking if an existing one covers the need. We already have `cva`, `clsx`, `tailwind-merge`, `zod`, `geist`, `ai`, `sonner`, `radix-ui`, `motion`, and more.
- **Don't install an icon library** — extend `src/components/icons.tsx` instead. The bespoke stroke weight (1.5) is part of the design identity.
- **Don't ship `/_design`** to production end-users. When the real product exists, guard the route behind `NODE_ENV !== 'production'` or a feature flag.

## Things you SHOULD do

- When you add a new component, **add its demo section** to `/_design/components` in the same commit.
- When you change a token, verify the three variation pages still render correctly in both light and dark themes.
- When you add a new icon, extend the `IconName` union — don't use string literals.
- When you wire a real AI provider, keep the stub endpoint's comment block — it's the two-line recipe.
- Prefer **copying a pattern from `/_design/…`** over inventing from scratch. The foundation is designed to compose.

## Known quirks

- `/_design` URL is a rewrite to `/design` (see `next.config.ts`). Both resolve, but `/_design` is canonical — it's the convention agreed with the user.
- The Tweaks panel (`⌘.`) writes to `localStorage` — values survive reloads and propagate across tabs on next navigation.
- `next/font/google` Geist is already wired; don't install `@vercel/font` or similar in parallel.
- Tailwind v4 ignores `tailwind.config.*`. All tokens are in `src/app/globals.css` under `@theme`. Adding a new color utility = adding a `--color-*` token there.

## When in doubt

1. Check `/_design` for a live example.
2. Check `DESIGN.md` for the token/philosophy spec.
3. Check `_reference/` only for archaeological context.
4. If still ambiguous, ask.
