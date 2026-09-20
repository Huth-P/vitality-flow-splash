# Add Step 4 intermediate selections and correct Change Details

## Scope

- Add four category-specific intermediate routes:
  - `/change-details/supplements`
  - `/change-details/physical-activity`
  - `/change-details/sleep-routine`
  - `/change-details/dietary-changes`
- Update only the Step 4 category handoff, these new screens, Change Details, Transition, and the new check-in placeholder required by Transition.
- Leave Steps 1–3 and the Meditation/Hydration controls and behaviour unchanged.
- Keep the existing brand plum `#4A2B4E` for all Step 4 CTAs rather than adding the near-duplicate `#4A304E`.

## Intermediate selection screens

- Build one shared screen pattern used by all four routes, with route-specific option data and unique page metadata.
- Match the supplied 430×932 geometry: white framed surface, hairline edge, four-pill Step 4 progress indicator, 24px heading, 14px subtitle, 44px radio rows at 53px pitch, and the bottom 52px pill CTA.
- Use the exact option lists supplied for Supplements, Physical activity, Sleep routine, and Dietary changes.
- Keep Continue enabled. With no selection, show `Select an option to continue` inline.
- Give each option a labelled native radio control, visible plum fill/check when selected, 44px target, and the existing high-contrast focus treatment.
- Reuse the proven Step 3 “Other” structure: relative row, `min-w-0 flex-1` left slot, `shrink-0` right slot, same-row underlined input, 60-character limit, and live counter. Selecting, focusing, or filling it must not move the radio or scroll the page.
- Back returns to Change Category. Intermediate choices remain in component state until Continue.

## Routing and local data

- Change Category continues writing `vf.chosenChange`, then branches:
  - Supplements → `/change-details/supplements`
  - Physical activity → `/change-details/physical-activity`
  - Sleep routine → `/change-details/sleep-routine`
  - Dietary changes → `/change-details/dietary-changes`
  - Meditation/Hydration → `/change-details`
- Each intermediate Continue writes the selected label into `vf.chosenChange`.
- Supplements then routes to `/change-details` for the three follow-up rows.
- Physical activity, Sleep routine, and Dietary changes write `{ category, label }` to both `vf.chosenChange` and the completed `vf.profile`, then route directly to `/transition`.
- No draft keys, network requests, cookies, analytics, accounts, or cloud storage.

## Change Details correction

- Preserve the existing missing-data state exactly.
- Preserve Meditation and Hydration steppers and their save behaviour; only restyle their surrounding screen to the approved Step 4 frame where shared presentation requires it.
- For Supplements, read the category and selected supplement from `vf.chosenChange`, then show:
  - Amount: `50mg`, `100mg`, `200mg`, `400mg`, `500mg`, `1000mg`, `Other`
  - Frequency: `Once daily`, `Twice daily`, `As needed`
  - When do you take it?: `Morning`, `Midday`, `Evening`, `Night`, `With food`
- Keep Finish enabled. Missing required values show `Add a value to finish setup` inline; storage failure keeps the existing retry message.
- On Finish, merge category, label, and the three selected supplement details into `vf.profile`, then navigate to `/transition`.
- Match the corrected measurements: heading/subtitle/stepper aligned with the intermediate screens; 356×162 summary card at the specified position; soft flat `#987CAF` blurred accent; exact label/value typography; three 355×49 rows with specified spacing and chevrons; bottom 382×52 pill CTA.
- Use existing colour tokens where values already exist. Add semantic tokens only for genuinely new supplied values such as the soft surface, border, and inactive progress colour.

## Transition and check-in destination

- Replace the current minimal Transition view with the supplied completion design: no stepper, back chevron, centred pastel illustration, exact headline/subtitle/body copy, and bottom `Start today's check-in →` CTA.
- Create a minimal `/check-in` destination so the CTA completes navigation; it will not add tracking behaviour or storage writes.
- Keep Transition read-only: it does not modify local data.

## Technical structure

- Create a shared intermediate-screen component and category configuration so all four routes use identical markup, spacing, validation, accessibility, and storage handling.
- Use TanStack route files whose filenames match each requested URL; allow the generated route tree to update automatically.
- Keep the existing Button component, system font, reduced-motion rules, and privacy-first local-only posture.
- Add unique title, description, Open Graph title/description, `og:type`, and Twitter card metadata to every new content route.

## Verification

- Compare intermediate and corrected Change Details screenshots at 430×932 against the supplied geometry.
- Test all four option lists, empty Continue state, selection, every Other branch, 60-character counter, long text, focus, stable radio alignment, and no focus-induced scroll jump.
- Verify routing branches exactly, including direct completion for Physical activity/Sleep routine/Dietary changes and Supplements’ three-row follow-up.
- Verify exact `vf.chosenChange` and `vf.profile` output for one normal path per category plus an Other path; retest Meditation and Hydration unchanged.
- Verify dropdown validation, storage-failure retry, back navigation, Transition CTA, keyboard order, 44px targets, visible focus, reduced motion, narrow mobile layout, no console errors, and no interaction-time network requests.

## Files affected

- `src/routes/onboarding-step-4.tsx`
- `src/routes/change-details.tsx`
- `src/routes/change-details.supplements.tsx`
- `src/routes/change-details.physical-activity.tsx`
- `src/routes/change-details.sleep-routine.tsx`
- `src/routes/change-details.dietary-changes.tsx`
- `src/routes/transition.tsx`
- `src/routes/check-in.tsx`
- New shared Step 4 selection/configuration files under `src/components/`
- `src/styles.css` only for genuinely new semantic design tokens
- `roadmap.md`
