import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/change-details")({
  component: ChangeDetailsLayout,
});

function ChangeDetailsLayout() {
  return <Outlet />;
}
