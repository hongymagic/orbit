# Orbit — Design System Foundation

A Next.js 16 + Tailwind v4 + shadcn + ai-elements foundation built on the **shadow-as-border** design language. Not an app — a starting point for one.

## Quick start

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or jump straight to [`/_design`](http://localhost:3000/_design) for the design-system gallery.

## Documentation

- **[DESIGN.md](./DESIGN.md)** — the design system spec (tokens, components, variations, philosophy).
- **[CLAUDE.md](./CLAUDE.md)** — conventions and guardrails for coding agents working in this repo.
- **`/_design`** (live) — every component, every variant, rendered in-place. The canonical usage reference.

## Stack

| Layer      | Choice                                               |
| ---------- | ---------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, React 19)         |
| Styling    | Tailwind v4 (CSS-first tokens via `@theme`)          |
| Fonts      | Geist Sans + Geist Mono via `geist/font`             |
| Primitives | shadcn (Radix) for interactive/a11y-heavy components |
| AI UI      | ai-elements (vendored, 48 components)                |
| State      | React Context (Theme · Accent · Variation)           |
| Runtime    | Bun                                                  |
| Language   | TypeScript (strict)                                  |

## Scripts

```bash
bun dev              # dev server
bun run build        # production build
bun run start        # serve production build
bun run typecheck    # tsc --noEmit
bun run lint         # oxlint
bun run lint:fix     # oxlint --fix
bun run format       # oxfmt
bun run format:check # oxfmt --check
```

Long-running scripts run with `NODE_OPTIONS='--use-system-ca'` so corporate certificates and `mkcert` work without extra setup.

**Git hooks** are installed automatically via `bun install` (`prepare` script). Pre-commit runs `oxfmt` + `oxlint --fix` on staged files; pre-push runs typecheck + lint + build. Skip temporarily with `LEFTHOOK=0` or `git commit --no-verify` (but fix the underlying issue instead).

## Routes

**Product** (copy-ready real routes):

| Route        | Backed by                                       |
| ------------ | ----------------------------------------------- |
| `/`          | Intro / landing                                 |
| `/dashboard` | shadcn `dashboard-01` block                     |
| `/login`     | shadcn `login-01` block                         |
| `/signup`    | `src/components/surfaces/signup-form.tsx` (Zod) |
| `/settings`  | `src/components/surfaces/settings-view.tsx`     |
| `/billing`   | `src/components/surfaces/billing-view.tsx`      |
| `/api/chat`  | Mocked streaming chat endpoint (SSE)            |

**Design system reference** (gallery):

| Route                   | Purpose                                               |
| ----------------------- | ----------------------------------------------------- |
| `/_design`              | Index                                                 |
| `/_design/tokens`       | Live color / radius / shadow / type reference         |
| `/_design/components`   | Orbit atoms + composites, every variant               |
| `/_design/blocks`       | shadcn blocks catalog + live demos                    |
| `/_design/conservative` | Data-dense layout variation                           |
| `/_design/confident`    | Hero-led layout variation                             |
| `/_design/experimental` | Terminal-forward layout variation                     |
| `/_design/surfaces`     | Signup / Settings / Billing / Empty / Errors / Detail |
| `/_design/ai`           | Conversation + PromptInput demo                       |
| `/_design/ai/reasoning` | ChainOfThought + Reasoning + Task                     |
| `/_design/ai/code`      | FileTree + CodeBlock + Terminal                       |

`/_design` is rewritten to `/design` on disk — both resolve, but `/_design` is canonical (prefixed to signal "internal reference, not product surface").

## Key conventions

- **Shadow, not border** — every boundary is a `box-shadow`.
- **Tokens only** — no literal hex colors in components.
- **Three weights** — 400, 500, 600. Never 700.
- **Canonical shadcn paths**: shadcn in `components/ui/`, Orbit atoms in `components/orbit/`, `cn` from `@/lib/utils`.
- **⌘.** opens the Tweaks panel (theme · accent · variation).

See [CLAUDE.md](./CLAUDE.md) for the full set.

## License

Template — unlicensed for internal use.
