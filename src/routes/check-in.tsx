import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/check-in")({
  head: () => ({
    meta: [
      { title: "Today's check-in — Vitality Flow" },
      { name: "description", content: "Your private daily Vitality Flow check-in." },
      { property: "og:title", content: "Today's check-in — Vitality Flow" },
      { property: "og:description", content: "Your private daily Vitality Flow check-in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckInPlaceholder,
});

function CheckInPlaceholder() {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col items-center justify-center rounded-none border-vf-soft-border bg-background px-6 text-center text-[#29252A] sm:h-[932px] sm:rounded-[30px] sm:border">
        <Button asChild variant="ghost" size="icon" className="absolute left-3 top-10 size-11 rounded-full text-[#29252A] focus-visible:ring-[3px] focus-visible:ring-plum">
          <Link to="/transition" aria-label="Back"><ChevronLeft aria-hidden="true" /></Link>
        </Button>
        <h1 className="text-[24px] font-semibold">Today's check-in</h1>
        <p className="mt-3 text-[14px] text-[#737080]">Your check-in will begin here.</p>
        <p className="absolute inset-x-6 bottom-8 text-[11px] text-[#5E5B66]">Data stays on this device.</p>
      </main>
    </div>
  );
}