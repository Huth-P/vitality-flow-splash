import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/journey-stage")({
  head: () => ({
    meta: [
      { title: "Your journey — Vitality Flow" },
      {
        name: "description",
        content:
          "Step 1 of 4 — tell Vitality Flow where you are in your journey.",
      },
      { property: "og:title", content: "Your journey — Vitality Flow" },
      {
        property: "og:description",
        content:
          "Step 1 of 4 — tell Vitality Flow where you are in your journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JourneyStage,
});

function JourneyStage() {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="vf-fade-in flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col items-center justify-center overflow-hidden rounded-none bg-plum px-8 text-center sm:h-[932px] sm:rounded-[32px]">
        <h1 className="text-[28px] font-semibold tracking-[0.02em] text-cream">
          Your journey — Step 1 of 4
        </h1>
        <p className="mt-4 max-w-[30ch] text-base leading-relaxed text-cream/80">
          Nothing here yet — start your first check-in.
        </p>
      </main>
    </div>
  );
}
