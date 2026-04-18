# Orbit — agent quickstart

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

Next.js 16 has breaking changes — APIs, conventions, and file structure may differ from what's in your training data. When in doubt, read the guide at `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

Stack: **Next.js 16.2 · React 19.2 · Tailwind v4.2 · TypeScript 6 · Bun 1.3**. The product hasn't been built — this repo is scaffolding.

`AGENTS.md` is a symlink to this file (codex / cursor / Claude Code all read the same source). [`DESIGN.md`](./DESIGN.md) is the authoritative design spec — read before any visual decision.

## Where to look

Read order — agents: `CLAUDE.md` → `DESIGN.md` → `/_design`. Humans: `README.md` → `DESIGN.md` → `/_design`.

| For                                                         | Go to                                            | On disk                               |
| ----------------------------------------------------------- | ------------------------------------------------ | ------------------------------------- |
| Agent conventions / guardrails                              | `CLAUDE.md` (this file)                          | —                                     |
| Design spec (tokens, philosophy, variations)                | [`DESIGN.md`](./DESIGN.md)                       | —                                     |
| Quick-start + stack summary + route list                    | [`README.md`](./README.md)                       | —                                     |
| Wiring real AI / Auth / DB                                  | `src/integrations/README.md`                     | —                                     |
| Live gallery — canonical usage reference                    | `/_design`                                       | `src/app/design/`                     |
| Tokens (colors, radii, shadows, type)                       | `/_design/tokens`                                | `src/app/design/tokens/page.tsx`      |
| Every Orbit atom × every variant                            | `/_design/components`                            | `src/app/design/components/page.tsx`  |
| shadcn blocks catalog + demos                               | `/_design/blocks`                                | `src/app/design/blocks/page.tsx`      |
| Variation layouts (data-dense / hero / terminal)            | `/_design/{conservative,confident,experimental}` | `src/app/design/<variation>/page.tsx` |
| Surfaces: signup/login/settings/billing/empty/errors/detail | `/_design/surfaces/*`                            | `src/app/design/surfaces/*/page.tsx`  |
| AI chat + reasoning + code UI                               | `/_design/ai`, `/ai/reasoning`, `/ai/code`       | `src/app/design/ai/*/page.tsx`        |
| Original vanilla-React mock (archaeology, read-only)        | —                                                | `_reference/` — don't import          |

Every `/_design/*` route sources real, importable surface components from `src/components/surfaces/*`. When you wire a real product route, mount the same surface under `src/app/` and it just works. **Before inventing, check `/_design/components`. Before a new layout, check the three variation routes.**

## Repo layout

```
src/
├── app/
│   ├── page.tsx · layout.tsx · not-found.tsx · error.tsx · globals.css  # landing + Next.js required
│   ├── design/            # /_design/* (rewrite) — all page examples live here
│   │   ├── tokens/ · components/ · blocks/
│   │   ├── dashboard/                                            # Orbit IDP dashboard block
│   │   ├── conservative/ · confident/ · experimental/            # variation layouts
│   │   ├── surfaces/{signup,login,settings,billing,empty,errors,detail}
│   │   └── ai/{conversation,reasoning,code}
│   └── api/chat/          # mocked streaming chat endpoint (SSE)
│   # Product routes — add under src/app/ when building real work. Kept empty by design.
├── components/
│   ├── orbit/             # Orbit atoms — opinionated 4-variant API (Button, Badge, Card, Metric, Sparkline)
│   ├── ui/                # shadcn primitives — canonical alias (Button, Badge, Card, Dialog, Popover, …)
│   ├── layout/            # shell (Sidebar, Topbar, PageShell, ProfileMenu, BrandMark)
│   ├── data/              # composites (DataTable, Pipeline, Console, Activity, CodeSnippet)
│   ├── views/             # the three variation compositions
│   ├── surfaces/          # product surface compositions (Signup, Settings, Billing, Detail, Empty)
│   ├── command-palette/ · tweaks/
│   ├── ai-elements/       # vendored — 48 AI UI components; do not edit
│   ├── icons.tsx          # typed icon registry
│   └── <block-files>.tsx  # vendored shadcn block outputs
├── providers/             # Theme · Accent · Variation (with no-flash scripts)
├── integrations/          # AI / Auth / DB indirection (stub by default)
├── lib/ · data/ · hooks/
```

