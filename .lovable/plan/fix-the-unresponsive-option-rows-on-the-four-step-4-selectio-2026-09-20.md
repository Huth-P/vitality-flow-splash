# Fix the unresponsive option rows on the four Step 4 selection screens

## What's wrong

On `/change-details/supplements`, `/change-details/physical-activity`, `/change-details/sleep-routine` and `/change-details/dietary-changes`, only the option's short text is tied to the hidden radio. The rest of the 44px row — the empty space and the circle on the right — is plain markup with nothing to click, and the hidden radio is positioned as a tiny clipped element rather than sitting inside a clickable row. So most taps land on dead space and nothing selects.

## The fix

Rework each option row in the shared selection screen so the whole row is one clickable control:

- Make the row itself a `<label>` that wraps the real `<input type="radio">`, so any tap anywhere on the row — text, empty space, or circle — selects that option.
- Keep `checked={selection === option}` and `onChange` on the input as the single source of truth, so the circle fills the instant an option is chosen.
- Keep the row `relative` and the input visually hidden but anchored inside the row, so focusing it never scrolls the page.
- Confirm nothing on the row, input, or circle blocks pointer events.
- The "Other" row keeps its inner text field as a separate nested control, with clicks and typing in that field not re-triggering or cancelling the selection, and the circle staying exactly in place (no drift, no jump).

## Continue behaviour

- Continue becomes enabled only once an option is selected (and, for "Other", once text has been entered).
- The inline "Select an option to continue" message clears as soon as a selection is made.

Note: the current screens keep Continue always enabled and show that message on tap, which is the pattern used elsewhere in onboarding. This change switches these four screens to a disabled-until-selected button as requested.

## Unchanged

Option lists, wording, spacing, colours, row geometry, progress pills, CTA styling, back navigation, the routing branches, and everything saved locally stay exactly as they are. No other screen is touched.

## Verification

- Click every option on all four screens: circle fills immediately, message clears, Continue enables.
- Click dead space and the circle itself, not just the text.
- Keyboard: tab to the group, arrow keys move selection, focus ring visible.
- "Other": select it, type up to 60 characters, counter updates, circle stays fixed, no page jump.
- Continue routes correctly for each category; no console errors; preview builds.

## Files

- `src/components/change-details/CategoryOptionScreen.tsx` (the shared screen all four routes use)
- `roadmap.md`
