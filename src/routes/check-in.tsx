import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

const SYMPTOM_SCALES = [
  { name: "Trouble sleeping", low: "Sleeping well", high: "Can't sleep" },
  { name: "Hot flashes", low: "None", high: "Very frequent" },
  { name: "Mood swings", low: "Very stable", high: "Very unstable" },
  { name: "Brain fog", low: "Crystal clear", high: "Very foggy" },
  { name: "Joint aches", low: "No pain", high: "Severe pain" },
  { name: "Low energy", low: "Full energy", high: "Completely exhausted" },
  { name: "Weight changes", low: "No change", high: "Significant change" },
  { name: "Low interest in sex", low: "Very interested", high: "No interest" },
  { name: "Anxiety", low: "Very calm", high: "Very anxious" },
  { name: "Other", low: "Not present", high: "Very present" },
] as const;

type SymptomName = (typeof SYMPTOM_SCALES)[number]["name"];
type Ratings = Partial<Record<SymptomName, number>>;

type ChosenChange = {
  category?: unknown;
  label?: unknown;
  amount?: unknown;
  value?: unknown;
  unit?: unknown;
  frequency?: unknown;
  when?: unknown;
};

type CheckIn = {
  date: string;
  ratings?: Ratings;
  symptoms?: string[];
  notes: string;
};

type CheckIns = Record<string, CheckIn>;

