# Preserve decimal ratings in Insights

## Implementation
- Keep the Insights sleep trend formatted to one decimal place so values render as `3.8 → 2.6`.
- Remove any rating-specific whole-number formatting or rounding found during implementation, without changing unrelated calculations such as the Progress completion percentage.
- Keep all layout, copy, navigation, local-only storage behaviour, and locked/unlocked rules unchanged.

## Verification
- Seed decimal `Trouble sleeping` values in `vf.checkIns`, including `3.8` and `2.6`, and confirm unlocked `/insights` displays `3.8 → 2.6` visually and accessibly.
- Confirm the same values remain decimals through parsing and trend calculation, with no console errors, external requests, or build errors.

## Current-state note
- The current Insights trend already uses `.toFixed(1)`, and the inspected symptom/sleep/trend code contains no `.toFixed(0)` or rating-related `Math.round()` calls. The remaining `Math.round()` calculates the unrelated Progress completion percentage and will remain unchanged.
