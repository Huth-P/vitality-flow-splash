# Vitality Flow — Splash / Launch screen

Build the splash screen as the app's `/` route, plus a styled placeholder `/welcome` route it auto-routes to. Pure brand statement: logo mark + wordmark only, no buttons, inputs, links, or chrome.

## Design

- Background: solid `#4A2B4E`, full viewport. Content centred on a device-frame-like column max-width 430 px, reference height 932 px, rounded corners (rx ≈ 32) on wide viewports; full-bleed on real phones.
- Logo mark: hand-drawn inline SVG recreation of the flowing cream "Vf" brushstroke from the attached reference (three tapered organic strokes: left V stroke, right f ascender, f crossbar). Cream `#F4EEE7`, centred around y ≈ 340–470 of the 932 frame.
- Wordmark "Vitality Flow" in cream, centred around y ≈ 560–590, system font stack only (no font loads).
- Entrance animation for non-reduced-motion users: mark + wordmark soft fade-in over ~0.6 s (pure CSS opacity, no slide/parallax). With `prefers-reduced-motion: reduce`: fully static render, no entrance animation.

## Files

- `src/styles.css` — add brand tokens: `--plum: #4A2B4E`, `--cream: #F4EEE7` (and registered `--color-*` mappings in `@theme inline`). Keep all colors token-based.
- `src/routes/index.tsx` — rewrite the placeholder. Splash component with:
  - `<h1>` wrapping mark + wordmark (headline is the h1; visually the wordmark, semantically the app name).
  - `aria-hidden` decorative SVG mark; visible, styled text wordmark for screen readers.
  - Timing: `setTimeout` of 1200 ms → navigate to `/welcome`; also navigate on `pointerdown` / `keydown` (Enter/Space) anywhere on the screen. Timer cleaned up on unmount; navigation guarded so it fires once.
  - `useNavigate` (or `<Navigate>` after timeout) for the route change.
- `src/routes/welcome.tsx` — placeholder Welcome route, same plum background, minimal "Welcome" heading + first-launch empty-state copy ("Nothing here yet — start your first check-in."), styled to the brand so navigation doesn't flash white.

## Behaviour & platform rules

- No network calls, no remote fonts (system font stack), no remote images, no third-party scripts, no cookies, no analytics. Works fully offline after first paint.
- No backend/cloud — state stays local (nothing persisted on this screen).
- Honour `prefers-reduced-motion`: no auto-animations, fades, or transitions anywhere on the splash (use a media query that disables the fade + the transition to Welcome).

## Accessibility

- Semantic `<h1>` for the app name; decorative SVG `aria-hidden` with `focusable="false"`.
- Tap-anywhere surface is a real focusable element (`role` implicit via button-like wrapper or `tabIndex=0` with `onKeyDown`) with a visible focus ring ≥2 px, contrast ≥3:1 (cream ring on plum).
- Wordmark contrast: cream `#F4EEE7` on plum `#4A2B4E` ≈ 9:1 — passes 4.5:1 body / 3:1 large text.
- Unique route `head()` on `/` (title "Vitality Flow", description, og/twitter meta; no og:image since the mark is inline SVG).

## Verification

- Playwright check: load `/`, screenshot, confirm no console errors, no network requests beyond document/CSS; confirm auto-navigation to `/welcome` after ~1.2 s; re-check with `prefers-reduced-motion: reduce` (static render, still navigates); tap-to-advance works.
