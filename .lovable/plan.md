# Remove "Other" from Amount dropdown (Screen 06 — Supplements)

## Change

File: `src/routes/change-details.index.tsx` only.

1. `AMOUNTS` constant: remove `"Other"` — becomes `["50mg", "100mg", "200mg", "400mg", "500mg", "1000mg"]`.
2. Delete the conditional "Other amount" input block (the `{fields.amount === "Other" ? ... : null}` JSX and its sr-only label).
3. Remove the now-unused `otherAmount` state and its references in `handleFinish` (`fields.amount === "Other" ? otherAmount.trim() : fields.amount` → just `fields.amount`) and in the Amount `onChange` (`if (value !== "Other") setOtherAmount("")` removed).

## Untouched

- Frequency and When dropdowns and their options
- Validation ("Add a value to finish setup"), Finish/save/routing to `/transition`
- Meditation/Hydration steppers, missing-data state, styling, Steps 1–3, intermediate screens

## Verification

- Amount dropdown shows exactly six options, no input field appears
- Supplements full path: Magnesium → 200mg → Once daily → Evening → Finish → `vf.profile` written → `/transition`
- No console errors, no network calls
