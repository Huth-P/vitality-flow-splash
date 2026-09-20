import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

const SYMPTOM_OPTIONS = [
  "Trouble sleeping",
  "Hot flashes or night sweats",
  "Mood swings or irritability",
  "Brain fog or memory lapses",
  "Joint or muscle aches",
  "Low energy or fatigue",
  "Weight changes",
  "Low interest in sex",
  "Anxiety or feeling on edge",
  "Other",
] as const;

type CheckIn = {
  date: string;
  symptoms: string[];
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

function DailyCheckIn() {
  const navigate = useNavigate({ from: "/check-in" });
  const [dateKey, setDateKey] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fallbackDate = getLocalDateKey();
    try {
      const today = normaliseStoredDate(window.localStorage.getItem("vf.today")) ?? fallbackDate;
      window.localStorage.setItem("vf.today", today);
      const checkIns = parseCheckIns(window.localStorage.getItem("vf.checkIns"));
      const existing = checkIns[today];
      setDateKey(today);
      if (existing) {
        setSymptoms(Array.isArray(existing.symptoms) ? existing.symptoms.slice(0, 3) : []);
        setNotes(typeof existing.notes === "string" ? existing.notes : "");
      }
    } catch {
      setDateKey(fallbackDate);
      setMessage("We couldn't read your saved check-in. You can still try saving again.");
    }
  }, []);

  const toggleSymptom = (symptom: string) => {
    setMessage("");
    setSymptoms((current) => {
      if (current.includes(symptom)) return current.filter((item) => item !== symptom);
      if (current.length === 3) return current;
      return [...current, symptom];
    });
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (symptoms.length === 0) {
      setMessage("Select at least one symptom to save");
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
      checkIns[resolvedDate] = { date: resolvedDate, symptoms, notes };
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

      <form className="absolute inset-x-6 bottom-0 top-[108px]" onSubmit={handleSave}>
        <time dateTime={dateKey} className="block min-h-5 text-[14px] text-[#5E5B66]">{dateKey ? formatDate(dateKey) : "Today"}</time>
        <h1 className="mt-7 text-[28px] font-semibold leading-[1.12]">How are you feeling today?</h1>
        <p className="mt-3 text-[16px] leading-6 text-[#5E5B66]">Track the change you chose during setup.</p>

        <fieldset className="mt-7" aria-describedby="symptom-count check-in-message">
          <legend className="sr-only">Symptoms</legend>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-medium">Symptoms</span>
            <span id="symptom-count" className="rounded-full bg-vf-lavender px-2.5 py-1 text-[12px] font-semibold text-plum" aria-live="polite">{symptoms.length} of 3</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {SYMPTOM_OPTIONS.map((symptom) => {
              const checked = symptoms.includes(symptom);
              return (
                <label key={symptom} className={`flex h-12 cursor-pointer items-center gap-2 rounded-[12px] border px-3 text-[12px] leading-[1.15] outline-none focus-within:outline-[3px] focus-within:outline-solid focus-within:outline-offset-2 focus-within:outline-plum ${checked ? "border-plum bg-plum text-vf-on-plum" : "border-vf-soft-border bg-vf-soft-surface text-[#2A292F]"}`}>
                  <input type="checkbox" name="symptoms" value={symptom} checked={checked} onChange={() => toggleSymptom(symptom)} className="sr-only" />
                  <span className="min-w-0 flex-1">{symptom}</span>
                  <span aria-hidden="true" className={`size-4 shrink-0 rounded-full border ${checked ? "border-vf-on-plum bg-vf-on-plum" : "border-[#737080]"}`} />
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6">
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

        <div className="absolute inset-x-0 bottom-4">
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