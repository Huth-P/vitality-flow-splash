import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { readMainFocus } from "@/lib/main-focus";

const TOTAL_DAYS = 30;
const PRIMARY_SYMPTOM = "Trouble sleeping";
const EMPTY_STATE_COPY =
  "A pattern will emerge. Check in for 7 days, and we'll show you possible connections in your records.";

type Entry = { date: string; ratings: Record<string, number> };
type Point = { date: string; value: number };

function parseEntries(raw: string | null): Entry[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return [];
    const entries: Entry[] = [];
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
      const ratings: Record<string, number> = {};
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const maybe = (value as { ratings?: unknown }).ratings;
        if (maybe && typeof maybe === "object" && !Array.isArray(maybe)) {
          for (const [symptom, rating] of Object.entries(maybe as Record<string, unknown>)) {
            if (typeof rating === "number" && Number.isInteger(rating) && rating >= 0 && rating <= 5) {
              ratings[symptom] = rating;
            }
          }
        }
      }
      entries.push({ date: key, ratings });
    }
    return entries.sort((a, b) => (a.date < b.date ? -1 : 1));
  } catch {
    return [];
  }
}

function pickSymptom(entries: Entry[]): string | null {
  const hasData = (name: string) => entries.some((entry) => typeof entry.ratings[name] === "number");
  if (hasData(PRIMARY_SYMPTOM)) return PRIMARY_SYMPTOM;
  for (const name of readMainFocus()) {
    if (hasData(name)) return name;
  }
  return null;
}

function buildPoints(entries: Entry[], symptom: string): Point[] {
  const withData = entries.filter((entry) => typeof entry.ratings[symptom] === "number");
  return withData.slice(-10).map((entry) => ({ date: entry.date, value: entry.ratings[symptom] as number }));
}

function averageOf(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function describeTrend(points: Point[], symptom: string): string {
  const window = Math.min(3, Math.max(2, Math.floor(points.length / 3)));
  const start = averageOf(points.slice(0, window).map((point) => point.value));
  const end = averageOf(points.slice(-window).map((point) => point.value));
  const label = symptom.toLowerCase();
  const days = points.length;
  if (end <= start - 1) {
    return `Your ${label} ratings have gradually improved over the last ${days} days.`;
  }
  if (end >= start + 1) {
    return `Your ${label} ratings have gradually become more difficult over the last ${days} days.`;
  }
  return `Your ${label} ratings have remained steady over the last ${days} days.`;
}

const shortDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(
    new Date(year, month - 1, day),
  );
};

function LineChart({ points, symptom }: { points: Point[]; symptom: string }) {
  const width = 316;
  const height = 96;
  const left = 18;
  const right = width - 4;
  const step = points.length > 1 ? (right - left) / (points.length - 1) : 0;
  const y = (value: number) => height - 12 - (value / 5) * (height - 24);
  const coords = points.map((point, index) => ({
    x: left + step * index,
    y: y(point.value),
    point,
  }));
  const description = points
    .map((point) => `${shortDate(point.date)}: ${point.value} out of 5`)
    .join(", ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height + 18}`}
      width="100%"
      height="114"
      role="img"
      aria-label={`${symptom} daily ratings, 0 to 5. ${description}`}
      className="mt-3 block"
    >
      <text x="0" y={y(5) + 4} fontSize="9" fill="#737080">
        5
      </text>
      <text x="0" y={y(0) + 4} fontSize="9" fill="#737080">
        0
      </text>
      <line x1={left} y1={y(0)} x2={right} y2={y(0)} stroke="#D9D3CC" strokeWidth="1" />
      <line x1={left} y1={y(5)} x2={right} y2={y(5)} stroke="#D9D3CC" strokeWidth="1" />
      <polyline
        points={coords.map((coord) => `${coord.x},${coord.y}`).join(" ")}
        fill="none"
        stroke="#4A2B4E"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {coords.map((coord) => (
        <circle key={coord.point.date} cx={coord.x} cy={coord.y} r="2.5" fill="#4A2B4E" />
      ))}
      {coords.map((coord, index) =>
        index === 0 || index === coords.length - 1 || coords.length <= 7 ? (
          <text
            key={`label-${coord.point.date}`}
            x={coord.x}
            y={height + 10}
            fontSize="9"
            fill="#737080"
            textAnchor="middle"
          >
            {shortDate(coord.point.date)}
          </text>
        ) : null,
      )}
    </svg>
  );
}

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Your progress — Vitality Flow" },
      {
        name: "description",
        content: "See your check-in count and daily rating patterns, stored only on your device.",
      },
      { property: "og:title", content: "Your progress — Vitality Flow" },
      {
        property: "og:description",
        content: "See your check-in count and daily rating patterns, stored only on your device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Progress,
});

function Progress() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    try {
      setEntries(parseEntries(window.localStorage.getItem("vf.checkIns")));
    } catch {
      setEntries([]);
    }
  }, []);

  const count = entries.length;
  const percent = Math.min(100, Math.round((count / TOTAL_DAYS) * 100));
  const symptom = count >= 7 ? pickSymptom(entries) : null;
  const points = symptom ? buildPoints(entries, symptom) : [];
  const showPattern = count >= 7 && symptom !== null && points.length >= 2;

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col overflow-hidden rounded-none border-[#D5D0D5] bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">
          9:41
        </span>

        <div className="flex-1 overflow-y-auto px-6 pb-4 pt-[100px]">
          <h1 className="text-[28px] font-semibold leading-tight text-[#2A292F]">Your progress</h1>
          <p className="mt-2 text-[14px] text-[#737080]">
            Day {count} of {TOTAL_DAYS}
          </p>

          <section className="mt-6 rounded-[16px] bg-plum px-5 py-4 text-white">
            <div className="flex items-start justify-between">
              <span className="text-[56px] font-semibold leading-none">{count}</span>
              <span className="text-[22px] font-semibold leading-none">{percent}%</span>
            </div>
            <p className="mt-3 text-[17px] text-white">check-ins completed</p>
          </section>

          <h2 className="mt-8 text-[12px] font-semibold tracking-[0.12em] text-plum">YOUR PATTERNS</h2>

          {showPattern && symptom ? (
            <>
              <section className="mt-3 rounded-[16px] border border-[#D9D3CC] bg-cream p-5">
                <p className="text-[18px] text-[#2A292F]">{symptom}</p>
                <p className="mt-1 text-[13px] text-[#737080]">Daily rating</p>
                <LineChart points={points} symptom={symptom} />
              </section>
              <p className="mt-6 text-[18px] font-medium text-[#2A292F]">A pattern may be emerging</p>
              <p className="mt-2 text-[15px] leading-6 text-[#737080]">{describeTrend(points, symptom)}</p>
            </>
          ) : (
            <p className="mt-6 text-center text-[16px] leading-6 text-[#737080]">{EMPTY_STATE_COPY}</p>
          )}

          <p className="mt-8 text-center text-[13px] text-[#737080]">Educational only · not a diagnosis</p>
        </div>

        <div className="px-6 pb-8">
          <Button
            asChild
            className="h-[52px] w-full rounded-[8px] bg-plum text-[16px] font-semibold text-white shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2"
          >
            <Link to="/insights">{"View insights >"}</Link>
          </Button>
          <p className="mt-3 text-center text-[12px] text-[#989694]">
            Your selections stay on this device. Nothing is sent to a server.
          </p>
        </div>
      </main>
    </div>
  );
}
