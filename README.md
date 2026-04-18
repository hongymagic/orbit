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

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, Turbopack, React 19) |
| Styling   | Tailwind v4 (CSS-first tokens via `@theme`) |
| Fonts     | Geist Sans + Geist Mono via `geist/font` |
| Primitives | shadcn (Radix) for interactive/a11y-heavy components |
| AI UI     | ai-elements (vendored, 48 components) |
| State     | React Context (Theme · Accent · Variation) |
| Runtime   | Bun |
| Language  | TypeScript (strict) |

## Scripts

```bash
bun dev         # dev server
bun run build   # production build
bun run start   # serve production build
bun run typecheck
```

All scripts run with `NODE_OPTIONS='--use-system-ca'` so corporate certificates and `mkcert` work without extra setup.

## Routes

| Route | Purpose |
|-------|---------|
| `/`                        | Intro / landing |
| `/_design`                 | Design system index |
| `/_design/tokens`          | Live token reference |
| `/_design/components`      | Every component × every variant |
| `/_design/conservative`    | Data-dense layout variation |
| `/_design/confident`       | Hero-led layout variation |
| `/_design/experimental`    | Terminal-forward layout variation |
| `/_design/ai`              | ai-elements demo (stubbed) |
| `/api/chat`                | Stub chat endpoint |

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
