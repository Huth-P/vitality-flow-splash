# Unlocked Insights screen

## Build
- Keep the existing locked `/insights` screen unchanged for fewer than 10 valid dated check-ins.
- Replace the current 10+ redirect with the unlocked Insights view, matching the supplied 430×932 reference and requested white, plum, lavender, pink, and warm-yellow cards.
- Add the exact section headings and copy for “POSSIBLE PATTERN”, “WHAT CHANGED”, and “WORTH DISCUSSING”, with the existing system font, static rendering, 3px focus treatment, and scroll-safe fixed-width frame conventions.
- Keep the back control linked to `/progress` and add a clickable “Create summary >” control linked to a minimal `/summary` placeholder because that route does not currently exist.

## Local data behaviour
- Defensively read valid `YYYY-MM-DD` entries from `vf.checkIns`; malformed or missing data counts as zero and cannot crash the page.
- Preserve date-key uniqueness and ascending date order. A newly saved check-in for today naturally replaces the seeded record for the same date, so the real record wins without duplicates or lost records.
- For the unlocked trend, select valid `Trouble sleeping` decimal ratings and display the first and last available values with one decimal place. With the supplied mock data this renders `3.8 → 2.6`.
- Read the chosen change defensively from the existing local profile/change records and render the requested magnesium sentence for the supplied mock setup data.
- Do not embed or automatically write the 12-day mock dataset in app code. It will be seeded only in the verification browser, as requested.
- Keep all storage device-local with no cookies, analytics, remote assets, or network calls.

## Verification
- Clear storage and confirm `/insights` still shows the unchanged locked screen.
- Seed the 12-day decimal mock data in the test browser and confirm the unlocked screen, exact copy, card colours, `3.8 → 2.6`, and `/summary` navigation.
- Save today’s check-in through `/check-in`, then confirm `/insights` and `/progress` read the updated same-date record once, with no duplicate date.
- Check 430px and narrow layouts, reduced-motion mode, offline behaviour, console errors, external requests, and the preview build status.

## Technical note
- The supplied mock file uses `vf.entries` with camelCase symptom names, while the app uses date-keyed `vf.checkIns` with display-name rating keys. Verification will adapt the mock values to the app’s existing `vf.checkIns` shape without shipping test data.
