# Plan · Design-system consistency pass + integration readiness

## Context

Phase 2 of Orbit shipped the scaffolding, blocks, surfaces, and tooling. The user now wants four concrete bugs fixed, a broader consistency pass against the `_reference/` mock, a transition from "showcase template" to "ready to plug in real integrations", and documentation clean-up. Each area is narrow and well-scoped; the order matters so that visible bugs land first and integration stubs are added before the doc refresh references them.

User decisions (via AskUserQuestion):

- **Integrations scope**: env loader + placeholder integration modules (not live providers yet).
- **Chart palette**: fixed workflow palette (`develop / preview / ship / success / warn`) — _not_ swappable via accent.

## Findings (from Phase 1 exploration)

### Four visible bugs — all root-caused to specific lines

| #   | Symptom                                                      | Root cause                                                                                                                                                  | File · line                                                                                                         |
| --- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1   | Bright borders on `/dashboard` cards, header, chart dividers | Tailwind v4 `border` (no color) falls back to `currentColor`, bypassing the `--color-border` bridge                                                         | `src/components/ui/card.tsx:10`, `src/components/site-header.tsx:7`, `src/components/chart-bar-interactive.tsx:144` |
| 2   | Chart series render near-black                               | `--chart-1`..`--chart-5` never defined in `@theme`; charts reference undefined vars → black fallback                                                        | `src/app/globals.css` (add to `@theme` + dark block)                                                                |
| 3   | `/_design/blocks/chart-line-default` looks broken            | Same missing chart vars **AND** the `LineChart` has no `<YAxis>`                                                                                            | `src/components/chart-line-default.tsx`                                                                             |
| 4   | `/_design/ai` prompt-input placeholder pegged to the top     | `InputGroupTextarea` applies `py-3` directly on a `field-sizing-content` textarea — padding inflates container height while text stays at the text baseline | `src/components/ui/input-group.tsx:155` and `src/components/ai-elements/prompt-input.tsx` (call site)               |

### Convention drifts from `_reference/`

True gaps:

- `--s-1`..`--s-16` spacing tokens defined in reference; not in our `@theme`.
- Sparkline default opacity `.55` (reference) vs `.60` (`src/components/orbit/sparkline.tsx:33`).
- `<kbd>` in topbar: reference uses `2px 5px` + `border-radius: 3px`; current uses Tailwind rounded-xs + px-1.5.

False positives from the audit (already matching): focus ring, scrollbar, selection highlight, table row dividers, pipeline / activity / metric recipes, color-mix hover states, code syntax tokens, button padding (px-2.5 _is_ 10px), transition timings within acceptable tolerance.

### Docs state

- `AGENTS.md` is a regular file with redundant content — not a symlink.
- `CLAUDE.md` has no dedicated "Documentation map"; cross-references are scattered.
- `DESIGN.md` ↔ `README.md` ↔ `CLAUDE.md` all reference `/_design` and `_reference/` consistently — no stale links.

## Plan

Six commits, independently reviewable, in this order.

### Commit 1 — `fix: dashboard borders + chart tokens + line chart + chat input`

All four visible bugs in one themed commit.

1. **Borders** — replace bare `border*` (which inherits `currentColor`) with explicit `border-*-border`:
   - `src/components/ui/card.tsx:10` → `border-border`
   - `src/components/site-header.tsx:7` → `border-b-border`
   - `src/components/chart-bar-interactive.tsx:144` → `border-b-border`
   - Grep vendored block files for any other bare `border` / `border-[trblx]` without a color; fix those too. Keep this surgical — don't edit ai-elements files.

2. **Chart tokens** — add to `src/app/globals.css` `@theme` block (and replicate inside `[data-theme="dark"]` so `ChartStyle` reads correctly in both themes):

   ```css
   --chart-1: var(--color-develop); /* #0a72ef  blue  */
   --chart-2: var(--color-preview); /* #de1d8d  pink  */
   --chart-3: var(--color-ship); /* #ff5b4f  red   */
   --chart-4: var(--color-success); /* #0f9d58  green */
   --chart-5: var(--color-warn); /* #d97706  amber */
   ```

   Fixed workflow palette per user decision — does not swap with accent.

3. **Line chart** — add `<YAxis tickLine={false} axisLine={false} width={28} />` to `LineChart` in `chart-line-default.tsx` after the existing `<XAxis>`; verify with the dev server.

