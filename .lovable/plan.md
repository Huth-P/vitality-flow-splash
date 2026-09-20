# Screen 11: Insights (Locked)

Replace the `/insights` stub with the locked Insights screen, shown when the user has fewer than 10 check-ins. With 10 or more check-ins, `/insights` silently redirects to `/progress` (the real Insights screen comes later).

## What you'll see

- White 430×932 frame matching the other screens, "9:41" status time top-left (aria-hidden).
- Back chevron top-left (lucide `ChevronLeft`, aria-label "Go back") — navigates to `/progress`, 3px plum focus ring.
- Semantic h1 "Your insights" (28px, #2A292F), subheading "Available after 10 check-ins" (16px, #737080).
- Centred lucide `Lock` icon (#4A2B4E, ~48px), no extra graphics.
- Heading "A little more time helps make patterns clearer." (24px, #2A292F, medium weight).
- Body (16px, #737080): "Keep checking in each day. Insights will appear after your tenth check-in, once there is enough information to compare your recent experience."
- Progress box: 16px radius, fill #F3EBF8, 1px border #E8D9F0, full width inside the gutters.
  - Label "n of 10 check-ins" (16px, #2A292F, medium), n = check-in count clamped 0–10.
  - Bar below: full width, ~6px tall, background #D9D3CC, foreground #4A2B4E, width = n/10. Plain divs, no border radius on the bar, no animation.
- Primary CTA (full width in gutters, 52px, 8px radius, #4A2B4E, white 16px/600) "Continue checking in >" — navigates to `/check-in`, 3px plum focus ring.
- Privacy footer line "Your selections stay on this device. Nothing is sent to a server." kept from the current stub (matches sibling screens).

## Behaviour

- Read `vf.checkIns` defensively after mount (guarded JSON parse; count only `YYYY-MM-DD` keys; clamp 0–10). Bad/missing data = 0, no crash.
- Count ≥ 10 → `navigate({ to: "/progress", replace: true })` from the same effect; the locked screen never shows a full bar in practice.
- localStorage only — offline after first paint; no cookies, analytics, or remote assets; system font; static render (reduced-motion safe by construction).

## Technical notes

- Rewrite `src/routes/insights.tsx` (route id stays `/insights`); `lucide-react` is already installed. Follow the frame/token conventions in `src/routes/progress.tsx` (plum #4A2B4E, greys #2A292F/#737080/#989694, `bg-plum-deep` backdrop, 24px gutters, scrollable body so the CTA stays reachable at 430×932 and ~360px).
- `head()` updated: title "Your insights (locked) — Vitality Flow" style metadata, unique description, og/twitter tags.
- `src/routes/progress.tsx` needs no change — its "View insights >" button already routes here.
- Verify with Playwright at 430×932 and 360px: empty storage (0 of 10, empty bar), malformed storage, 5/10 (half bar), 9/10 (nearly full), 10/10 (redirects to /progress), back chevron → /progress, CTA → /check-in, reduced-motion, clean console, no external requests.
