# Show only onboarding focus ratings

## Daily Check-in
- Read `vf.profile.mainFocus` defensively and accept only an array containing one to three non-empty strings.
- Match those strings exactly against the ten approved rating-scale symptom names.
- Render only matched scales, preserving the array order from onboarding.
- Keep the existing 0–5 controls, endpoint labels, plum selection and focus styling, chosen-change summary, notes, date handling, pre-fill, save confirmation, dashboard handoff, and local-only storage behaviour unchanged.
- Limit pre-filled and newly saved ratings to the displayed focus symptoms so stale ratings for hidden symptoms are not carried into today’s saved entry.

## Missing or invalid focus
- If `mainFocus` is absent, malformed, empty, or contains no exact matches, render no rating scales.
- Show calm inline copy explaining that the focus choices could not be found, plus a clear link back to Step 3.
- Keep the page stable and error-free without falling back to all ten symptoms.

## Preserve Step 3 choices in completed profiles
- The current setup stores Step 3 as `{ main_focus, tracked_alongside }` in `vf.onboarding.step3`, while later completion replaces `vf.profile` without those values.
- When setup writes the completed profile, derive `mainFocus` in selection order from that saved Step 3 data and include it alongside the existing chosen-change details.
- Make no visual or navigation changes to onboarding or change-detail screens.

## Verification
- Test profiles with one, two, and three exact `mainFocus` values; confirm only those scales render and in the stored order.
- Test missing, malformed, empty, partially recognised, and fully unrecognised values; confirm invalid entries are omitted and the calm fallback appears when none remain.
- Verify rating selection, keyboard controls, focus rings, existing-rating pre-fill, notes, date-keyed merging, validation, storage failure handling, confirmation, and navigation remain unchanged.
- Confirm the 430×932 and wider layouts, reduced-motion behaviour, successful build, no console errors, and no external requests.

## Implementation note
- The current checked-in `/check-in` source has reverted to the earlier checkbox version, while the established ratings implementation is available in project history. Restore that existing ratings behaviour first, then apply the focused filtering above without redesigning the screen.