## Conventions

### Import rules

| Import                                                                                                                                                | From                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Orbit atoms (`Button`, `Badge`, `Card`, `Metric`, `Sparkline`)                                                                                        | `@/components/orbit/*`       |
| shadcn primitives (`Button`, `Badge`, `Card`, `Dialog`, `Popover`, `DropdownMenu`, `Tabs`, `Sheet`, `Tooltip`, `Command`, `Avatar`, `Collapsible`, …) | `@/components/ui/*`          |
| Layout (`Sidebar`, `Topbar`, `Page`, `Grid`)                                                                                                          | `@/components/layout/*`      |
| Data composites (`DataTable`, `Pipeline`, `Console`, `Activity`)                                                                                      | `@/components/data/*`        |
| Icons — `<Icon name="…" />`, never inline SVG                                                                                                         | `@/components/icons`         |
| AI surfaces (`Conversation`, `Message`, `PromptInput`, `CodeBlock`, `Tool`)                                                                           | `@/components/ai-elements/*` |
| Theme / accent / variation state                                                                                                                      | `@/providers`                |
| `cn` helper                                                                                                                                           | `@/lib/utils`                |
| Env vars (zod-validated schema)                                                                                                                       | `@/env`                      |
| Real provider slots (AI, Auth, DB)                                                                                                                    | `@/integrations/*`           |

Paths follow shadcn conventions (`@/components/ui/*` = shadcn, `@/lib/utils` = cn) so every pasted shadcn / ai-element snippet works without rewriting.

**Orbit vs shadcn `Button`/`Badge`/`Card`**: shadcn blocks + ai-elements internally import `@/components/ui/button` (restyled via the token bridge in `globals.css`). When product code wants the Orbit API (opinionated 4 variants × 3 sizes), import from `@/components/orbit/*`.

### Styling rules

- **Shadow-as-border**: `shadow-[inset_0_0_0_1px_var(--color-line)]` or `shadow-[0_0_0_1px_var(--color-line)]` — not CSS `border`.
- **Orbit tokens only**: `bg-bg`, `text-fg-muted`, `bg-accent`, `text-ship` — not `bg-white`, `text-gray-500`, `bg-blue-500`.
- **No literal hex colors** in components. Route everything through a CSS variable.
- **Font weights**: 400, 500, 600. Never 700.
- Technical labels, counts, timestamps, identifiers → `font-mono` (Geist Mono).
- Variation-specific decoration → `src/app/globals.css` under `[data-variation="…"]`. Never in component files.

### TypeScript rules

- `tsconfig.json` is `strict: true` with TS 6 defaults (`types: ["node","react","react-dom"]`). Keep both.
- Explicit types on exported functions; inference for locals.
- Data shapes in `src/data/` typed as `readonly T[]`, discriminated unions where applicable.
- `DataTable` columns use `Column<RowShape>`.

### Reference files

`_reference/` is the **original vanilla-React mock** that seeded this system (`components.jsx`, `styles.css`, `view-*.jsx`, `Orbit IDP.html`). Reference-only — don't import, don't execute. Read it to understand original intent; then express via the foundation layer.

## Dependencies & installs

All dependencies are **pinned to exact versions** — no `^` / `~` in `package.json`. `bunfig.toml` and `.npmrc` set `save-exact=true`; `bun add <pkg>` must preserve this. If you see a range prefix appear, strip it before committing.

## Commands

```bash
bun install              # install + auto-install lefthook git hooks (prepare script)
bun dev                  # dev server — http://localhost:3000
bun run build            # production build
bun run typecheck        # tsc --noEmit
bun run lint             # oxlint
bun run lint:fix         # oxlint --fix
bun run format           # oxfmt
bun run format:check     # oxfmt --check
bun run start            # serve production build
```

All long-running scripts export `NODE_OPTIONS='--use-system-ca'` so corporate CAs and mkcert certs work.

