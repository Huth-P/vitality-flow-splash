# Decimal ratings on Progress

## Update the existing chart
- Keep `/progress` layout, styling, navigation, empty state, privacy copy, and local-only behaviour unchanged.
- Update the defensive `vf.checkIns` reader to accept any finite rating from 0–5, including decimals, instead of accepting whole numbers only.
- Preserve each accepted rating exactly through point selection, SVG coordinate calculation, trend calculation, and the accessible chart description. Do not round or truncate chart values.
- Keep the existing visible axes: en-GB short date labels on the X-axis and the 0–5 endpoints on the Y-axis. Per the selected option, individual decimals remain in the accessible chart description rather than adding visual labels beside every point.
- Continue charting the most recent 10 entries, as the current screen does.

## Trend result
- Base the trend classification on the exact decimal series without rounding.
- Adjust the comparison so the mockup’s exact “Trouble sleeping” decline is described as “gradually improved,” while retaining the current steady and more-difficult wording for other trends.

## Temporary verification data
- Translate the attached mockup into the app’s existing `vf.checkIns` shape and seed it only in the isolated test browser’s localStorage.
- Use all 12 dated check-ins from 9–20 September 2026, including the exact sleep series from 3.8 to 2.6 and the attached brain-fog and low-energy decimal values; also seed the attached chosen change.
- Reload `/progress` and verify “Day 12 of 30,” a smooth downward sleep line using the most recent 10 points, short date labels, exact decimals in the chart’s accessible description, and the “gradually improved” sentence.
- Check the 430×932 and narrow layouts, malformed storage, reduced motion, offline behaviour, external requests, console output, and the current build status.
- Keep mockup data out of source code; closing the isolated browser discards it, so there is no test-data change to revert or commit.

## Technical detail
- Change only `src/routes/progress.tsx` for product behaviour. The temporary seed runs through browser automation and never becomes application code.
