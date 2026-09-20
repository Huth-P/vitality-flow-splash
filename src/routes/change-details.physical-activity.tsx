import { createFileRoute } from "@tanstack/react-router";
import { CategoryOptionScreen } from "@/components/change-details/CategoryOptionScreen";

export const Route = createFileRoute("/change-details/physical-activity")({
  head: () => ({ meta: [
    { title: "Choose an activity — Vitality Flow" },
    { name: "description", content: "Step 4 of 4 — choose the physical activity you want to track." },
    { property: "og:title", content: "Choose an activity — Vitality Flow" },
    { property: "og:description", content: "Step 4 of 4 — choose the physical activity you want to track." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <CategoryOptionScreen category="Physical activity" from="/change-details/physical-activity" />,
});
