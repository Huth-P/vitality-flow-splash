# Change category — Step 4 of 4 onboarding

## Scope

- Rewrite `src/routes/onboarding-step-4.tsx` (currently a temporary placeholder) as the Change category screen.
- Add the user-specified screen colours to `src/styles.css` (user-requested addition; see Colours).
- Update `roadmap.md` task list.
- No other routes, components, or files are touched.

## Colours

Confirmed against `src/styles.css`:

- `--plum` #4A2B4E — reused for the CTA fill, selected-tile border, and check badge. No new plum shade.
- `--cream` is #F4EEE7 — **not** the same as #F7F1E8, so a separate tile-fill value is added (cream stays untouched for its existing uses).
- New screen-scoped variables added to `:root` in `src/styles.css` (registered in `@theme inline` for Tailwind classes), under a comment marking them as Change-category-screen colours:
  - `--vf-tile`: #F7F1E8 (tile fill)
  - `--vf-lavender`: #DBC7E5 (soft glow behind the two purple-icon tiles)
  - `--vf-disc-coral`: #E87368 (Supplements icon)
  - `--vf-disc-apricot`: #F3B57D (Physical activity icon)
  - `--vf-disc-teal`: #318B84 (Hydration and Dietary changes icons)
  - `--vf-disc-lilac`: #987CAF (Meditation and Sleep routine icon glyphs, with #DBC7E5 glow)
- Existing one-off greys reused: #2A292F (headline/body), #737080 (subtitle/stepper), #D5D0D5 (unselected tile border, progress bar).

If any glow/disc mapping above is wrong, it is a one-line change per tile.

## Layout (430 × 932 frame, desktop; full-bleed on mobile)

Same frame structure as Step 3: outer `bg-plum-deep`, white rounded frame, "9:41" status label, back chevron (→ /onboarding-step-3), stepper "Step 4 of 4" with all four progress segments in plum.

- Headline, semantic `<h1>`, verbatim: "What change have you decided to track to see if it works?" — 26px, 3-line wrap at y≈140–230.
- Subtitle verbatim: "Choose one to start with." — 16px, #737080, y≈260.
- 2 × 3 icon grid centred between y≈320 and y≈720. Tiles ≈178 × 178, 14px gutter. Each tile: #F7F1E8 fill, rounded 16px, inline-SVG line icon on a soft radial glow disc in the tile's colour (top half), verbatim label below: Supplements, Physical activity, Meditation, Hydration, Sleep routine, Dietary changes.
- Unselected tile: 1px #D5D0D5 border. Selected tile: 2px #4A2B4E border + check badge (plum circle, cream check) top-right.
- Continue button: x=24, y=848, w=382, h=52, `--plum` fill, label verbatim "Continue >". Disabled (45% opacity, same as Steps 1–3) until a tile is selected.

## Behaviour

- Single-select radio group (sr-only radio inputs inside each tile's label, same accessible pattern as Steps 1–3: `focus-within:outline-[3px]` plum ring on the tile label, fieldset + legend).
- Continue saves `{ change_category: <label> }` to localStorage key `vf.onboarding.step4a` inside try/catch. On failure: inline message exactly "We couldn't save your answer right now — please try again." and Continue stays enabled for retry (same pattern as Steps 1–3).
- Continue destination: minimal in-route saved confirmation ("Saved. The next screen is coming next.") with a back link — a stopgap until the next screen's design arrives; swapping it for the real route is a one-line navigation change.

## Privacy / GDPR / a11y / edge cases

- No cookies, analytics, third-party scripts, remote fonts, backend, or network calls. localStorage only. System font stack. Privacy-first copy.
- `<h1>` headline; radio group semantics; every tile is a labelled control with a ≥3px plum focus ring; Continue has a visible focus ring. Body contrast ≥4.5:1.
- `prefers-reduced-motion`: no transitions or animations on this screen (global reduced-motion CSS already handles this; nothing animated is added).
- Empty/skeleton states: not applicable — the six options are static, no async data, static render. Save-failure error is inline only, never a modal, CTA stays enabled.
- Route keeps its own `head()` metadata ("Change category — Vitality Flow" + step description, og/twitter tags).

## Verification

- Playwright against the dev server: tile single-select toggling, selected styling (2px plum border + check badge), Continue disabled→enabled, exact localStorage value in `vf.onboarding.step4a`, exact inline error copy on localStorage failure with Continue still enabled, back navigation, keyboard focus rings, reduced-motion, 430×932 framing on desktop, no console errors, no network requests.
- Check /tmp/observability/build-errors.log shows a clean build.
