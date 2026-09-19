# Fix: Circle alignment in the "Other" row (Step 3 Main Focus)

## Confirmed root cause (measured in the running preview)

Two real defects, both in the "Other" row in `src/routes/onboarding-step-3.tsx`:

1. **Horizontal drift (78px left).** When "Other" is selected, the row becomes
   `label + input(flex-1, max-w-32) + badge + circle`. Because the input is
   capped at max-width 8rem, the flex row's leftover free space is not
   absorbed, and the trailing circle ends up ~78px left of where every other
   row right-aligns its circle. Verified: deselected circle x = 798 (matches
   row 1), selected x = 719.8.
2. **Vertical jump (49px).** The row container is not a positioning context,
   so the sr-only checkbox inside it anchors outside the row. Clicking the row
   focuses that hidden checkbox and the browser scrolls the symptom list
   (max scroll = 49px) to bring it into view — the whole list jumps. Row 9
   clicks do not scroll; the "Other" row click scrolls 49px.

## Fix (Other row only — `src/routes/onboarding-step-3.tsx`, JSX lines 112–145)

Restructure the "Other" row into two stable slots, as the user specified:

```text
[ left slot: flex-1 min-w-0  ->  "Other" label + inline underlined input ]
[ right slot: shrink-0       ->  "Main focus" badge + sr-only checkbox + circle ]
```

- Add `relative` to the row container so the sr-only checkbox anchors inside
  the row (removes the 49px focus scroll).
- Wrap label + conditional input in a `flex min-w-0 flex-1 items-center gap-2`
  span so the left slot always absorbs all free space — the circle stays flush
  right, pixel-identical to other rows, with the input empty, focused, or full.
- Keep the right slot's visual order identical to normal rows
  (badge, then circle) and the circle markup/classes unchanged.
- Keep the input's underlined styling exactly (`h-7`, `max-w-32`,
  `border-b-2`, transparent background) and all existing classes otherwise.

**Not touched:** selection state, save/localStorage logic, three-choice cap,
main-focus promotion and badge logic, the 9 other symptom rows, Steps 1–2,
colours, spacing, or the inline error copy.

## Verification (Playwright, `/tmp/browser/circle-align/`)

1. Circle bounding box in three states — deselected, selected with empty
   input, selected with typed text — must keep the same x as row 1's circle
   (right-aligned, dx = 0) and stay vertically centred in the row.
2. Fieldset `scrollTop` must remain 0 when clicking the "Other" row (no jump).
3. Typing into the input must not move the circle (already true; re-check).
4. All 9 other rows' circles at identical positions before/after the change.
5. Selection still toggles, badge still shows on first selection, saved label
   and navigation behaviour unchanged; no console errors.
