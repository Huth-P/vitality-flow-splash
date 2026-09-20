import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/summary")({
  head: () => ({
    meta: [
      { title: "Your summary — Vitality Flow" },
      { name: "description", content: "Prepare a private summary of your Vitality Flow records on this device." },
      { property: "og:title", content: "Your summary — Vitality Flow" },
      { property: "og:description", content: "Prepare a private summary of your Vitality Flow records on this device." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Summary,
});

function Summary() {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col overflow-hidden rounded-none border-[#D5D0D5] bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        <div className="px-6 pt-12">
          <Button asChild variant="ghost" size="icon" className="-ml-2 size-10 rounded-full text-[#2A292F] focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
            <Link to="/insights" aria-label="Go back"><ChevronLeft size={24} strokeWidth={2} aria-hidden="true" /></Link>
          </Button>
          <h1 className="mt-4 text-[28px] font-semibold leading-tight">Your summary</h1>
          <p className="mt-3 text-[16px] leading-6 text-[#737080]">Your private summary will be available here.</p>
        </div>
      </main>
    </div>
  );
}