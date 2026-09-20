# Check-in Complete screen (Screen 09)

## What you'll see

After saving a daily check-in, a calm celebration screen appears: a plum checkmark-in-circle, "Check-in complete", a "DAY n" streak pill, "Your month starts here", a short encouragement, and one button — "See my progress >" — leading to a new Progress placeholder. A brief confetti plays once per day; nothing animates when reduced-motion is on. No back button; one-way flow onward.

## Changes

### New route `src/routes/check-in-complete.tsx` (`/check-in-complete`)

- Same 430×932 frame convention as other screens; white inner surface (per approved mock), outer plum-deep backdrop on desktop, full-bleed on mobile, no overflow at narrow widths.
- Status-bar "9:41" top-left (aria-hidden), matching other screens.
- Checkmark-in-circle mark (lucide `Check` in a plum #4A2B4E filled circle), centred.
- Semantic `<h1>` "Check-in complete", 30px, #2A292F.
- Body "You've added today's experience to your personal pattern." — 17px, #737080 (≥4.5:1 on white).
- "DAY n" pill: centred rounded badge, fill #F4EEE7, label plum #4A2B4E, 16px/600. `n` = current streak.
- Sub-headline "Your month starts here", 22px, #2A292F.
- Reinforcement "Keep checking in daily. The more consistent the record, the easier it may be to notice patterns." — 16px, #737080.
- Privacy footer "Your selections stay on this device. Nothing is sent to a server." — 12px, #989694, centred, system font.
- Primary CTA (382×52 within 24px gutters, 8px radius, plum #4A2B4E, white 16px/600 label "See my progress >" — written as `{"See my progress >"}` since raw `>` breaks the build) with a visible 3px plum focus ring (≥3:1). Navigates to `/progress`.
- Own `head()`: unique title/description/og tags, og:type, twitter:card, no og:image.

### Streak calculation

- Read `vf.checkIns` (date-keyed, `YYYY-MM-DD`). Defensive parse: malformed JSON or non-object → streak 1 fallback for today's entry if present, else pill shows "DAY 1" only when a check-in exists; with no entries at all, calm state still renders (pill "DAY 1", never a crash).
- Count consecutive day keys ending at the most recent entry (today if present, else the latest saved date), stepping backwards one calendar day at a time while a key exists. Local-dates arithmetic (no UTC drift), consistent with en-GB usage.

### Confetti (once per day, reduced-motion safe)

- Lightweight CSS confetti: ~24 small plum/cream/soft-tone squares/circles absolutely positioned inside the frame, keyframed fall/fade over 1.5s, `pointer-events-none`, `aria-hidden`, removed from the DOM after the animation ends.
- Guarded by `window.matchMedia("(prefers-reduced-motion: reduce)")` — no particles at all when set.
- Once-per-day flag: on mount, read today's date from `vf.today`. Compare it to `vf.checkInCompleteSeen` in localStorage. If they match, skip confetti. If different (or missing), play confetti once, then save today's date to `vf.checkInCompleteSeen`. Use a 1600ms timeout to remove the confetti DOM nodes after animation ends.
- No new dependencies, no canvas libraries — pure CSS/React, fully offline.

### Flow change in `src/routes/check-in.tsx`

- On successful save, navigate to `/check-in-complete` instead of showing the inline "Check-in saved." confirmation (confirmation screen removed; approved choice).
- Everything else on the check-in screen unchanged: ratings, focus filtering, notes, validation, storage, back link.

### New placeholder `src/routes/progress.tsx` (`/progress`)

- Minimal stub in the standard frame: heading "Progress", calm placeholder copy ("Your progress will appear here."), a link back to today's check-in, own `head()`. Full Progress screen intentionally out of scope.

### Edge cases

- Missing/malformed `vf.checkIns` → no crash; screen renders with DAY 1 and confetti rules unchanged.
- Storage write of the once-per-day flag failing → screen still renders, confetti simply may replay next visit (fail silently, no error UI needed for a decorative flag).
- Fully offline, no cookies/analytics/remote assets; localStorage only; "your data" language; system fonts.

## Verification (Playwright, 430×932, reduced-motion="reduce" plus a normal-motion pass)

- Streak: fresh profile → DAY 1; re-check same day → DAY 1; entries today + yesterday → DAY 2; yesterday missing (gap) → DAY 1; malformed vf.checkIns → renders DAY 1, no console errors.
- Confetti: plays on first visit after save, not on re-entry same day; absent entirely under reduced-motion; particles gone from DOM after ~1.5s.
- CTA → /progress renders; no console errors; no external network requests.
- Layout: 430×932 no overflow; narrower width (~360px) clean; wider desktop frame centred.
- Focus ring on CTA is 3px plum; heading is a single h1.

## Technical notes

- Files: new `src/routes/check-in-complete.tsx`, new `src/routes/progress.tsx`, edit `src/routes/check-in.tsx` (save → navigate; delete the `saved` branch), tick `roadmap.md`.
- Streak helper lives in the new route file (small, local); reuses the same date-key format as `vf.checkIns`.
- Uploaded SVG used as visual reference only; not embedded.