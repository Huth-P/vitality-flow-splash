import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding-step-4")({
  head: () => ({
    meta: [
      { title: "Step 4 — Vitality Flow" },
      { name: "description", content: "Step 4 of the private Vitality Flow setup." },
      { property: "og:title", content: "Step 4 — Vitality Flow" },
      { property: "og:description", content: "Step 4 of the private Vitality Flow setup." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StepFourPlaceholder,
});

function StepFourPlaceholder() {
  return (
    <main className="vf-system-font flex min-h-dvh items-center justify-center bg-white px-6 text-[#2A292F]">
      <div className="text-center">
        <p className="text-sm text-[#737080]">Step 4 of 4</p>
        <h1 className="mt-2 text-2xl font-semibold">Your check-in setup</h1>
        <Link
          to="/onboarding-step-3"
          className="mt-6 inline-flex min-h-11 items-center text-plum underline decoration-2 underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-plum"
        >
          Back to main focus
        </Link>
      </div>
    </main>
  );
}