# Progress: redesigned empty state below "YOUR PATTERNS"

Replace the plain centred empty-state text on /progress (shown when there are fewer than 7 check-ins) with a placeholder card plus a message box. No changes when 7+ check-ins exist — the real pattern card, chart and insight stay exactly as built.

## What you'll see (empty state, < 7 check-ins)

1. **Placeholder card** — 16px radius, fill #F4EEE7, 1px border #D9D3CC, full width inside the 24px gutters.
   - Centred faint placeholder graphic: minimal inline SVG line-chart icon, #737080 at opacity 0.4.
   - Text below the icon (14px, #989694, centred): "Patterns will show here on Day 7".
2. **Message box** below the card — 16px radius, fill #F9E8E8, 1px border #E8C8C8, full width inside the gutters.
   - Heading "A pattern will emerge" (18px, #2A292F, medium weight).
   - Body (14px, #737080): "Check in for 7 days, and we'll show you possible connections in your records."
3. **"Educational only · not a diagnosis"** (13px, #737080, centred) sits after the message box, before the button. This line already exists globally on the screen — it is kept in place, so it appears below the message box in the empty state and below the insight in the charted state.

## Behaviour & constraints (unchanged)

- Trigger stays `count < 7` (and the `< 2 data points` fallback keeps using the same empty state).
- Static render only — no animation, reduced-motion safe.
- No cookies, analytics, or external requests; the SVG is inline.
- Scrollable body so the button stays reachable at 430×932 and ~360px; 3px plum focus ring on the button unchanged.
- Semantics: the card's text is plain copy; heading "A pattern may be emerging" from the charted state is untouched.

## Technical notes

- Edit `src/routes/progress.tsx` only: swap the `EMPTY_STATE_COPY` paragraph for the two new boxes (inline Tailwind with the existing hex tokens; the placeholder icon is a small hand-written inline SVG, aria-hidden).
- Keep `parseEntries` / `pickSymptom` / `describeTrend` / `LineChart` untouched.
- Verify with Playwright at 430×932 and 360px: empty storage (new empty state), 6 entries, 8–10 entries (charted state unchanged), CTA navigation, reduced-motion, clean console, no external requests.
