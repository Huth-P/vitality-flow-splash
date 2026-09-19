# Welcome Logo and Onboarding Steps 2–3

## Scope
- Update the Welcome screen’s mark to use the two exact paths from the supplied `logo.svg`, while preserving all other approved Welcome content and styling.
- Finish Age Range as Step 2 of 4 with five choices.
- Replace the current Step 3 placeholder with the supplied Main Focus screen.
- Do not alter Splash or Journey Stage Step 1.

## Welcome logo
- Replace only the current three-stroke approximation with the supplied two-path logo artwork, cropped and scaled to the existing header position.
- Keep the wordmark, gradient, copy, spacing, CTA, and navigation unchanged.
- Use the same supplied mark for the favicon if the project does not already have it.

## Age Range — Step 2 of 4
- Preserve the 430 × 932 white device frame, status time, accessible back control, centred step label and four-part progress indicator.
- Use the exact heading and supporting copy supplied.
- Present one labelled radio group with five options: “Under 40”, “40–45”, “46–50”, “51–55”, and “56+”.
- Keep Continue disabled until one choice is selected; selected rows use the existing cream and plum brand tokens.
- On Continue, save `{ age_range: selectedValue }` to `vf.onboarding.step2`, then navigate to Step 3.
- If saving fails, remain on the screen, keep Continue enabled, and show exactly: “We couldn't save your answer right now — please try again.”

## Main Focus — Step 3 of 4
- Replace the placeholder with the reference-matched device layout: status time, accessible back control to Age Range, centred “Step 3 of 4” label, progress indicator, semantic heading, supporting copy, symptom list, and fixed-bottom Continue button.
- Include the nine named reference choices plus “Other”. Selecting “Other” reveals a labelled text field where the user can add their own symptom wording; a non-empty entry becomes the actual saved label and participates in the same three-choice limit.
- Preserve the custom label’s spelling exactly in local storage so it can support a future, separately scoped opt-in sharing feature; do not transmit or aggregate it now.
- Implement a labelled multi-select group capped at three choices. The first active selection is `main_focus`; later selections are `tracked_alongside`. If the main choice is removed, promote the earliest remaining selection.
- Show “Main focus” only on the first active choice. Keep Continue disabled until at least one choice is selected.
- Save `{ main_focus, tracked_alongside }` to `vf.onboarding.step3` on Continue. If saving fails, show the same calm inline message and leave Continue enabled for retry.
- Continue will lead to a temporary Step 4 placeholder so the route is complete and testable.

## Accessibility, privacy, and states
- Use semantic headings, labelled controls, accessible icon-only back links, keyboard-operable rows, and visible focus rings of at least 2px.
- Disable transitions and animations under reduced motion.
- Use system fonts and existing brand tokens only; add no cookies, analytics, remote assets, backend calls, or interaction-time network requests.
- Because all choices are bundled synchronously, do not introduce artificial loading or empty states; reserve those patterns for later data-backed screens.

## Verification
- Compare the Welcome logo against the supplied SVG without changing the rest of Welcome.
- Test Step 2 selection, disabled/enabled Continue, exact saved object, save-failure retry, forward/back navigation, and fresh-load state.
- Test Step 3 one-to-three selection limit, main-focus promotion, badge state, exact saved object, save-failure retry, and navigation.
- Check keyboard focus, reduced-motion rendering, 430 × 932 and desktop framing, build health, console errors, and external network requests.
