import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vitality Flow" },
      {
        name: "description",
        content:
          "Vitality Flow — your private peri & menopause self-tracking companion.",
      },
      { property: "og:title", content: "Vitality Flow" },
      {
        property: "og:description",
        content:
          "Vitality Flow — your private peri & menopause self-tracking companion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate({ from: "/" });
  const navigated = useRef(false);
  const [leaving, setLeaving] = useState(false);

  const go = () => {
    if (navigated.current) return;
    navigated.current = true;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      navigate({ to: "/welcome" });
      return;
    }
    setLeaving(true);
    window.setTimeout(() => navigate({ to: "/welcome" }), 450);
  };

  useEffect(() => {
    const timer = window.setTimeout(go, 1200);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") go();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <div
        role="button"
        tabIndex={0}
        aria-label="Vitality Flow — continue to Welcome"
        onPointerDown={go}
        className={`${leaving ? "vf-fade-out" : "vf-fade-in"} relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col items-center justify-center overflow-hidden rounded-none bg-plum outline-none focus-visible:ring-[3px] focus-visible:ring-cream/90 focus-visible:ring-offset-0 sm:h-[932px] sm:rounded-[32px]`}
      >
        {/* Logo mark — exact artwork paths from the supplied source */}
        <svg
          viewBox="700 300 610 500"
          className="w-[52%]"
          style={{ aspectRatio: "610 / 500" }}
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M1206.78 580.812C1185.16 656.442 1092.94 561.6 1034.16 687.241C1019.77 713.102 1001.45 758.975 979.191 778.824C876.55 861.134 852.859 583.485 750.414 547.667C703.603 528.714 727.505 463.987 773.241 463.645C880.425 457.29 894.671 707.48 945.748 726.726C996.58 724.053 993.095 562.936 1123.43 543.87C1154.87 538.899 1213.11 532.642 1206.8 580.812H1206.78Z"
            fill="var(--cream)"
          />
          <path
            d="M1168.78 463.987C1052.43 475.411 1000.39 553.843 961.59 653.948C958.317 659.815 950.616 659.587 950.681 651.243C965.009 520.827 1054.4 382.622 1198.08 382.133C1226.56 383.909 1269.29 371.736 1286.69 399.896C1304.91 431.086 1272.97 464.851 1240.47 462.423C1216.16 462.211 1192.84 461.641 1168.78 464.004V463.987Z"
            fill="var(--cream)"
          />
        </svg>

        {/* Wordmark */}
        <h1 className="mt-[6.5rem] text-[30px] font-semibold tracking-[0.02em] text-cream">
          Vitality Flow
        </h1>
      </div>
    </div>
  );
}
