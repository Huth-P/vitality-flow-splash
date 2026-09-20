# Build Change Details — Step 4 of 4

## Scope and integration

- Update the existing Change Category screen so Continue stores `vf.chosenChange` as `{ category, label: "", unit: "" }` and routes to `/change-details`.
- Add `/change-details` for the category-specific details form.
- Add a minimal `/transition` destination so Finish navigation is complete; it will only confirm setup completion and will not introduce additional product behaviour.
- Do not alter Steps 1–3, their state logic, or any unrelated screen.
- Use the supplied screenshot only as a visual reference, not as an embedded asset.

## Change Details screen

- Match the established 430×932 Vitality Flow frame, system font, white surface, warm-neutral palette, plum controls, four-part completed stepper, and mobile full-bleed behaviour.
- Add the keyboard-accessible back affordance, semantic “Tell us a bit more” heading, exact subtitle, fixed Finish CTA, inline message area, and visible privacy footer:
  - “Your selections stay on this device. Nothing is sent to a server.”
  - “Data stays on this device.”
- Read and safely parse `vf.chosenChange` after mount. Show static placeholders during that local read, then render either the matching category control or the calm missing-data state with one “Go back” action.
- Keep unfinished choices only in component state. No draft storage or intermediate keys.

## Category controls

- Supplements, Physical activity, Sleep routine, and Dietary changes: accessible native dropdown behaviour with the exact supplied options.
- Render each dropdown row using the required stable structure:

```text
[ relative row ]
[ left: min-w-0 flex-1 — label/current value/inline Other field ]
[ right: shrink-0 fixed chevron ]
```

- Selecting Other reveals a labelled, same-row underlined field (`h-7`, `max-w-32`, bottom border only), capped at 60 characters. Keystrokes remain local React state; the committed custom value is captured on blur and included only in the final profile save.
- Meditation: one centred, relative duration stepper, default 10 minutes, ±5, clamped 0–120.
- Hydration: one centred, relative glasses stepper, default 8, ±1, clamped 0–30.
- Both steppers expose value semantics, have labelled 44px buttons, support ArrowUp/ArrowDown on the focused stepper, and announce changes politely.

## Finish behaviour and errors

- Keep Finish enabled at all times.
- On Finish, validate the active detail. Missing required dropdown or Other text produces the inline message “Add a value to finish setup” without hiding or disabling Finish.
- Merge the original `vf.chosenChange` object with the category-specific detail, resolved label, and applicable unit, then write the result once to `vf.profile`.
- On storage failure, show the existing calm retry message inline and keep Finish enabled.
- On success, navigate to `/transition`.
- Make no network requests and add no cookies, analytics, remote assets, fonts, accounts, cloud storage, animation, spinner, or third-party script.

## Accessibility and visual verification

- Associate every control with a real label; mark decorative chevrons hidden; provide high-contrast 3px plum focus treatment and at least 44px targets.
- Ensure selection is communicated by visible text/weight as well as colour.
- Verify all six categories, every Other branch, 60-character handling, blur commit, stepper limits, rapid taps, arrow keys, polite announcements, tab order, and inline errors.
- Measure the dropdown chevron position empty/focused/filled/errored and confirm no horizontal drift or focus-induced page jump.
- Verify missing, malformed, and unavailable local storage states; exact merged `vf.profile`; back and Finish navigation; 430×932 and narrow mobile layouts; reduced motion; offline interaction; no console or network errors; and successful preview build.

## Files affected

- `src/routes/onboarding-step-4.tsx` — change the handoff key and destination only; preserve its category-grid behaviour and styling.
- `src/routes/change-details.tsx` — new screen.
- `src/routes/transition.tsx` — minimal destination required by the requested flow.
- `roadmap.md` — track this multi-file task.

No global style or colour-token changes are planned; existing `--plum`, `--cream`, established greys, Button styling, and screen conventions are sufficient.
