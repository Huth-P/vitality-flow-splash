import { createFileRoute, Link } from "@tanstack/react-router";

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
      <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col items-center justify-center rounded-none bg-white px-6 text-center text-[#2A292F] sm:h-[932px] sm:rounded-[32px]">
        <p className="text-[12px] text-[#737080]">Step 4 of 4 — complete</p>
        <h1 className="mt-3 text-[28px] font-semibold">Setup complete.</h1>
        <p className="mt-3 text-[15px] leading-6 text-[#737080]">Your selections are saved on this device.</p>
        <Button asChild variant="outline" className="mt-8 min-h-11 border-plum text-plum focus-visible:ring-[3px] focus-visible:ring-plum">
          <Link to="/welcome">Return to welcome</Link>
        </Button>
        <p className="absolute inset-x-6 bottom-6 text-[11px] text-[#5E5B66]">Data stays on this device.</p>
      </main>
    </div>
  );
}