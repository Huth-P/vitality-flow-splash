# Splash Logo Correction and Journey Stage

## Scope
- Keep the completed Welcome screen unchanged.
- Reuse the existing `--plum`, `--plum-deep`, and `--cream` tokens without adding or redeclaring colours.

## Splash mark
- Replace only the splash screen’s current three-stroke approximation with the two exact source paths from the supplied logo artwork.
- Crop and scale those paths inside the existing inline SVG so the original proportions and distinctive lower-case “f” shape are preserved in cream on plum.
- Keep the current wordmark, timing, tap/keyboard behaviour, device frame, and reduced-motion handling unchanged.
- Capture the rendered splash at the 430 × 932 target size and compare its silhouette and proportions directly with the supplied logo before proceeding.

## Journey Stage — Step 1 of 4
- Replace the existing placeholder with the supplied white, 430 × 932 onboarding layout: status time, accessible back control, centred step label/progress indicator, semantic headline, subtitle, five radio-style option rows, and bottom Continue button.
- Use these choices from the reference: “My periods are normal”, “My periods are changing”, “My periods are irregular (2–3 months)”, “I haven’t had a period for 12+ months”, and “I’m not sure”.
- Implement the rows as one labelled single-select group with clear selected, keyboard-focus, and disabled-button states. The selected row uses cream and plum; Continue stays disabled until a choice is selected.
- On Continue, save the selected value as `journey_stage` in localStorage object `vf.onboarding.step1`, then navigate to the new Age range Step 2 of 4 screen shown in the latest reference.
- Build that Age range screen with the same frame and progress pattern, the supplied heading and supporting copy, five single-select ranges (“Under 40”, “40–45”, “46–50”, “51–55”, “56+”), and a Continue button disabled until selection. Its later persistence/next-step behaviour remains outside this task.
- If local storage is unavailable, keep Continue enabled for retry and show this exact inline copy: “We couldn’t save your answer right now — please try again.” No cookies, analytics, remote assets, backend calls, or interaction-time network calls.
- Keep the screen static under reduced motion. Since the choices are bundled and synchronous, no artificial loading or empty state will be shown; the supplied empty-state and skeleton wording remains reserved for later data-backed check-in screens.

## Verification
- Check the splash comparison screenshot first.
- Test selection, disabled/enabled Continue, saved local value, forward navigation into the matching Age range screen, back navigation, keyboard focus, reduced-motion rendering, mobile/desktop framing, and absence of console or network errors.
