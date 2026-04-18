# Orbit — agent quickstart

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

Next.js 16 has breaking changes — APIs, conventions, and file structure may differ from what's in your training data. When in doubt, read the guide at `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

You are working in a **Next.js 16 / Tailwind v4 / Bun / TypeScript** design-system foundation. The product hasn't been built yet — this repo is the scaffolding to build on.

`AGENTS.md` is a symlink to this file, so tools that read either (codex, cursor, Claude Code) get the same authoritative guidance.

The authoritative **design** document is [`DESIGN.md`](./DESIGN.md). Read it before making any visual decisions.

## Documentation map

The single source of truth for where to look when you need something. Start here.

| Where                                                             | What                                                               | Read when                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| [`DESIGN.md`](./DESIGN.md)                                        | Design-system spec — tokens, components, variations, philosophy    | Making any visual decision                     |
| [`CLAUDE.md`](./CLAUDE.md) (this file)                            | Agent conventions, import rules, forbidden edits                   | Writing any code                               |
| [`README.md`](./README.md)                                        | Quick-start, stack summary, route list                             | Onboarding                                     |
| [`src/integrations/README.md`](./src/integrations/README.md)      | How to wire real AI / Auth / DB providers                          | Taking the template to production              |
| [`/_design`](http://localhost:3000/_design)                       | Live design-system gallery — every pattern, rendered               | Always — this is the canonical usage reference |
| [`/_design/tokens`](http://localhost:3000/_design/tokens)         | Live color / radius / shadow / type / spacing reference            | Picking a token value                          |
| [`/_design/components`](http://localhost:3000/_design/components) | Orbit atoms × every variant                                        | Before writing a new atom                      |
| [`/_design/blocks`](http://localhost:3000/_design/blocks)         | shadcn blocks catalog + live demos                                 | Before composing a new dashboard / chart       |
| [`/_design/surfaces`](http://localhost:3000/_design/surfaces)     | Full-page patterns: auth, settings, billing, detail, empty, errors | Before writing a new page                      |
| [`/_design/ai`](http://localhost:3000/_design/ai)                 | AI surfaces — conversation, reasoning, code                        | Building an AI feature                         |
| [`_reference/`](./_reference/)                                    | Original vanilla-React mock — read-only archaeology                | Understanding design intent (don't import)     |

**Read order for humans**: `README.md` → `DESIGN.md` → `/_design`.
**Read order for agents**: `CLAUDE.md` → `DESIGN.md` → `/_design` (most specific to most canonical).

## Where to find examples

**All example patterns live at `/_design/*`.** The pages under [`src/app/design/`](./src/app/design/) are the canonical usage demos — every component, every variant, composed the way the design system intends.

| To find examples of…                      | Open                                       | On disk                                |
| ----------------------------------------- | ------------------------------------------ | -------------------------------------- |
| Tokens (colors, radii, shadows, type)     | `/_design/tokens`                          | `src/app/design/tokens/page.tsx`       |
| Every Orbit atom + composite              | `/_design/components`                      | `src/app/design/components/page.tsx`   |
| shadcn blocks (dashboard, auth, charts…)  | `/_design/blocks`                          | `src/app/design/blocks/page.tsx`       |
| Data-dense table + pipeline layout        | `/_design/conservative`                    | `src/app/design/conservative/page.tsx` |
| Hero + metric + quickstart layout         | `/_design/confident`                       | `src/app/design/confident/page.tsx`    |
| Terminal-style ops layout                 | `/_design/experimental`                    | `src/app/design/experimental/page.tsx` |
| Auth / Settings / Billing / Empty / Error | `/_design/surfaces`                        | `src/app/design/surfaces/*/page.tsx`   |
| AI chat + reasoning + code UI             | `/_design/ai`, `/ai/reasoning`, `/ai/code` | `src/app/design/ai/*/page.tsx`         |

Each design-system route points at **real, importable surface components** (`src/components/surfaces/*`) that also back product routes (`/signup`, `/settings`, `/billing`). Copy the surface into the product and it just works — no duplication.

Before inventing a new component, **check if a pattern already exists at `/_design/components`**. Before inventing a new layout, **check the three variation routes** — one of them usually covers it.

Run the dev server with `bun dev` and browse `/_design` to see the live gallery.

## Repo layout

```
src/
├── app/
│   ├── page.tsx            # /  landing
│   ├── layout.tsx          # root layout, wires Providers + no-flash scripts
│   ├── not-found.tsx       # 404 page
│   ├── error.tsx           # error boundary
│   ├── globals.css         # @theme tokens + dark variant + variation overrides
│   ├── dashboard/          # /dashboard — shadcn dashboard-01 block
│   ├── login/              # /login — shadcn login-01 block
│   ├── signup/             # /signup — uses <SignupForm />
│   ├── settings/           # /settings — uses <SettingsView />
│   ├── billing/            # /billing — uses <BillingView />
│   ├── design/             # /_design/* (rewrite) — design-system reference
│   │   ├── tokens/, components/, blocks/
│   │   ├── conservative/, confident/, experimental/    (layouts)
│   │   ├── surfaces/{signup,login,settings,billing,empty,errors,detail}
│   │   └── ai/{conversation,reasoning,code}
│   └── api/chat/           # mocked streaming chat endpoint (SSE)
├── components/
│   ├── orbit/              # Orbit atoms — opinionated 4-variant API (Button, Badge, Card, Metric, Sparkline)
│   ├── ui/                 # shadcn primitives — canonical alias (Button, Badge, Card, Dialog, Popover, etc.)
│   ├── layout/             # shell (Sidebar, Topbar, PageShell, ProfileMenu, BrandMark)
│   ├── data/               # composites (DataTable, Pipeline, Console, Activity, CodeSnippet)
│   ├── views/              # the three variation page compositions
│   ├── surfaces/           # product surface compositions (Signup, Settings, Billing, Detail, Empty)
│   ├── command-palette/    # ⌘K palette + provider
│   ├── tweaks/             # floating tweaks panel (⌘.)
│   ├── ai-elements/        # vendored — 48 AI UI components, do not edit
│   ├── icons.tsx           # typed icon registry
│   └── <block-files>.tsx   # shadcn block outputs (app-sidebar, nav-*, chart-*, calendar-*, etc.) — vendored
├── providers/              # Theme · Accent · Variation providers
├── lib/                    # utils (cn), nav config, hotkey hook
├── data/                   # mock data (deployments, services, logs, activity, sparks)
└── hooks/                  # useMobile (from shadcn)
```

## Conventions

### Import rules

| Import                                                                                                                                            | From                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Orbit atoms (Button, Badge, Card, Metric, Sparkline)                                                                                              | `@/components/orbit/*`                                         |
| shadcn primitives + AI-shadcn deps (Button, Badge, Card, Dialog, Popover, DropdownMenu, Tabs, Sheet, Tooltip, Command, Avatar, Collapsible, etc.) | `@/components/ui/*`                                            |
| Layout (Sidebar, Topbar, Page, Grid)                                                                                                              | `@/components/layout/*`                                        |
| Data composites (DataTable, Pipeline, Console, Activity)                                                                                          | `@/components/data/*`                                          |
| Icons                                                                                                                                             | `@/components/icons` — use `<Icon name="…" />`, not inline SVG |
| AI surfaces (Conversation, Message, PromptInput, CodeBlock, Tool)                                                                                 | `@/components/ai-elements/*`                                   |
| Theme/accent/variation state                                                                                                                      | `@/providers`                                                  |
| `cn` helper                                                                                                                                       | `@/lib/utils`                                                  |

**Paths follow shadcn conventions**: `@/components/ui/*` = shadcn, `@/lib/utils` = cn helper. This is the default every shadcn/ai-elements doc snippet assumes, so pasted code works without rewriting.

**Orbit atoms live at `@/components/orbit/*`** — intentionally opinionated 4-variant `Button`/`Badge`/`Card`/`Metric`/`Sparkline` with Orbit tokens. When a shadcn _block_ or _ai-element_ internally imports `@/components/ui/button`, it gets shadcn's Button (restyled via tokens). When _product code_ wants the Orbit button API, import from `@/components/orbit/*`.

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
bun install              # install + auto-installs lefthook git hooks (prepare script)
bun dev                  # dev server — http://localhost:3000
bun run build            # production build
bun run typecheck        # tsc --noEmit
bun run start            # serve production build
bun run lint             # oxlint
bun run lint:fix         # oxlint --fix
bun run format           # oxfmt
bun run format:check     # oxfmt --check
```

All long-running scripts export `NODE_OPTIONS='--use-system-ca'` so corporate CAs and mkcert certs work out of the box.

### Git hooks (lefthook)

Auto-installed on `bun install`. Configured in `lefthook.yml`:

| Stage      | Runs                                                         |
| ---------- | ------------------------------------------------------------ |
| pre-commit | `oxfmt` + `oxlint --fix` on staged files (auto-stages fixes) |
| pre-push   | full `tsc --noEmit`, full `oxlint`, full `bun run build`     |

Skip temporarily: `LEFTHOOK=0 git commit …` or `git commit --no-verify` — but only with explicit permission (see root `CLAUDE.md` guidance about not bypassing hooks).

### Adding a shadcn component

```bash
bunx --bun shadcn@latest add <name>
```

Drops into `src/components/ui/` (canonical shadcn alias). Review the generated file; the token bridge in `globals.css` remaps shadcn's semantic class names (`bg-primary`, `text-muted-foreground`, etc.) to Orbit values at runtime, so you usually don't need to touch classes. Only edit if the component uses arbitrary colors that bypass the bridge.

### Adding a shadcn block

Blocks compose multiple primitives into ready-to-use patterns:

```bash
bunx --bun shadcn@latest add dashboard-01        # /dashboard route + full sidebar
bunx --bun shadcn@latest add login-03            # variant login form
bunx --bun shadcn@latest add sidebar-07          # alternate sidebar layout
bunx --bun shadcn@latest add chart-line-default  # additional chart variants
bunx --bun shadcn@latest add calendar-20         # picker variants
```

Block output files land in `src/components/<file>.tsx` (sometimes alongside a route under `src/app/<block>/`). They're marked `linguist-generated=true` via `.gitattributes` and excluded from oxlint/oxfmt — treat them as vendored. When you add a new block, also add a row/demo to `/_design/blocks` (`src/app/design/blocks/page.tsx`).

### Adding an ai-element component

ai-elements are already vendored. If the one you need is missing, add via:

```bash
bunx --bun ai-elements@latest add <name>
```

## Things you should NOT do

- **Don't edit files in `src/components/ai-elements/`** unless fixing a TypeScript or runtime bug. These are vendored. If you need a customization, wrap the component in a new file under `src/components/surfaces/ai/` and layer your behavior on top.
- **Don't edit shadcn primitives** (`src/components/ui/*.tsx`) to hard-code Orbit styles. The token bridge in `globals.css` is the only place those mappings should live.
- **Don't edit shadcn block output** (`src/components/app-sidebar.tsx`, `nav-*.tsx`, `chart-*.tsx`, `calendar-*.tsx`, etc.) — they're regenerated via `shadcn add <block>`. If a block needs permanent customisation, copy it into `src/components/orbit/` or `src/components/surfaces/` and fork from there.
- **Don't build new pages under `src/app/design/`** — that route is for the design system reference, not the product. New product routes go under `src/app/` directly (or under route groups).
- **Don't add dependencies** without checking if an existing one covers the need. We already have `cva`, `clsx`, `tailwind-merge`, `zod`, `geist`, `ai`, `sonner`, `radix-ui`, `motion`, `recharts`, `@tanstack/react-table`, `@xyflow/react`, `embla-carousel-react`, `date-fns`, `react-day-picker`, `cmdk`, and more.
- **Don't install an icon library** — extend `src/components/icons.tsx` instead. The bespoke stroke weight (1.5) is part of the design identity. `lucide-react` is available for shadcn primitives and blocks that need it, but Orbit-authored code should use the `<Icon>` component.
- **Don't ship `/_design`** to production end-users. When the real product exists, guard the route behind `NODE_ENV !== 'production'` or a feature flag.
- **Don't bypass git hooks** (`--no-verify`, `LEFTHOOK=0`) unless the user explicitly asks. Fix the underlying oxlint/oxfmt/tsc/build error instead.

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