export const Route = createFileRoute("/check-in")({
  head: () => ({
    meta: [
      { title: "Daily check-in — Vitality Flow" },
      { name: "description", content: "Record how you feel today in your private Vitality Flow check-in." },
      { property: "og:title", content: "Daily check-in — Vitality Flow" },
      { property: "og:description", content: "Record how you feel today in your private Vitality Flow check-in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DailyCheckIn,
});

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normaliseStoredDate(value: string | null) {
  if (!value) return null;
  let candidate = value;
  try {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed === "string") candidate = parsed;
  } catch {
    // A plain YYYY-MM-DD value is also supported.
  }
  return /^\d{4}-\d{2}-\d{2}$/.test(candidate) ? candidate : null;
}

function formatDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  if (!year || !month || !day) return "";
  const date = new Date(year, month - 1, day);
  const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
  const calendarDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return `${weekday}, ${calendarDate}`;
}

function parseCheckIns(value: string | null): CheckIns {
  if (!value) return {};
  const parsed: unknown = JSON.parse(value);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid check-ins");
  return parsed as CheckIns;
}

function parseChosenChange(value: string | null): ChosenChange | null {
  if (!value) return null;
  const parsed: unknown = JSON.parse(value);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const profile = parsed as ChosenChange & { chosenChange?: unknown };
  if (profile.chosenChange && typeof profile.chosenChange === "object" && !Array.isArray(profile.chosenChange)) {
    return profile.chosenChange as ChosenChange;
  }
  return profile;
}

function formatAmount(value: string) {
  return value.replace(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/, "$1 $2");
}

function formatChosenChange(change: ChosenChange | null) {
  if (!change) return "";
  const details: string[] = [];
  const label = typeof change.label === "string" && change.label.trim()
    ? change.label.trim()
    : typeof change.category === "string"
      ? change.category.trim()
      : "";
  if (label) details.push(label);

  if (typeof change.amount === "string" && change.amount.trim()) {
    details.push(formatAmount(change.amount.trim()));
  } else if ((typeof change.value === "number" || typeof change.value === "string") && String(change.value).trim()) {
    const unit = typeof change.unit === "string" ? change.unit.trim() : "";
    details.push([String(change.value), unit].filter(Boolean).join(" "));
  }

  if (typeof change.frequency === "string" && change.frequency.trim()) details.push(change.frequency.trim().toLocaleLowerCase("en-GB"));
  if (typeof change.when === "string" && change.when.trim()) details.push(change.when.trim().toLocaleLowerCase("en-GB"));
  return details.join(" · ");
}

type SymptomScale = (typeof SYMPTOM_SCALES)[number];

function parseProfile(value: string | null): Record<string, unknown> | null {
  if (!value) return null;
  const parsed: unknown = JSON.parse(value);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  return parsed as Record<string, unknown>;
}

function getFocusScales(profile: Record<string, unknown> | null): SymptomScale[] {
  const raw = profile?.["mainFocus"];
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const scales: SymptomScale[] = [];
  for (const entry of raw) {
    if (typeof entry !== "string") continue;
    const match = SYMPTOM_SCALES.find((scale) => scale.name === entry);
    if (!match || seen.has(match.name)) continue;
    seen.add(match.name);
    scales.push(match);
    if (scales.length === 3) break;
  }
  return scales;
}

function getStoredRatings(checkIn: CheckIn | undefined, scales: readonly SymptomScale[]): Ratings {
  if (!checkIn?.ratings || typeof checkIn.ratings !== "object" || Array.isArray(checkIn.ratings)) return {};
  return Object.fromEntries(
    scales.flatMap(({ name }) => {
      const value = checkIn.ratings?.[name];
      return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 5 ? [[name, value]] : [];
    }),
  ) as Ratings;
}

function DailyCheckIn() {
  const navigate = useNavigate({ from: "/check-in" });
  const [dateKey, setDateKey] = useState("");
  const [ratings, setRatings] = useState<Ratings>({});
  const [focusScales, setFocusScales] = useState<SymptomScale[]>([]);
  const [chosenChange, setChosenChange] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [focusedRating, setFocusedRating] = useState("");

  useEffect(() => {
    const fallbackDate = getLocalDateKey();
    try {
      const today = normaliseStoredDate(window.localStorage.getItem("vf.today")) ?? fallbackDate;
      window.localStorage.setItem("vf.today", today);
      const checkIns = parseCheckIns(window.localStorage.getItem("vf.checkIns"));
      const existing = checkIns[today];
      const storedProfile = window.localStorage.getItem("vf.profile");
      const profile = parseProfile(storedProfile);
      const scales = getFocusScales(profile);
      setDateKey(today);
      setFocusScales(scales);
      setChosenChange(formatChosenChange(parseChosenChange(storedProfile)));
      if (existing) {
        setRatings(getStoredRatings(existing, scales));
        setNotes(typeof existing.notes === "string" ? existing.notes : "");
      }
    } catch {
      setDateKey(fallbackDate);
      setMessage("We couldn't read your saved check-in. You can still try saving again.");
    }
  }, []);

  const setRating = (symptom: SymptomName, rating: number) => {
    setMessage("");
    setRatings((current) => ({ ...current, [symptom]: rating }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(ratings).length === 0) {
      setMessage("Select at least one rating to save");
      return;
    }

    const resolvedDate = dateKey || getLocalDateKey();
    try {
      let checkIns: CheckIns = {};
      try {
        checkIns = parseCheckIns(window.localStorage.getItem("vf.checkIns"));
      } catch {
        checkIns = {};
      }
      const focusedRatings = Object.fromEntries(
        focusScales.flatMap(({ name }) => (typeof ratings[name] === "number" ? [[name, ratings[name]]] : [])),
      ) as Ratings;
      checkIns[resolvedDate] = { date: resolvedDate, ratings: focusedRatings, notes };
      window.localStorage.setItem("vf.today", resolvedDate);
      window.localStorage.setItem("vf.checkIns", JSON.stringify(checkIns));
      setDateKey(resolvedDate);
      setMessage("");
      setSaved(true);
    } catch {
      setMessage("We couldn't save your check-in just now. Please try again.");
    }
  };

  if (saved) {
    return (
      <Frame>
        <section className="flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-plum text-vf-on-plum" aria-hidden="true">
            <Check className="size-8" strokeWidth={2} />
          </span>
          <h1 className="mt-7 text-[28px] font-semibold leading-tight">Check-in saved.</h1>
          <p className="mt-3 max-w-[310px] text-[15px] leading-6 text-[#5E5B66]">Your notes and selections are safely stored on this device.</p>
          <Button type="button" onClick={() => navigate({ to: "/daily-dashboard" })} className="mt-10 h-[52px] w-full rounded-[16px] bg-plum text-[16px] font-semibold text-vf-on-plum shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
            Go to Daily Dashboard
          </Button>
        </section>
      </Frame>
    );
  }

  return (
    <Frame>
      <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
      <header className="absolute inset-x-3 top-11 flex h-12 items-center justify-between">
        <Button asChild variant="ghost" size="icon" className="size-11 rounded-full text-[#2A292F] focus-visible:ring-[3px] focus-visible:ring-plum">
          <Link to="/transition" aria-label="Back to Transition"><ChevronLeft aria-hidden="true" className="size-5" /></Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className="size-11 rounded-full text-[#2A292F] focus-visible:ring-[3px] focus-visible:ring-plum">
          <Link to="/daily-dashboard" aria-label="Open Daily Dashboard"><MoreHorizontal aria-hidden="true" className="size-5" /></Link>
        </Button>
      </header>

      <form className="absolute inset-x-0 bottom-0 top-[108px] overflow-y-auto px-6" onSubmit={handleSave}>
        <time dateTime={dateKey} className="block min-h-5 text-[14px] text-[#5E5B66]">{dateKey ? formatDate(dateKey) : "Today"}</time>
        <h1 className="mt-5 text-[28px] font-semibold leading-[1.12]">How are you feeling today?</h1>
        <p className="mt-3 text-[16px] leading-6 text-[#5E5B66]">Track the change you chose during setup.</p>

        {chosenChange ? <p className="mt-4 w-fit max-w-full rounded-full bg-vf-lavender px-4 py-2 text-[13px] font-semibold leading-5 text-plum">{chosenChange}</p> : null}

        {focusScales.length === 0 ? (
          <section className="mt-7 rounded-[12px] border border-vf-soft-border bg-vf-soft-surface p-4">
            <h2 className="text-[16px] font-semibold">We couldn't find your chosen symptoms.</h2>
            <p className="mt-2 text-[14px] leading-5 text-[#5E5B66]">
              Your main focus choices aren't saved on this device yet, so there's nothing to rate today. Pick them again and come straight back.
            </p>
            <Button asChild className="mt-4 min-h-11 rounded-[12px] bg-plum px-5 text-[14px] font-semibold text-vf-on-plum shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
              <Link to="/onboarding-step-3">Choose your symptoms</Link>
            </Button>
          </section>
        ) : (
        <section className="mt-7" aria-labelledby="ratings-heading">
          <h2 id="ratings-heading" className="text-[16px] font-semibold">Symptoms</h2>
          <div className="mt-3 space-y-5">
            {focusScales.map((symptom) => (
              <fieldset key={symptom.name} className="rounded-[8px] border border-vf-soft-border bg-vf-soft-surface px-3 pb-3 pt-2">
                <legend className="px-1 text-[14px] font-semibold leading-5">{symptom.name}</legend>
                <div className="mt-1 grid grid-cols-6 gap-1" aria-label={`${symptom.name} rating from 0 to 5`}>
                  {[0, 1, 2, 3, 4, 5].map((rating) => {
                    const checked = ratings[symptom.name] === rating;
                    const ratingId = `${symptom.name}-${rating}`;
                    return (
                      <label key={rating} className={`relative flex min-h-11 min-w-0 cursor-pointer items-center justify-center rounded-[8px] outline-none ${focusedRating === ratingId ? "vf-focus-ring" : ""}`}>
                        <input type="radio" name={`rating-${symptom.name}`} value={rating} checked={checked} onChange={() => setRating(symptom.name, rating)} onFocus={() => setFocusedRating(ratingId)} onBlur={() => setFocusedRating("")} className="absolute inset-0 cursor-pointer opacity-0" />
                        <span className={`pointer-events-none flex size-8 items-center justify-center rounded-full border text-[13px] font-semibold ${checked ? "border-plum bg-plum text-vf-on-plum" : "border-[#737080] bg-cream text-[#2A292F]"}`}>{rating}</span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-1 flex items-start justify-between gap-4 text-[11px] leading-4 text-[#5E5B66]">
                  <span className="max-w-[44%]">{symptom.low}</span>
                  <span className="max-w-[44%] text-right">{symptom.high}</span>
                </div>
              </fieldset>
            ))}
          </div>
        </section>
        )}

        <div className="mt-7">
          <label htmlFor="check-in-notes" className="block text-[16px] font-semibold">Anything else to note?</label>
          <textarea
            id="check-in-notes"
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value);
              setMessage("");
            }}
            rows={4}
            placeholder="Optional — your notes stay on this device."
            className="mt-2 h-[92px] w-full resize-none rounded-[12px] border border-vf-soft-border bg-vf-soft-surface px-3 py-2.5 text-[14px] leading-5 text-[#2A292F] outline-none placeholder:text-[#737080] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-plum"
          />
        </div>

        <div className="pb-4 pt-4">
          <p id="check-in-message" role="alert" className="mb-1 min-h-5 text-[12px] leading-5 text-plum">{message}</p>
          <Button type="submit" className="h-[52px] w-full rounded-[16px] bg-plum text-[16px] font-semibold text-vf-on-plum shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">Save check-in &gt;</Button>
          <p className="mt-2 text-center text-[11px] leading-4 text-[#5E5B66]">Your selections stay on this device. Nothing is sent to a server.</p>
        </div>
      </form>
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative h-dvh max-h-[932px] min-h-[760px] w-full max-w-[430px] overflow-y-auto rounded-none border-vf-soft-border bg-cream text-[#2A292F] sm:h-[932px] sm:rounded-[30px] sm:border">
        {children}
      </main>
    </div>
  );
}