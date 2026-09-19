# Fix the “Other” option in Main Focus

## Scope
- Change only the “Other” option on Step 3 Main Focus.
- Leave every other screen, symptom row, layout, colour, spacing, three-choice limit, and main-focus promotion rule unchanged.

## Behaviour
- Selecting “Other” immediately reveals a labelled, fill-in-the-blank style text input beside that row.
- Style the input with an underline rather than a surrounding box.
- Treat a non-empty custom entry as the selected symptom label while retaining its existing position in the selection order.
- Save the custom wording exactly as entered to `vf.onboarding.step3`, assigning it to `main_focus` or `tracked_alongside` under the existing ordering rules.
- Keep “Other” counted as one of the existing three choices.
- Deselecting “Other” clears its custom value and removes the selection.
- Clearing the field removes “Other” as an effective selection before continuing, so no empty label is saved.
- Keep all data local and make no network request.

## Verification
- Confirm the underlined input appears and receives focus when “Other” is selected.
- Confirm exact spelling is saved in place of “Other”.
- Confirm deselecting or clearing removes the custom entry without affecting other selections.
- Confirm the existing three-choice cap and main-focus promotion behaviour remain unchanged.
- Confirm there are no console, build, or interaction-time network errors.
