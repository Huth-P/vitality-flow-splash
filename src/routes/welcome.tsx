import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — Vitality Flow" },
      {
        name: "description",
        content: "Welcome to Vitality Flow — your private peri & menopause self-tracking companion.",
      },
      { property: "og:title", content: "Welcome — Vitality Flow" },
      {
        property: "og:description",
        content: "Welcome to Vitality Flow — your private peri & menopause self-tracking companion.",
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
          <svg viewBox="700 300 610 500" className="h-9 w-auto" aria-hidden="true" focusable="false">
            <path
              d="M1206.78 580.812C1185.16 656.442 1092.94 561.6 1034.16 687.241C1019.77 713.102 1001.45 758.975 979.191 778.824C876.55 861.134 852.859 583.485 750.414 547.667C703.603 528.714 727.505 463.987 773.241 463.645C880.425 457.29 894.671 707.48 945.748 726.726C996.58 724.053 993.095 562.936 1123.43 543.87C1154.87 538.899 1213.11 532.642 1206.8 580.812H1206.78Z"
              fill="var(--plum)"
            />
            <path
              d="M1168.78 463.987C1052.43 475.411 1000.39 553.843 961.59 653.948C958.317 659.815 950.616 659.587 950.681 651.243C965.009 520.827 1054.4 382.622 1198.08 382.133C1226.56 383.909 1269.29 371.736 1286.69 399.896C1304.91 431.086 1272.97 464.851 1240.47 462.423C1216.16 462.211 1192.84 461.641 1168.78 464.004V463.987Z"
              fill="var(--plum)"
            />
          </svg>
          <span className="text-[20px] font-semibold tracking-[0.01em] text-plum">Vitality Flow</span>
        </header>

        {/* Copy */}
        <div className="relative flex flex-1 flex-col px-6">
          <h1 className="mt-16 max-w-[14ch] text-[33px] font-semibold leading-[1.15] text-[#9679AB]">
            Understand what your body has been telling you.
          </h1>
          <p className="mt-6 max-w-[36ch] text-[17px] leading-[1.5] text-[#2A292F]">
            Vitality Flow helps you notice patterns in your own experience. Track symptoms, notice patterns and prepare
            for more informed conversations with healthcare professionals.
          </p>
          <p className="mt-10 max-w-[38ch] text-[13.5px] leading-[1.55] text-[#737080]">
            Your data stays on your device. Looking ahead, we envision giving women the choice to contribute their
            patterns to women&apos;s health research.
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
