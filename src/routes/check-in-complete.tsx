import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/check-in-complete")({
  head: () => ({
    meta: [
      { title: "Check-in complete — Vitality Flow" },
      { name: "description", content: "Your daily Vitality Flow check-in is saved on this device." },
      { property: "og:title", content: "Check-in complete — Vitality Flow" },
      { property: "og:description", content: "Your daily Vitality Flow check-in is saved on this device." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckInComplete,
});

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseCheckInKeys(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return [];
    return Object.keys(parsed as Record<string, unknown>).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key));
  } catch {
    return [];
  }
}

function shiftDateKey(dateKey: string, offsetDays: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day + offsetDays);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function calculateStreak(keys: string[]): number {
  if (keys.length === 0) return 1;
  const keySet = new Set(keys);
  const latest = keys.reduce((a, b) => (a > b ? a : b));
  let streak = 0;
  let cursor = latest;
  while (keySet.has(cursor)) {
    streak += 1;
    cursor = shiftDateKey(cursor, -1);
  }
  return Math.max(streak, 1);
}

type ConfettiPiece = {
  id: number;
  left: number;
  size: number;
  color: string;
  round: boolean;
  delay: number;
};

const CONFETTI_COLORS = ["#4A2B4E", "#A084B4", "#B9B3BD", "#F4EEE7"];

function makeConfetti(): ConfettiPiece[] {
  return Array.from({ length: 24 }, (_, id) => ({
    id,
    left: 4 + Math.random() * 92,
    size: 6 + Math.random() * 6,
    color: CONFETTI_COLORS[id % CONFETTI_COLORS.length] ?? "#4A2B4E",
    round: id % 2 === 0,
    delay: Math.random() * 0.2,
  }));
}

function shouldPlayConfetti(): boolean {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const today = window.localStorage.getItem("vf.today") ?? getLocalDateKey();
    let stored = today;
    try {
      const parsed: unknown = JSON.parse(today);
      if (typeof parsed === "string") stored = parsed;
    } catch {
      // Plain YYYY-MM-DD value is also supported.
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(stored)) stored = getLocalDateKey();
    if (window.localStorage.getItem("vf.checkInCompleteSeen") === stored) return false;
    window.localStorage.setItem("vf.checkInCompleteSeen", stored);
    return true;
  } catch {
    return false;
  }
}

function CheckInComplete() {
  const [streak, setStreak] = useState(1);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    setStreak(calculateStreak(parseCheckInKeys(window.localStorage.getItem("vf.checkIns"))));
    if (shouldPlayConfetti()) {
      setConfetti(makeConfetti());
      const timer = window.setTimeout(() => setConfetti([]), 1600);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative flex h-dvh max-h-[932px] min-h-[640px] w-full max-w-[430px] flex-col overflow-hidden rounded-none border-vf-soft-border bg-white px-6 text-[#2A292F] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>

        {confetti.length > 0 ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {confetti.map((piece) => (
              <span
                key={piece.id}
                className="vf-confetti-piece"
                style={{
                  left: `${piece.left}%`,
                  width: piece.size,
                  height: piece.size,
                  backgroundColor: piece.color,
                  borderRadius: piece.round ? "9999px" : "2px",
                  animationDelay: `${piece.delay}s`,
                }}
              />
            ))}
          </div>
        ) : null}

        <section className="flex flex-1 flex-col items-center px-2 text-center">
          <span className="mt-[168px] flex size-16 items-center justify-center rounded-full bg-plum text-white" aria-hidden="true">
            <Check className="size-8" strokeWidth={2.5} />
          </span>
          <h1 className="mt-10 text-[30px] font-semibold leading-tight text-[#2A292F]">Check-in complete</h1>
          <p className="mt-3 max-w-[320px] text-[17px] leading-6 text-[#737080]">You've added today's experience to your personal pattern.</p>
          <p className="mt-10 rounded-full bg-cream px-6 py-2.5 text-[16px] font-semibold tracking-wide text-plum">DAY {streak}</p>
          <h2 className="mt-10 text-[22px] font-semibold leading-7 text-[#2A292F]">Your month starts here</h2>
          <p className="mt-4 max-w-[330px] text-[16px] leading-6 text-[#737080]">Keep checking in daily. The more consistent the record, the easier it may be to notice patterns.</p>
        </section>

        <div className="pb-8">
          <p className="mb-4 text-center text-[12px] leading-4 text-[#989694]">Your selections stay on this device. Nothing is sent to a server.</p>
          <Button asChild className="h-[52px] w-full rounded-[8px] bg-plum text-[16px] font-semibold text-white shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
            <Link to="/progress">{"See my progress >"}</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
