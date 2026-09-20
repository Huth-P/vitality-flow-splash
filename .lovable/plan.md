# Daily Check-in (Screen 08)

## Build
- Replace the current `/check-in` placeholder with the complete 430 × 932 Vitality Flow daily check-in, following the supplied SVG’s spacing and the existing cream/plum design system.
- Add the top bar, semantic en-GB `<time>` date, exact heading/subtitle copy, two-column symptom selector, notes textarea, inline status area, save button, and exact privacy footer.
- Reuse the existing onboarding symptom labels and up-to-three multi-select behaviour, with an immediate selected count and pre-filled values when today already has a saved check-in.
- Add a calm saved confirmation state, then provide a clear route into a new minimal Daily Dashboard stub. Back returns to Transition; the three-dot menu provides access to the dashboard.

## Local data and edge states
- On mount, safely read `vf.today`; use its stored date when valid, otherwise create today’s local calendar date in `YYYY-MM-DD` form and store it.
- Safely read `vf.checkIns` as a date-keyed object, pre-fill `vf.checkIns[date]` when present, and merge the submitted `{ date, symptoms, notes }` without overwriting other dates.
- Keep “Save check-in >” enabled. Show “Select at least one symptom to save” inline when empty, and a calm retry message if browser storage is unavailable or malformed.
- Keep all data on-device with no cookies, analytics, remote assets, scripts, services, or network requests.

## Accessibility and layout
- Use an `<h1>`, associated textarea `<label>`, checkbox semantics for multi-select, an announced count/status, 44px minimum targets, keyboard-operable controls, and visible 3px plum focus rings.
- Keep body and control contrast within the requested thresholds, prevent a fourth symptom from being selected, and ensure the compact form fits the 430 × 932 frame without overlap.
- Use static state changes and preserve the project’s reduced-motion behaviour.
- Give the new Daily Dashboard route unique page metadata consistent with the existing route metadata.

## Verification
- Test new and existing check-ins, selection/deselection and three-item limit, notes, date formatting, storage merge, save confirmation, back/menu/dashboard navigation, keyboard order, and storage failure handling.
- Check the 430 × 932 layout and a wider preview, reduced-motion mode, console/runtime output, and confirm the flow makes no network calls.
