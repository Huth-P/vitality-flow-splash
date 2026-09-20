import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

type Entry = { date: string; ratings: Record<string, number> };

type ChosenChange = {
  category?: unknown;
  label?: unknown;
  amount?: unknown;
  value?: unknown;
  unit?: unknown;
  frequency?: unknown;
  details?: unknown;
};

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Your insights — Vitality Flow" },
      { name: "description", content: "Review possible patterns in your private Vitality Flow records." },
      { property: "og:title", content: "Your insights — Vitality Flow" },
      { property: "og:description", content: "Review possible patterns in your private Vitality Flow records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Insights,
});

function parseCheckIns(raw: string | null): Entry[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return [];
    const entries: Entry[] = [];
    for (const [date, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
      const ratings: Record<string, number> = {};
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const candidate = (value as { ratings?: unknown }).ratings;
        if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
          for (const [name, rating] of Object.entries(candidate as Record<string, unknown>)) {
            if (typeof rating === "number" && Number.isFinite(rating) && rating >= 0 && rating <= 5) {
              ratings[name] = rating;
            }
          }
        }
      }
      entries.push({ date, ratings });
    }
    return entries.sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

function parseObject(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

function readChosenChange(): ChosenChange | null {
  const profile = parseObject(window.localStorage.getItem("vf.profile"));
  if (profile) {
    const nested = profile["chosenChange"];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) return nested as ChosenChange;
    if (typeof profile["label"] === "string" || typeof profile["category"] === "string") return profile as ChosenChange;
  }
  return parseObject(window.localStorage.getItem("vf.chosenChange")) as ChosenChange | null;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function formatChange(change: ChosenChange | null): string {
  if (!change) return "Magnesium (200 mg, twice daily)";
  const details = change.details && typeof change.details === "object" && !Array.isArray(change.details)
    ? change.details as Record<string, unknown>
    : null;
  const label = text(change.label) || text(change.category) || "Magnesium";
  const amount = text(change.amount) || text(details?.["amount"]);
  const value = typeof change.value === "number" || typeof change.value === "string" ? String(change.value) : "";
  const unit = text(change.unit);
  const amountText = amount.replace(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/, "$1 $2") || [value, unit].filter(Boolean).join(" ");
  const frequency = text(change.frequency) || text(details?.["frequency"]);
  const extra = [amountText, frequency ? frequency.toLocaleLowerCase("en-GB") : ""].filter(Boolean).join(", ");
  return extra ? `${label} (${extra})` : label;
}

function getSleepTrend(entries: Entry[]): string {
  const values = entries.flatMap((entry) => {
    const rating = entry.ratings["Trouble sleeping"];
    return typeof rating === "number" ? [rating] : [];
  });
  const first = values[0];
  const last = values[values.length - 1];
  if (first === undefined || last === undefined) return "—";
  return `${first.toFixed(1)} → ${last.toFixed(1)}`;
}

function Insights() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [count, setCount] = useState(0);
  const [change, setChange] = useState("Magnesium (200 mg, twice daily)");

  useEffect(() => {
    const storedEntries = parseCheckIns(window.localStorage.getItem("vf.checkIns"));
    setEntries(storedEntries);
    setCount(Math.max(0, Math.min(10, storedEntries.length)));
    setChange(formatChange(readChosenChange()));
  }, []);

  if (entries.length >= 10) return <UnlockedInsights entries={entries} change={change} />;
  return <LockedInsights count={count} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col overflow-hidden rounded-none border-[#D5D0D5] bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        {children}
      </main>
    </div>
  );
}

function BackButton() {
  return (
    <div className="px-6 pt-12">
      <Link to="/progress" aria-label="Go back" className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2A292F] focus-visible:outline-[3px] focus-visible:outline-plum focus-visible:outline-offset-2">
        <ChevronLeft size={24} strokeWidth={2} aria-hidden="true" />
      </Link>
    </div>
  );
}

function LockedInsights({ count }: { count: number }) {
  return (
    <Shell>
      <BackButton />
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <h1 className="mt-4 text-[28px] font-semibold leading-tight">Your insights</h1>
        <p className="mt-2 text-[16px] text-[#737080]">Available after 10 check-ins</p>
        <div className="mt-14 flex justify-center"><Lock size={48} strokeWidth={2} className="text-plum" aria-hidden="true" /></div>
        <h2 className="mt-12 text-[24px] font-medium leading-snug">A little more time helps make patterns clearer.</h2>
        <p className="mt-4 text-[16px] leading-6 text-[#737080]">Keep checking in each day. Insights will appear after your tenth check-in, once there is enough information to compare your recent experience.</p>
        <section className="mt-10 rounded-[16px] border border-[#E8D9F0] bg-[#F3EBF8] p-5">
          <p className="text-[16px] font-medium">{count} of 10 check-ins</p>
          <div className="mt-3 h-[6px] w-full bg-[#D9D3CC]"><div className="h-full bg-plum" style={{ width: `${count * 10}%` }} /></div>
        </section>
      </div>
      <div className="px-6 pb-8">
        <Button asChild className="h-[52px] w-full rounded-[8px] bg-plum text-[16px] font-semibold text-white shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
          <Link to="/check-in">{"Continue checking in >"}</Link>
        </Button>
        <p className="mt-3 text-center text-[12px] text-[#989694]">Your selections stay on this device. Nothing is sent to a server.</p>
      </div>
    </Shell>
  );
}

function UnlockedInsights({ entries, change }: { entries: Entry[]; change: string }) {
  const trend = getSleepTrend(entries);
  return (
    <Shell>
      <BackButton />
      <div className="flex-1 overflow-y-auto px-6 pb-5">
        <h1 className="mt-4 text-[28px] font-semibold leading-tight">Your insights</h1>

        <h2 className="mt-8 text-[14px] font-medium tracking-[0.12em] text-plum">POSSIBLE PATTERN</h2>
        <section className="mt-3 rounded-[16px] border border-[#E8D9F0] bg-[#F3EBF8] p-5">
          <p className="text-[18px] font-medium leading-7">Sleep has felt easier on days after taking magnesium in the evening.</p>
          <p className="mt-5 flex items-center gap-3 text-[16px]" aria-label={`Trouble sleeping changed from ${trend.replace(" → ", " to ")}`}>
            <span className="text-[#737080]" aria-hidden="true">→</span>
            <span className="font-medium text-plum" aria-hidden="true">{trend}</span>
          </p>
        </section>

        <h2 className="mt-7 text-[14px] font-medium tracking-[0.12em] text-plum">WHAT CHANGED</h2>
        <section className="mt-3 rounded-[16px] border border-[#E8C8C8] bg-[#F9E8E8] p-5">
          <p className="text-[16px] leading-6 text-[#737080]">Your chosen change: {change}.</p>
        </section>

        <h2 className="mt-7 text-[14px] font-medium tracking-[0.12em] text-plum">WORTH DISCUSSING</h2>
        <section className="mt-3 rounded-[16px] border border-[#F0E6D2] bg-[#FEF5E7] p-5">
          <p className="text-[16px] leading-6 text-[#737080]">These patterns are Educational only — not a diagnosis. Talk to your doctor before making health changes.</p>
        </section>
      </div>

      <div className="shrink-0 px-6 pb-8 pt-2">
        <Button asChild className="h-[52px] w-full rounded-[8px] bg-plum text-[16px] font-semibold text-white shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
          <Link to="/summary">{"Create summary >"}</Link>
        </Button>
      </div>
    </Shell>
  );
}