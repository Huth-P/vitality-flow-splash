import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/transition")({
  head: () => ({
    meta: [
      { title: "Setup complete — Vitality Flow" },
      { name: "description", content: "Your private Vitality Flow setup is complete." },
      { property: "og:title", content: "Setup complete — Vitality Flow" },
      { property: "og:description", content: "Your private Vitality Flow setup is complete." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Transition,
});

function Transition() {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative h-dvh max-h-[932px] w-full max-w-[430px] overflow-hidden rounded-none border-[#D5D0D5] bg-white px-6 text-center text-[#29252A] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        <Button asChild variant="ghost" size="icon" className="absolute left-3 top-10 size-11 rounded-full text-[#29252A] focus-visible:ring-[3px] focus-visible:ring-plum">
          <Link to="/onboarding-step-4" aria-label="Back to Change Category"><ChevronLeft aria-hidden="true" className="size-[18px]" strokeWidth={1.8} /></Link>
        </Button>

        <div className="absolute left-1/2 top-[190px] h-[180px] w-[180px] -translate-x-1/2" aria-hidden="true">
          <span className="absolute left-1 top-8 h-28 w-32 rounded-[48%_52%_58%_42%] bg-vf-disc-teal opacity-25 blur-2xl" />
          <span className="absolute right-0 top-0 h-28 w-28 rounded-[52%_48%_45%_55%] bg-vf-disc-apricot opacity-35 blur-2xl" />
          <span className="absolute bottom-0 left-10 h-32 w-32 rounded-[45%_55%_50%_50%] bg-vf-lavender opacity-70 blur-2xl" />
        </div>

        <section className="absolute inset-x-6 top-[390px]">
          <h1 className="mx-auto max-w-[350px] text-[24px] font-semibold leading-tight">You're ready. How are you feeling today?</h1>
          <p className="mx-auto mt-4 max-w-[330px] text-[14px] leading-5 text-[#737080]">One change. One month. A clearer view of what may be working for you.</p>
          <p className="mx-auto mt-6 max-w-[340px] text-[13px] leading-5 text-[#737080]">You'll focus on one change at a time in order to collect meaningful patterns. Once the month ends, you'll receive personalised insights and suggested next changes.</p>
        </section>

        <div className="absolute inset-x-6 bottom-8">
          <Button asChild className="h-[52px] w-full rounded-full bg-plum text-[18px] font-semibold text-white shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
            <Link to="/check-in">Start today's check-in →</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}