4. **Chat input** — surgical fix at the textarea class level. `field-sizing-content` on an element with vertical padding measures content height excluding padding. Simplest fix without forking shadcn: at the `PromptInputTextarea` call site in `src/components/ai-elements/prompt-input.tsx`, override the inherited `py-3` with `py-2.5 min-h-10` (enough to center a single line) and set `placeholder:translate-y-0` (shadcn's placeholder class). Verify by typing and confirming multi-line growth still works.

**Verify commit 1:** `bun run build`; `bun dev`; visit `/dashboard`, `/_design/blocks/chart-line-default`, `/_design/blocks/chart-bar-interactive`, `/_design/ai`. Toggle dark/light to confirm chart colors still look right.

### Commit 2 — `refactor: --s-* spacing tokens + sparkline opacity + kbd polish`

Adopt remaining reference conventions.

1. Add `--s-1: 4px` through `--s-16: 64px` to `@theme` in `src/app/globals.css`. Don't retrofit existing usages — the tokens become _available_ for new code. Add a brief section to `/_design/tokens` (`src/app/design/tokens/page.tsx`) displaying the scale. This costs nothing and makes the tokens discoverable.
2. `src/components/orbit/sparkline.tsx:33` — change `opacity-60` → custom `style={{ opacity: 0.55 }}` or add `opacity-55` as a `@utility` in globals.css (more reusable; tiny win).
3. Extract `<Kbd>` as `src/components/orbit/kbd.tsx`:
   - 10px mono, fg-subtle, `px-[5px] py-[2px]`, `rounded-[3px]`, `shadow-[inset_0_0_0_1px_var(--color-line)]`.
   - Replace the inline `<kbd>` usages in `src/components/layout/topbar.tsx:63-65` and the `CommandItem` hints in the palette.
4. Document the `<Kbd>` in `/_design/components` next to the Icon section.

**Verify commit 2:** Visual check on topbar ⌘K chip; `/_design/components` renders Kbd section; `/_design/tokens` renders spacing scale.

### Commit 3 — `feat: env loader + integration placeholder modules`

Turn the template from "showcase" into "ready to plug in". Per user decision: no real providers wired yet, just scaffolding that makes adding them a single-file change.

1. **`src/env.ts`** — Zod-validated env access. Hand-rolled (no new dep; we already have Zod).

   ```ts
   import { z } from "zod";
   const schema = z.object({
     // Public (exposed to the client — prefix NEXT_PUBLIC_)
     NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
     // Private (server-only)
     AI_PROVIDER: z.enum(["mock", "openai", "anthropic"]).default("mock"),
     OPENAI_API_KEY: z.string().optional(),
     ANTHROPIC_API_KEY: z.string().optional(),
     AUTH_SECRET: z.string().optional(),
     AUTH_GITHUB_ID: z.string().optional(),
     AUTH_GITHUB_SECRET: z.string().optional(),
     DATABASE_URL: z.string().optional(),
   });
   export const env = schema.parse(process.env);
   ```

   Fails fast at startup if required vars are missing when a provider is selected.

2. **`.env.example`** — documents every var above with one-line explanations and which integration it unblocks.

3. **`src/integrations/ai/index.ts`** — exports a `chat(messages)` function that:
   - Reads `env.AI_PROVIDER`;
   - If `mock`, returns a call to the existing `/api/chat` SSE mock;
   - If `openai` / `anthropic`, has a clearly-marked TODO block with the 3-line provider swap, throwing a helpful error until someone wires it.

4. **`src/integrations/auth/index.ts`** — exports `getSession()` (returns `null` today), `requireSession()` (throws `unauthorized()` today), `signIn(provider)` / `signOut()` stubs. ProfileMenu and future protected routes import from `@/integrations/auth` — swapping to Auth.js later is a single-file change.

5. **`src/integrations/db/index.ts`** — exports typed `getDeployments()`, `getServices()` etc. that today read from `src/data/*`; marked with a TODO for Drizzle wire-up. Mirrors the shape real DB calls will have.

6. **`src/integrations/README.md`** — single top-level README that explains the pattern, lists the three slots (ai / auth / db), and has a "how to wire a real provider" copy-paste recipe for each.

7. Refactor one existing consumer of `src/data/*` to go through `src/integrations/db` (e.g. `ConservativeView`) to prove the indirection layer works. Keep the same data; just change the import.

Roughly 8 small files, ~250 LOC total. Each integration is independent — future commits swap any one in.

**Verify commit 3:** `bun run build` still green; `ConservativeView` still renders deployments; `/api/chat` unchanged behaviourally; `.env.example` parses if copied to `.env.local`.

### Commit 4 — `chore: symlink AGENTS.md → CLAUDE.md`

```
rm AGENTS.md
ln -s CLAUDE.md AGENTS.md
git add AGENTS.md
```

Git tracks symlinks natively. Tools that read `AGENTS.md` (codex, cursor) now get the authoritative CLAUDE.md. Confirm in the commit that `cat AGENTS.md` returns CLAUDE.md contents on the CI runner.

### Commit 5 — `docs: documentation map + cross-links`

Add a new **"Documentation map"** section to `CLAUDE.md` (near the top, right after the 1-paragraph intro, before "Where to find examples"):

| Where                                                      | What                                                                     | Read when                              |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| `DESIGN.md`                                                | Design-system spec — tokens, components, variations, philosophy          | Making any visual decision             |
| `CLAUDE.md`                                                | Agent conventions, import rules, forbidden edits                         | Writing code (always)                  |
| `README.md`                                                | Quick-start + stack summary + route list                                 | Onboarding                             |
| `/_design/tokens`                                          | Live token reference                                                     | Picking colors / spacing / shadows     |
| `/_design/components`                                      | Orbit atoms in every variant                                             | Before writing a new atom              |
| `/_design/blocks`                                          | shadcn blocks catalog + demos                                            | Before composing a new dashboard       |
| `/_design/surfaces`                                        | Full-page patterns (auth / settings / billing / detail / empty / errors) | Before writing a new page              |
| `/_design/ai`, `/_design/ai/reasoning`, `/_design/ai/code` | AI surfaces                                                              | Building an AI feature                 |
| `src/integrations/README.md`                               | How to wire real AI / Auth / DB providers                                | When taking the template to production |
| `_reference/`                                              | Original vanilla-React mock (read-only)                                  | Archaeological context — don't import  |

Other doc edits in the same commit:

- Add a matching "Documentation map" link from `DESIGN.md` (a single line pointing to `CLAUDE.md#documentation-map`).
- Add a matching link from `README.md`'s Documentation section.
- Verify all three agree on doc ordering (human: README → DESIGN → /\_design; agent: CLAUDE → DESIGN → /\_design).

### Commit 6 — `chore: final formatting + build sanity`

Run `bunx oxfmt` and `bunx oxlint --fix` over the changed files; run `bun run build`; visit all routes. Expected to be a no-op diff if hooks caught everything. Catches any formatting nits and serves as the sign-off commit.

## Critical files to be modified

- **`src/app/globals.css`** — chart tokens, spacing tokens, optional `opacity-55` utility
- **`src/components/ui/card.tsx`**, **`site-header.tsx`**, **`chart-bar-interactive.tsx`** — border color fix
- **`src/components/chart-line-default.tsx`** — add YAxis
- **`src/components/ai-elements/prompt-input.tsx`** — textarea padding override (at call site only; do not fork ui/input-group)
- **`src/components/orbit/sparkline.tsx`** — opacity polish
- **`src/components/orbit/kbd.tsx`** (NEW) — Kbd helper
- **`src/components/layout/topbar.tsx`** — consume Kbd
- **`src/components/command-palette/command-palette.tsx`** — consume Kbd
- **`src/app/design/tokens/page.tsx`** — spacing scale section
- **`src/app/design/components/page.tsx`** — Kbd section
- **`src/env.ts`** (NEW) — Zod env schema
- **`.env.example`** (NEW) — env docs
- **`src/integrations/{ai,auth,db}/index.ts`** (NEW)
- **`src/integrations/README.md`** (NEW)
- **`src/components/views/conservative-view.tsx`** — one import swap to exercise `integrations/db`
- **`AGENTS.md`** — becomes a symlink
- **`CLAUDE.md`** — Documentation map section
- **`DESIGN.md`**, **`README.md`** — cross-link into the map

## Verification

1. `bun run typecheck` clean.
2. `bun run lint` — 0 errors.
3. `bun run build` — full production build succeeds, all 30+ routes generated.
4. `bun dev` and visit:
   - `/dashboard` → subtle borders, chart series use workflow palette (blue/pink/red/green/amber).
   - `/_design/blocks/chart-line-default` → renders with clear Y axis and workflow-coloured lines.
   - `/_design/blocks/chart-bar-interactive` → series spread across the workflow spectrum.
   - `/_design/ai` → prompt input placeholder vertically centered; type a message, confirm growth still works.
   - `/_design/tokens` → new spacing-scale section visible.
   - `/_design/components` → new Kbd section visible.
5. `test -L AGENTS.md && head -1 AGENTS.md | grep -q "@AGENTS.md\|^#"` — confirms symlink and contents.
6. Copy `.env.example` → `.env.local`, run `bun run build` — should pass with all `AI_PROVIDER=mock` defaults.
7. `grep -R "from \"@/lib/cn\"" src/` — should be empty (left over from Phase 2.1 rename).
8. Doc smoke: open `CLAUDE.md` Documentation map, click every link, confirm each resolves.

## Out of scope (explicit non-goals)

- Deep restyling of vendored shadcn block output beyond the border fix. The token bridge is the compromise.
- Migrating charts off Recharts.
- Replacing the PromptInput textarea wholesale.
- Installing Auth.js / Drizzle / a live AI provider — only stubs per user decision.
- Extending surface breadth (new `/_design/surfaces/*` routes). Consistency first.
- Retrofitting existing `p-N` / `gap-N` usages to the new `--s-*` scale. Tokens become _available_; adoption is opportunistic.