### Git hooks (lefthook)

Auto-installed on `bun install`. Configured in `lefthook.yml`:

| Stage      | Runs                                                         |
| ---------- | ------------------------------------------------------------ |
| pre-commit | `oxfmt` + `oxlint --fix` on staged files (auto-stages fixes) |
| pre-push   | full `tsc --noEmit`, full `oxlint`, full `bun run build`     |

**Don't bypass** (`--no-verify`, `LEFTHOOK=0`) unless the user explicitly asks — fix the underlying error instead.

### Adding shadcn primitives / blocks / ai-elements

```bash
bunx --bun shadcn@latest add <name>         # primitive → src/components/ui/
bunx --bun shadcn@latest add <block>        # block → src/components/<file>.tsx (linguist-generated, vendored)
bunx --bun ai-elements@latest add <name>    # ai-element → src/components/ai-elements/
```

The token bridge in `globals.css` remaps shadcn semantic classes (`bg-primary`, `text-muted-foreground`, …) to Orbit values at runtime — you usually don't touch classes. Only edit when a component uses arbitrary colors that bypass the bridge. When adding a block, also add a demo row to `/_design/blocks` (`src/app/design/blocks/page.tsx`) in the same commit.

## Things you should NOT do

- **Don't edit `src/components/ai-elements/`** unless fixing a TS/runtime bug. To customize, wrap under `src/components/surfaces/ai/`.
- **Don't edit `src/components/ui/*.tsx`** to hard-code Orbit styles. The token bridge in `globals.css` is the only place those mappings live.
- **Don't edit shadcn block output** (`app-sidebar.tsx`, `nav-*.tsx`, `chart-*.tsx`, `calendar-*.tsx`, …) — they're regenerated via `shadcn add`. If a block needs permanent customisation, copy into `src/components/orbit/` or `src/components/surfaces/` and fork.
- **Don't build new pages under `src/app/design/`** — that route is the design reference. Product routes go under `src/app/` directly.
- **Don't add dependencies** without checking existing ones. Already available: `cva`, `clsx`, `tailwind-merge`, `zod`, `geist`, `ai`, `sonner`, `radix-ui`, `motion`, `recharts`, `@tanstack/react-table`, `@xyflow/react`, `embla-carousel-react`, `date-fns`, `react-day-picker`, `cmdk`, `@dnd-kit/*`, `shiki`, `streamdown`, `vaul`, `nanoid`, and more.
- **Don't install an icon library** — extend `src/components/icons.tsx`. The bespoke 1.5 stroke weight is part of the identity. `lucide-react` is available for shadcn primitives/blocks; Orbit code uses `<Icon>`.
- **Don't ship `/_design`** to production. Guard behind `NODE_ENV !== 'production'` or a feature flag when the real product exists.
- **Don't bypass git hooks** (see above).
- **Don't loosen dependency ranges** — exact versions only, including for new `bun add` calls.

## Things you SHOULD do

- When you add a component, add its demo to `/_design/components` in the same commit.
- When you change a token, verify all three variation pages still render in both light and dark.
- When you add an icon, extend the `IconName` union — don't use string literals.
- When you wire a real AI provider, keep the stub endpoint's comment block — it's the two-line recipe.
- Prefer **copying a pattern from `/_design/…`** over inventing from scratch.
- Check `/_design` and `DESIGN.md` before asking. If still ambiguous, ask.

## Known quirks

- `/_design` is a rewrite to `/design` (`next.config.ts`). Both resolve; `/_design` is canonical.
- `typedRoutes: true` is on (`next.config.ts`) — `<Link href>` and `useRouter()` use typed route literals. Unknown routes fail `tsc`; create the route file first, then reference it.
- The Tweaks panel (`⌘.`) writes to `localStorage`; values survive reloads and propagate across tabs on next navigation.
- `next/font/google` Geist is wired in `layout.tsx` — don't install `@vercel/font` or a parallel Geist package.
- Tailwind v4 ignores `tailwind.config.*`. All tokens live in `src/app/globals.css` under `@theme`. A new color utility = a new `--color-*` token there.
