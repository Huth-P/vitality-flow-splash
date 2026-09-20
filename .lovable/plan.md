# Screen 10: Progress

Replace the current `/progress` placeholder with the real Progress screen, and add a simple `/insights` page for the button to lead to.

## What you'll see

- White 430×932 frame matching the other screens, with the "9:41" status time.
- Heading "Your progress" and below it "Day N of 30", where N is how many days you have checked in.
- A plum summary card: the check-in count large on the left, the percentage of 30 days on the right, with "check-ins completed" beneath.
- Section label "YOUR PATTERNS".
- A cream pattern card with the symptom name, "Daily rating", a simple plum line chart of your last 7–10 ratings with short en-GB dates along the bottom and a 0–5 scale, then the line "A pattern may be emerging" and a sentence describing the trend.
- "Educational only · not a diagnosis" and the privacy line "Your selections stay on this device. Nothing is sent to a server."
- Plum button "View insights >" leading to a new Insights page (placeholder for now).

## Behaviour

- Reads your existing saved check-ins (`vf.checkIns`), defensively — bad or missing data never crashes the screen.
- Fewer than 7 check-ins: the pattern card and insight are replaced by the calm line "A pattern will emerge. Check in for 7 days, and we'll show you possible connections in your records."
- 7 or more check-ins: charts the most recent 7–10 entries. Uses "Trouble sleeping" when you have ratings for it, otherwise your first chosen focus symptom (the card label shows whichever is charted).
- Fewer than 2 data points for that symptom: the same calm empty-state copy instead of a chart.
- The insight sentence adapts to your data — improving, steady, or more difficult — over the number of days actually charted.
- Fully static: no animation, nothing to hover, reduced-motion safe.
- No network calls, no cookies, no analytics; everything stays on the device, dates in en-GB.

## Technical notes

- Rewrite `src/routes/progress.tsx`; add `src/routes/insights.tsx` as a stub with its own `head()`.
- Data source: `vf.checkIns` (`{ [date]: { date, ratings: Record<string, 0–5>, notes } }`). Parse with a guarded JSON read, keep only `YYYY-MM-DD` keys, sort ascending, take the last 10.
- Focus symptom fallback via the existing `readMainFocus()` helper in `src/lib/main-focus.ts`.
- Chart is hand-built inline SVG (no chart library): fixed viewBox, polyline with `stroke #4A2B4E`, `stroke-width 2`, `fill none`, 0–5 y-scale, `<text>` date labels formatted with `Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" })`, `role="img"` plus an accessible description listing the values.
- Layout uses the existing frame/token conventions (plum `#4A2B4E`, cream `#F4EEE7`, greys `#2A292F`/`#737080`/`#989694`, border `#D9D3CC`); scrollable body so the button stays reachable at 430×932 and ~360px without overflow; 3px plum focus ring on the button.
- Verify with Playwright at 430×932 and 360px: empty data, 6 entries (empty state), 8–10 entries (chart + insight), malformed storage, focus-symptom fallback, reduced-motion, button navigation, and a clean console with no external requests.
