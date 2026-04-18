```
  ██████╗ ██████╗ ██████╗ ██╗████████╗
 ██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝
 ██║   ██║██████╔╝██████╔╝██║   ██║
 ██║   ██║██╔══██╗██╔══██╗██║   ██║
 ╚██████╔╝██║  ██║██████╔╝██║   ██║
  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝
```

A Next.js 16 + Tailwind v4 design-system foundation. Not an app — a starting point.

## Quickstart

```bash
bun install
bun dev
```

Open <http://localhost:3000/_design> for the live gallery.

## Scripts

```bash
bun dev              # dev server
bun run build        # production build
bun run typecheck    # tsc --noEmit
bun run lint         # oxlint
bun run format       # oxfmt
```

## Try it

| Press | Does                                      |
| ----- | ----------------------------------------- |
| `⌘K`  | Command palette                           |
| `⌘.`  | Tweaks panel (theme · accent · variation) |

## Layout

```
src/app/
├── page.tsx   # landing
├── design/    # /_design/* — all page examples live here
└── api/chat/  # mocked SSE endpoint
```

Real product routes go directly under `src/app/`. Page examples belong in `/_design/*`.

## Going further

- [**DESIGN.md**](./DESIGN.md) — tokens, components, variations
- [**CLAUDE.md**](./CLAUDE.md) — conventions + agent guardrails (symlinked as `AGENTS.md`)
- [**src/integrations/README.md**](./src/integrations/README.md) — wire real AI / Auth / DB
