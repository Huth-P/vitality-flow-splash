import { useEffect, useRef } from "react";
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

  const go = () => {
    if (navigated.current) return;
    navigated.current = true;
    navigate({ to: "/welcome" });
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
        className="vf-fade-in relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col items-center justify-center overflow-hidden rounded-none bg-plum outline-none focus-visible:ring-[3px] focus-visible:ring-cream/90 focus-visible:ring-offset-0 sm:h-[932px] sm:rounded-[32px]"
      >
        {/* Logo mark */}
        <svg
          viewBox="0 0 220 150"
          className="w-[54%]"
          style={{ aspectRatio: "220 / 150" }}
          aria-hidden="true"
          focusable="false"
        >
          <g fill="var(--cream)">
            {/* Left arm of the V — thick at the top, tapering to the point */}
            <path d="M20 26 C33 12 52 16 64 36 C78 59 90 85 101 112 C96 124 86 126 78 114 C63 89 45 55 27 40 C18 33 14 32 20 26 Z" />
            {/* Right arm sweeping up into the f ascender — point at the bottom, thick hook at the top */}
            <path d="M78 114 C86 126 99 124 107 109 C120 85 140 54 164 32 C176 21 192 15 208 17 C204 30 194 40 180 52 C158 70 138 96 126 117 C118 133 96 136 78 114 Z" />
            {/* f crossbar — tapered brushstroke crossing the stem, sweeping to the right */}
            <path d="M124 56 C148 46 180 40 214 44 C219 50 215 59 203 61 C178 65 150 70 134 73 C123 75 117 61 124 56 Z" />
          </g>
        </svg>

        {/* Wordmark */}
        <h1 className="mt-[6.5rem] text-[30px] font-semibold tracking-[0.02em] text-cream">
          Vitality Flow
        </h1>
      </div>
    </div>
  );
}
