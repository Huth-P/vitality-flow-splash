import { createFileRoute } from "@tanstack/react-router";
import { CategoryOptionScreen } from "@/components/change-details/CategoryOptionScreen";

export const Route = createFileRoute("/change-details/sleep-routine")({
  head: () => ({ meta: [
    { title: "Choose a sleep routine — Vitality Flow" },
    { name: "description", content: "Step 4 of 4 — choose the sleep routine you want to track." },
    { property: "og:title", content: "Choose a sleep routine — Vitality Flow" },
    { property: "og:description", content: "Step 4 of 4 — choose the sleep routine you want to track." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <CategoryOptionScreen category="Sleep routine" from="/change-details/sleep-routine" />,
});
