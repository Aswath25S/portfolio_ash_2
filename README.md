# Handoff: Aswath Suresh — Shape-Shifting Portfolio

## Overview
A single-page personal portfolio that presents one person across four professional "worlds" — **Tech**, **Consulting**, **Leadership**, and **Other Stuff** (reading/interests). The defining idea: **the entire site's visual identity — fonts, colors, layout language — transforms to match whichever world the visitor enters.** A landing page offers four expanding panels; selecting one plays a full-screen wipe transition and re-skins the whole page.

Every world has a **dark and light mode**, an animated entrance, a persistent nav, an About modal, and a "download résumé" action that builds a .txt file client-side from the data.

## About the Design Files
The file in this bundle (`Portfolio.dc.html`) is a **design reference created in HTML** — a working prototype showing the intended look, motion, and behavior. It is **not** production code — it has been recreated as a React + TypeScript + Vite application in `src/`.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, transitions, and interactions are final and intentional, lifted pixel-for-pixel from `Portfolio.dc.html`.

---

## Architecture at a glance

There is **one page** with a single state machine. Two axes of state drive everything:

1. **`view`** — one of `landing` | `tech` | `consulting` | `leadership` | `reading`. Determines which section renders AND which theme/font set is active.
2. **`mode`** — `dark` | `light`. Persisted to `localStorage` (`asw_mode`). Every view has both.

Plus transient UI state: `modalOpen` (About dialog) and the transition-overlay fields.

A **theme object `t`** is computed from `(view, mode)` on every render via `themeFor()` and threaded into styles everywhere.

### Component breakdown (src/)
- `App.tsx` — owns `view`, `mode`, `modalOpen`; computes `theme`; renders nav + active section + overlay + modal.
- `views/LandingView.tsx`, `TechView.tsx`, `ConsultingView.tsx`, `LeadershipView.tsx`, `OtherView.tsx` — one per world.
- `components/CategoryNav.tsx` (sticky top bar, shown on all non-landing views).
- `components/TransitionOverlay.tsx` (full-screen wipe).
- `components/AboutModal.tsx`.
- `components/CategoryFooter.tsx` (shared, non-landing).
- `data/content.ts`, `data/theme.ts` — palettes, fonts, landing metadata, and all copy.

---

## Design Tokens

### Fonts (Google Fonts)
`Space Grotesk` (400–700), `JetBrains Mono` (400/500/700), `Spectral` (400–700 + italics), `Libre Franklin` (400–700), `Newsreader` (400/500/600 + italics), `Work Sans` (400–600), `Bricolage Grotesque` (opsz 12–96, 400/600/800), `Instrument Serif` (regular + italic), `Space Mono` (400/700 + italic).

Per-world font roles (`head` / `body` / `mono`):
- **tech** — head `Space Grotesk`, body `JetBrains Mono`, mono `JetBrains Mono`
- **consulting** — head `Spectral`, body `Libre Franklin`, mono `Space Mono`
- **leadership** — head `Instrument Serif`, body `Newsreader`, mono `Work Sans`
- **reading/other** — head `Bricolage Grotesque`, body `Spectral`, mono `Space Mono`
- **landing** — head `Bricolage Grotesque`, body/mono `Space Grotesk`

### Color palettes — `PAL[view][mode]`
See `src/data/theme.ts` for the full, exact values (lifted from `Portfolio.dc.html`).

**Theme resolution rule:** `theme = PAL[view][mode] ?? PAL[view].dark ?? PAL[view].light`, then merge in the font roles for that view. If `view === 'tech'` and the `techAccent` prop is set, it **overrides** `t.accent`.

---

## Screens / Views
1. **Landing** — four expanding panels (hover → `flex-grow:2.6`), hero copy, header w/ About/Résumé/theme toggle.
2. **Category nav** — sticky, active tab filled, present on all non-landing views.
3. **Tech** — terminal/git-log aesthetic, scanline bg, blinking cursor, stats grid, experience timeline, projects grid, toolkit chips.
4. **Consulting** — strategy-deck/exhibit aesthetic, serif headings, exhibit metrics grid, numbered engagement rows.
5. **Leadership** — magazine editorial aesthetic, portrait placeholder, pull quote, multi-column bullet entries.
6. **Other Stuff** — zine/collage aesthetic, rotated collage cards with hard-offset shadows.
7. **Category footer** — Education / Get in touch / Also, shared across non-landing views.
8. **About modal** — bio + contact + résumé download.
9. **Transition overlay** — full-screen wipe on world change (430ms).

## Interactions & Behavior
- **Enter a world:** landing panel click OR nav tab click → `transitionTo(view)`; overlay fades in, swaps view after 430ms, fades out, scrolls to top.
- **Theme toggle:** flips `mode`, persists to `localStorage['asw_mode']`.
- **Résumé download:** builds a plain-text résumé from `content` data and triggers a `.txt` blob download.

## Configuration
- `defaultMode` (`'dark'|'light'`, default `dark`).
- `showReadingList` (boolean, default `true`) — hides the Other Stuff world when false.
- `techAccent` (color, default `#39ff14`) — overrides the tech accent.

## Contact
`aswathsureshjhu@gmail.com`, `+1 (410) 493-7355`, `linkedin.com/in/aswathsuresh25`.

## Files
- `Portfolio.dc.html` — original design reference (kept for provenance; not used at runtime).
- `src/` — the production React implementation.
