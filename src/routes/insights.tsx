import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Vitality Flow" },
      {
        name: "description",
        content: "Possible connections in your own Vitality Flow records, kept on your device.",
      },
      { property: "og:title", content: "Insights — Vitality Flow" },
      {
        property: "og:description",
        content: "Possible connections in your own Vitality Flow records, kept on your device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Insights,
});

function Insights() {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col rounded-none border-[#D5D0D5] bg-white px-6 text-[#2A292F] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">
          9:41
        </span>
        <section className="mt-28">
          <h1 className="text-[28px] font-semibold">Insights</h1>
          <p className="mt-4 max-w-[330px] text-[15px] leading-6 text-[#737080]">
            Your insights will appear here as your record grows.
          </p>
          <p className="mt-3 text-[13px] text-[#737080]">Educational only · not a diagnosis</p>
        </section>
        <div className="mt-auto pb-8">
          <Button
            asChild
            className="h-[52px] w-full rounded-[8px] bg-plum text-[16px] font-semibold text-white shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2"
          >
            <Link to="/progress">Back to progress</Link>
          </Button>
          <p className="mt-3 text-center text-[12px] text-[#989694]">
            Your selections stay on this device. Nothing is sent to a server.
          </p>
        </div>
      </main>
    </div>
  );
}
