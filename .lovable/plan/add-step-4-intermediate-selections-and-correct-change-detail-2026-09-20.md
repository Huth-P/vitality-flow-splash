# Fix unresponsive radios: build the Step 4 intermediate selection screens

## Diagnosis

The four intermediate routes (`/change-details/supplements`, `/change-details/physical-activity`, `/change-details/sleep-routine`, `/change-details/dietary-changes`) and their shared radio-row component do not exist in the codebase — the earlier edits were never persisted, so there is no wired selection state on those screens at all. `onboarding-step-4.tsx` still routes every category straight to `/change-details`, and `/transition` is still the minimal stopgap. The fix is to build the intermediate screens for real, with correctly wired radio inputs.

## Scope

- Create a shared intermediate selection screen used by all four category routes.
- Create the four route files.
- Update only the Continue branch in `onboarding-step-4.tsx`.
- Update Change Details and Transition per the already-approved design, and add the `/check-in` placeholder Transition links to.
- Leave Steps 1–3 and the Meditation/Hydration steppers untouched.

## Working radio rows (the reported bug)

Each option row is a `<label>` wrapping a real `<input type="radio">`:

```text
<label> (full row, cursor-pointer, relative)
  <input type="radio" name="detail-option" value={option}
         checked={selection === option}
         onChange={() => setSelection(option)} />   (sr-only, not display:none)
  [left slot: min-w-0 flex-1 — option text / Other underlined input]
  [right slot: shrink-0 — 18px circle, plum fill + check when checked]
</label>
```

- Clicking anywhere on the row toggles the radio via the label association; `onChange` on the input updates React state (also verified to fire from keyboard).
- No `pointer-events: none` anywhere on the row, input, or circle; the circle is `aria-hidden` decorative, selection shown by fill + check mark (never colour alone).
- The "Other" row keeps the proven two-slot fix: relative row, `min-w-0 flex-1` left slot, `shrink-0` right slot, same-row underlined input (60-char cap, live counter) — selecting, focusing, or typing must not move the circle or scroll the page.
- Continue stays enabled; with no selection it shows `Select an option to continue` inline.

## Screens and flow

- Shared screen spec per the approved design: 430×932 white framed surface, hairline edge, four-pill Step 4 progress, 24px "Tell us a bit more" heading, 14px subtitle "Select your [supplement/activity/routine/change].", 44px rows at 53px pitch, bottom 52px pill CTA in the existing plum `#4A2B4E`.
- Exact option lists (verbatim): Supplements — Omega 3, Vitamin D, Magnesium, Creatine, Zinc, Iron, Other; Physical activity — Strength training, Walking, Running, Yoga, Pilates, Cycling, Swimming, Other; Sleep routine and Dietary changes — the six approved options each plus Other.
- Change Category Continue writes `vf.chosenChange` then branches: the four categories → their intermediate route; Meditation/Hydration → `/change-details` (unchanged).
- Intermediate Continue writes the label into `vf.chosenChange`. Supplements → `/change-details` (Amount: 50mg–1000mg/Other; Frequency: Once daily/Twice daily/As needed; When: Morning/Midday/Evening/Night/With food; Finish merges into `vf.profile` → `/transition`). Physical activity, Sleep routine, Dietary changes write `{ category, label }` to both `vf.chosenChange` and `vf.profile` and go straight to `/transition`.
- Change Details gets the approved visual correction (summary card, three dropdown rows, corrected CTA); the "Hmm, we lost that." state and steppers stay as-is.
- Transition becomes the approved completion screen ("You're ready. How are you feeling today?" … CTA "Start today's check-in →" → new minimal `/check-in` placeholder).
- Unique head() metadata on every new route. No network, cookies, analytics, or new storage keys.

## Verification

- Click every option on all four screens: circle fills immediately, inline message clears, Continue proceeds.
- Other branch: type to 60 chars, counter live, circle stays fixed (no drift, no scroll-jump), deselect clears.
- Branching: Meditation/Hydration direct to `/change-details`; four categories via intermediate; Supplements full path saves amount/frequency/when into `vf.profile`; the other three save `{ category, label }` and land on `/transition`.
- Keyboard: tab order Back → rows → Continue; arrows/space select; visible focus rings; 44px targets.
- No console errors, no network requests during interaction, reduced-motion static, 430×932 and narrow mobile, build OK.

## Files

- New: `src/components/change-details/category-options.ts`, `src/components/change-details/CategoryOptionScreen.tsx`, `src/routes/change-details.supplements.tsx`, `change-details.physical-activity.tsx`, `change-details.sleep-routine.tsx`, `change-details.dietary-changes.tsx`, `src/routes/check-in.tsx`
- Edit: `src/routes/onboarding-step-4.tsx` (branch only), `src/routes/change-details.tsx` (visual correction + Supplements rows), `src/routes/transition.tsx` (completion design), `roadmap.md`
