import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock } from "lucide-react";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Your insights — Vitality Flow" },
      {
        name: "description",
        content: "Insights unlock after 10 check-ins. Your records stay on this device.",
      },
      { property: "og:title", content: "Your insights — Vitality Flow" },
      {
        property: "og:description",
        content: "Insights unlock after 10 check-ins. Your records stay on this device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Insights,
});

function countCheckIns(): number {
  try {
    const raw = window.localStorage.getItem("vf.checkIns");
    if (!raw) return 0;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return 0;
    const keys = Object.keys(parsed as Record<string, unknown>).filter((key) =>
      /^\d{4}-\d{2}-\d{2}$/.test(key),
    );
    return Math.max(0, Math.min(10, keys.length));
  } catch {
    return 0;
  }
}

function Insights() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const n = countCheckIns();
    setCount(n);
    if (n >= 10) void navigate({ to: "/progress", replace: true });
  }, [navigate]);

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col overflow-hidden rounded-none border-[#D5D0D5] bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">
          9:41
        </span>

        <div className="px-6 pt-12">
          <Link
            to="/progress"
            aria-label="Go back"
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2A292F] focus-visible:outline-[3px] focus-visible:outline-plum focus-visible:outline-offset-2"
          >
            <ChevronLeft size={24} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <h1 className="mt-4 text-[28px] font-semibold leading-tight text-[#2A292F]">
            Your insights
          </h1>
          <p className="mt-2 text-[16px] text-[#737080]">Available after 10 check-ins</p>

          <div className="mt-14 flex justify-center">
            <Lock size={48} strokeWidth={2} className="text-[#4A2B4E]" aria-hidden="true" />
          </div>

          <h2 className="mt-12 text-[24px] font-medium leading-snug text-[#2A292F]">
            A little more time helps make patterns clearer.
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-[#737080]">
            Keep checking in each day. Insights will appear after your tenth check-in, once there
            is enough information to compare your recent experience.
          </p>

          <section className="mt-10 rounded-[16px] border border-[#E8D9F0] bg-[#F3EBF8] p-5">
            <p className="text-[16px] font-medium text-[#2A292F]">{count} of 10 check-ins</p>
            <div className="mt-3 h-[6px] w-full bg-[#D9D3CC]">
              <div className="h-full bg-[#4A2B4E]" style={{ width: `${count * 10}%` }} />
            </div>
          </section>
        </div>

        <div className="px-6 pb-8">
          <Button
            asChild
            className="h-[52px] w-full rounded-[8px] bg-plum text-[16px] font-semibold text-white shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2"
          >
            <Link to="/check-in">{"Continue checking in >"}</Link>
          </Button>
          <p className="mt-3 text-center text-[12px] text-[#989694]">
            Your selections stay on this device. Nothing is sent to a server.
          </p>
        </div>
      </main>
    </div>
  );
}
