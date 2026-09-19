import { createFileRoute, Link } from "@tanstack/react-router";

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
      <main className="vf-fade-in relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col overflow-hidden rounded-none bg-white sm:h-[932px] sm:rounded-[32px]">
        {/* Soft gradient hero wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[47%]"
          style={{
            background: [
              "radial-gradient(ellipse 60% 55% at 8% 22%, rgba(190, 228, 212, 0.85), transparent 70%)",
              "radial-gradient(ellipse 55% 50% at 96% 8%, rgba(240, 160, 132, 0.8), transparent 70%)",
              "radial-gradient(ellipse 60% 50% at 92% 55%, rgba(214, 196, 224, 0.55), transparent 70%)",
              "radial-gradient(ellipse 70% 60% at 45% 30%, rgba(255, 255, 255, 0.9), transparent 75%)",
            ].join(", "),
          }}
        />

        {/* Brand header */}
        <header className="relative flex items-center gap-3 px-6 pt-14">
          <svg
            viewBox="0 0 200 160"
            className="h-9 w-auto"
            aria-hidden="true"
            focusable="false"
          >
            <g
              fill="none"
              stroke="var(--plum)"
              strokeWidth="17"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M34 40 C40 66 50 90 62 108" />
              <path d="M62 108 C80 90 96 62 108 36 C113 24 124 17 138 18 C148 19 155 25 156 33" />
              <path d="M80 64 C100 56 124 53 148 56" />
            </g>
          </svg>
          <span className="text-[20px] font-semibold tracking-[0.01em] text-plum">
            Vitality Flow
          </span>
        </header>

        {/* Copy */}
        <div className="relative flex flex-1 flex-col px-6">
          <h1 className="mt-16 max-w-[14ch] text-[33px] font-semibold leading-[1.15] text-[#9679AB]">
            Understand what your body has been telling you.
          </h1>
          <p className="mt-6 max-w-[36ch] text-[17px] leading-[1.5] text-[#2A292F]">
            Vitality Flow helps you notice patterns in your own experience.
            Track symptoms, notice patterns and prepare for more informed
            conversations with healthcare professionals.
          </p>
          <p className="mt-10 max-w-[38ch] text-[13.5px] leading-[1.55] text-[#737080]">
            Your data is yours. It stays private unless you choose to share it
            — with your doctor, or, in the future, anonymously to help other
            women see patterns like yours.
          </p>
        </div>

        {/* CTA + disclaimer */}
        <div className="relative px-6 pb-7">
          <Link
            to="/journey-stage"
            className="flex h-[52px] w-full items-center justify-center rounded-[26px] bg-plum text-[17px] font-medium text-cream outline-none transition-none focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Get started →
          </Link>
          <p className="mt-3 text-center text-[12.5px] text-[#737080]">
            Educational only. Your information stays on this device.
          </p>
        </div>
      </main>
    </div>
  );
}
