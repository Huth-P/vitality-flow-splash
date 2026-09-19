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
        {/* Logo mark — brushstroke "Vf" */}
        <svg
          viewBox="0 0 200 160"
          className="w-[52%]"
          style={{ aspectRatio: "200 / 160" }}
          aria-hidden="true"
          focusable="false"
        >
          <g
            fill="none"
            stroke="var(--cream)"
            strokeWidth="17"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Left arm of the V */}
            <path d="M34 40 C40 66 50 90 62 108" />
            {/* Right stroke rising into the f ascender with a hooked top */}
            <path d="M62 108 C80 90 96 62 108 36 C113 24 124 17 138 18 C148 19 155 25 156 33" />
            {/* f crossbar */}
            <path d="M80 64 C100 56 124 53 148 56" />
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
