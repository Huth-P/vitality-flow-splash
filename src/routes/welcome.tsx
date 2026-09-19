import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — Vitality Flow" },
      {
        name: "description",
        content:
          "Welcome to Vitality Flow — your private peri & menopause self-tracking companion.",
      },
      { property: "og:title", content: "Welcome — Vitality Flow" },
      {
        property: "og:description",
        content:
          "Welcome to Vitality Flow — your private peri & menopause self-tracking companion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col items-center justify-center overflow-hidden rounded-none bg-plum px-8 text-center sm:h-[932px] sm:rounded-[32px]">
        <h1 className="text-[30px] font-semibold tracking-[0.02em] text-cream">
          Welcome
        </h1>
        <p className="mt-4 max-w-[30ch] text-base leading-relaxed text-cream/80">
          Nothing here yet — start your first check-in.
        </p>
      </main>
    </div>
  );
}
