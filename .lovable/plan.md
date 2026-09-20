# Quick test: seed the 12-day mockup into /progress

A temporary, browser-only test: write the mockup dataset into localStorage and reload /progress. **No source files change, so there is nothing to commit or revert** — clearing the test browser's storage removes the data.

## Why the data needs translating first

The Progress screen reads `vf.checkIns` — `{ "YYYY-MM-DD": { date, ratings, notes } }` with ratings keyed by the full symptom names ("Trouble sleeping") and **whole numbers 0–5 only**. The mockup uses `vf.entries` with camelCase keys and decimals (3.8 → 2.6), which the screen never reads. Seeded verbatim it would just show the empty state.

Per your choice, each mockup rating is **rounded to the nearest whole number** (3.8 → 4, 2.6 → 3) and mapped to the app's names:

- `troubleSleeping` → "Trouble sleeping": 4,4,4,4,3,3,3,3,3,3,3,3 (stepped downward trend)
- `brainFogOrMemoryLapses` → "Brain fog": 3,3,3,3,3,3,3,3,3,3,3,3
- `lowEnergyOrFatigue` → "Low energy": 4,4,4,4,4,4,4,4,3,3,3,3

The mockup's `vf.chosenChange` (Magnesium) is also seeded for realism; /progress doesn't display it.

## How the test runs

Playwright script (following the proven seeding pattern: open the page, wait ~800ms, write localStorage with a single `JSON.stringify`, reload, wait ~1400ms for hydration):

1. Convert the mockup JSON to `vf.checkIns` as above and write it to localStorage on localhost.
2. Reload `/progress` and verify:
   - Header reads **"Day 12 of 30"**
   - Chart renders — plum line over **10 points** (the built chart intentionally shows the most recent 10 of the 12 entries), trending downward
   - X-axis shows short en-GB end dates **"11 Sep"** and **"20 Sep"** (first/last of the charted window)
   - Insight sentence reads "gradually improved" (rounded values still slope down)
   - No console errors, no external requests
3. Also seed `vf.chosenChange` so the dataset matches the mockup wholesale.
4. Screenshots at 430×932 for confirmation.

## Revert

Nothing was ever written to the codebase — the mockup lives only in the test browser's localStorage, discarded when the test closes. If you'd like, a final step can also seed it into **your preview browser** via the same mechanism, but that data stays on your device only.
