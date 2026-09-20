import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Vitality Flow" },
      { name: "description", content: "Your private Vitality Flow progress overview." },
      { property: "og:title", content: "Progress — Vitality Flow" },
      { property: "og:description", content: "Your private Vitality Flow progress overview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Progress,
});

function Progress() {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col rounded-none border-vf-soft-border bg-cream px-6 text-[#2A292F] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        <Button asChild variant="ghost" size="icon" className="absolute left-3 top-11 size-11 rounded-full text-[#2A292F] focus-visible:ring-[3px] focus-visible:ring-plum">
          <Link to="/check-in" aria-label="Back to check-in"><ChevronLeft aria-hidden="true" className="size-5" /></Link>
        </Button>
        <section className="mt-32">
          <p className="text-[14px] text-[#5E5B66]">Your journey</p>
          <h1 className="mt-3 text-[28px] font-semibold">Progress</h1>
          <p className="mt-4 max-w-[330px] text-[15px] leading-6 text-[#5E5B66]">Your progress will appear here.</p>
        </section>
        <div className="mt-auto pb-8">
          <Button asChild className="h-[52px] w-full rounded-[16px] bg-plum text-[16px] font-semibold text-vf-on-plum shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
            <Link to="/check-in">Open today's check-in</Link>
          </Button>
          <p className="mt-3 text-center text-[11px] text-[#5E5B66]">Your data stays on this device.</p>
        </div>
      </main>
    </div>
  );
}
