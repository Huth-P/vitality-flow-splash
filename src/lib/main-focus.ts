// Reads the symptoms chosen in onboarding Step 3 so completed profiles keep them.
// Local storage only — nothing here leaves the device.

export function readMainFocus(): string[] {
  try {
    const raw = window.localStorage.getItem("vf.onboarding.step3");
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return [];
    const { main_focus: mainFocus, tracked_alongside: trackedAlongside } = parsed as {
      main_focus?: unknown;
      tracked_alongside?: unknown;
    };
    const ordered: string[] = [];
    if (typeof mainFocus === "string" && mainFocus.trim()) ordered.push(mainFocus.trim());
    if (Array.isArray(trackedAlongside)) {
      for (const entry of trackedAlongside) {
        if (typeof entry === "string" && entry.trim() && !ordered.includes(entry.trim())) {
          ordered.push(entry.trim());
        }
      }
    }
    return ordered.slice(0, 3);
  } catch {
    return [];
  }
}
