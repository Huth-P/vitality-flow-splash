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
          viewBox="0 0 240 180"
          className="w-[56%]"
          style={{ aspectRatio: "240 / 180" }}
          aria-hidden="true"
          focusable="false"
        >
          <g fill="var(--cream)">
            {/* Left arm of the V — thick at the top, tapering to the point */}
            <path d="M24 48 C36 38 52 42 62 60 C74 82 84 110 94 144 C90 156 79 158 72 146 C58 120 44 90 32 70 C24 58 18 56 24 48 Z" />
            {/* f stem — rises steeply from the V point, leaning into the hook */}
            <path d="M72 146 C80 159 95 157 104 140 C120 113 132 84 146 55 L164 47 C152 80 138 112 122 142 C112 161 84 164 72 146 Z" />
            {/* f hook — brushstroke curl at the top of the ascender */}
            <path d="M146 55 C154 40 168 28 186 24 C202 21 216 27 220 38 C214 47 202 51 190 49 C176 47 162 47 146 55 Z" />
            {/* f crossbar — horizontal tapered stroke crossing the stem */}
            <path d="M108 84 C136 74 178 70 216 74 C222 80 218 89 206 91 C176 95 140 98 120 100 C108 101 102 90 108 84 Z" />
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
