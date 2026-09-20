import { createFileRoute } from "@tanstack/react-router";
import { CategoryOptionScreen } from "@/components/change-details/CategoryOptionScreen";

export const Route = createFileRoute("/change-details/dietary-changes")({
  head: () => ({ meta: [
    { title: "Choose a dietary change — Vitality Flow" },
    { name: "description", content: "Step 4 of 4 — choose the dietary change you want to track." },
    { property: "og:title", content: "Choose a dietary change — Vitality Flow" },
    { property: "og:description", content: "Step 4 of 4 — choose the dietary change you want to track." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <CategoryOptionScreen category="Dietary changes" from="/change-details/dietary-changes" />,
});
