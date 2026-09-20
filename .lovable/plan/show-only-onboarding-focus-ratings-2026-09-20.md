# Show only onboarding focus ratings

## Daily Check-in
- Read `vf.profile.mainFocus` defensively and accept only an array of one to three non-empty strings.
- Match those values exactly against the ten approved rating-scale symptom names.
- Render only matched scales, preserving the saved order.
- Keep the existing 0–5 controls, endpoint labels, plum selection and focus styling, chosen-change summary, notes, date handling, pre-fill, validation, save confirmation, dashboard handoff, and local-only storage unchanged.
- Limit pre-filled and saved ratings to the displayed symptoms, so ratings for hidden symptoms are not carried into today's entry.

## Missing or invalid focus
- If `mainFocus` is absent, malformed, empty, or has no exact matches, render no scales.
- Show calm copy explaining the focus choices could not be found, plus a clear link back to Step 3.
- Never fall back to showing all ten symptoms, and never crash.

## Preserve Step 3 choices in the completed profile
- Setup currently saves Step 3 as `{ main_focus, tracked_alongside }` separately, and the final save replaces the profile without those values, so a normally completed profile has no `mainFocus`.
- When setup writes the completed profile, include `mainFocus` in selection order derived from the saved Step 3 answers, alongside the existing chosen-change details.
- No visual or navigation changes to onboarding or the change-detail screens.

## Verification
- Profiles with one, two, and three exact values: only those scales render, in saved order.
- Missing, malformed, empty, partly recognised, and fully unrecognised values: invalid entries omitted, calm fallback when none remain.
- Rating selection, keyboard operation, focus rings, pre-fill, notes, date-keyed merging, validation, storage-failure retry, confirmation, and navigation all unchanged.
- 430×932 and wider layouts, reduced motion, clean build, no console errors, no external requests.

## Technical note
- After the refresh, `/check-in` again holds the approved ratings version (ten scales, chosen-change pill, local save), so no restore is needed — the filtering is applied to that existing screen without redesigning it.
- The ten scale names stay the source of truth for exact matching; only the list rendered and the ratings kept in state change.
