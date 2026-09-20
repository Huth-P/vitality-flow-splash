# Change-aware Daily Check-in ratings

## Update `/check-in`
- Keep the existing app bar, en-GB date, heading and subtitle, notes field, save action, privacy footer, confirmation screen, dashboard handoff, and back navigation.
- Add a soft plum summary pill below the heading that shows the chosen change as one readable line.
- Read the requested nested `vf.profile.chosenChange` shape and fall back to the app’s current flat `vf.profile` shape, so existing profiles continue to work.
- Format available details in order: label, amount/value with unit, frequency, then timing; omit missing parts cleanly.

## Replace symptom selection with ratings
- Replace the two-column checkbox grid and selection counter with ten stacked symptom groups.
- Give every symptom its exact requested title and endpoint labels, with six radio choices numbered 0–5.
- Make each choice a stable 44px target with a visible plum selected state and 3px plum keyboard focus ring.
- Use accessible fieldsets, legends, radio names, and labels so each scale is independently keyboard-operable and announced correctly.
- Keep the fixed 430 × 932 device presentation while allowing the long rating form to scroll naturally; keep the save area reachable without overlapping content.

## Local data and compatibility
- Continue using `vf.today` and the date-keyed `vf.checkIns` object, preserving other saved dates when today is updated.
- Save today as `{ date, ratings, notes }`, where `ratings` maps each symptom name to a number from 0–5.
- Pre-fill valid ratings and notes when today already has a rating-based check-in.
- Treat older check-ins containing the previous symptom array as unrated while preserving their notes; saving converts only today’s entry to the new rating format.
- Keep storage failures inline and retryable, with no cookies, analytics, remote services, or network calls.
- Require at least one rating before save, adapting the existing inline validation to the new controls while leaving the save button enabled.

## Verification
- Test both nested and current flat profile shapes, including the full supplement example and profiles with fewer details.
- Test all ten 0–5 scales, mouse/touch selection, arrow-key radio behaviour, visible focus, and immediate pre-fill after reopening today’s check-in.
- Verify notes, date formatting, date-keyed merge, validation, storage failure handling, confirmation, and navigation.
- Check the 430 × 932 and wider layouts, reduced-motion mode, build/runtime logs, console output, and confirm there are no external network requests.
