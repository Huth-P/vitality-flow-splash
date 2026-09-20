import { createFileRoute } from "@tanstack/react-router";
import { CategoryOptionScreen } from "@/components/change-details/CategoryOptionScreen";

export const Route = createFileRoute("/change-details/supplements")({
  head: () => ({ meta: [
    { title: "Choose a supplement — Vitality Flow" },
    { name: "description", content: "Step 4 of 4 — choose the supplement you want to track." },
    { property: "og:title", content: "Choose a supplement — Vitality Flow" },
    { property: "og:description", content: "Step 4 of 4 — choose the supplement you want to track." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <CategoryOptionScreen category="Supplements" from="/change-details/supplements" />,
});
