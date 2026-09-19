# Welcome screen + Splash polish

Three pieces of work, all using the existing brand tokens (`--plum`, `--plum-deep`, `--cream`) — no new colour variables.

## 1. Splash fixes (src/routes/index.tsx)

- **Clearer "f" in the mark**: redraw the inline SVG so the right stroke rises into an unmistakable tall "f" — a proper ascender curve with a clear crossbar sweeping across the stem, matched against the reference image. Iterate with browser screenshots until it reads clearly as "Vf".
- **Stronger fades**:
  - Fade-in: longer, softer entrance (~0.9s ease-out).
  - Fade-out: before routing to Welcome (auto at 1.2s or on tap), the whole splash fades to transparent over ~400ms, then navigates — so the transition feels like a crossfade instead of a hard cut.
  - `prefers-reduced-motion`: no animation at all; navigation happens instantly (unchanged behaviour).

## 2. Welcome screen (replace existing src/routes/welcome.tsx)

White background inside the 430×932 rounded frame, top-to-bottom:

1. **Hero block** (top, ~y0–440): soft plum-to-cream gradient panel with a subtle organic brushstroke shape (inline SVG, no images), matching brand tone.
2. **Headline** (`<h1>`, ~32–34px, plum): "Welcome to Vitality Flow"
3. **Body paragraph** (17px, line-height 1.5, `#2A292F`): "Your private companion for tracking peri-menopause and menopause — symptoms, cycles, moods and more, at your own pace." (draft copy — easy to tweak)
4. **Privacy callout** in a soft cream (`--cream`) panel: lock icon + "Your data stays on your device. No account, no cloud sync, no tracking — everything you log belongs to you."
5. **Primary CTA**: plum fill, cream label "Get started >", height 52px, radius 16px, full width with 24px gutters → routes to `/journey-stage` (Step 1 of 4). Nothing is saved yet.
6. **Disclaimer caption** (~13px, `#737080`): "Vitality Flow is a self-tracking tool, not medical advice."

Accessibility: semantic `<h1>`, visible ≥2px focus ring on the CTA, contrast-checked text, fully static render under reduced motion. Screen fades in gently on arrival (skipped under reduced motion).

## 3. Journey Stage placeholder (new src/routes/journey-stage.tsx)

Minimal placeholder route so "Get started >" has somewhere to go: plum frame, "Step 1 of 4" heading, empty-state copy "Nothing here yet — start your first check-in." The real Journey Stage screen will replace it in a later step.

## Technical notes

- No new colour tokens; body text greys (`#2A292F`, `#737080`) are one-off text colours applied inline via arbitrary values, not new design tokens.
- No network calls, no fonts, no images, no cookies, no analytics — all artwork is inline SVG, fonts are the system stack.
- Each route gets its own `head()` metadata.
- Verify in browser: fades look right, mark reads as "Vf", CTA navigates, reduced-motion is static, zero console errors / network requests.
