import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding-step-3")({
  head: () => ({
    meta: [
      { title: "Step 3 — Vitality Flow" },
      { name: "description", content: "Step 3 of the Vitality Flow setup." },
      { property: "og:title", content: "Step 3 — Vitality Flow" },
      { property: "og:description", content: "Step 3 of the Vitality Flow setup." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StepThreePlaceholder,
});

function StepThreePlaceholder() {
  return (
    <main className="vf-system-font flex min-h-dvh items-center justify-center bg-white px-6 text-[#2A292F]">
      <h1 className="text-2xl font-semibold">Step 3 of 4</h1>
    </main>
  );
}