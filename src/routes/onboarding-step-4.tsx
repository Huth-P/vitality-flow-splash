import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, Droplets, Flower2, Footprints, Moon, Pill, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";

type CategoryOption = {
  label: string;
  Icon: typeof Pill;
  glyphColor: string;
  glowColor: string;
};

const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: "Supplements", Icon: Pill, glyphColor: "var(--vf-disc-coral)", glowColor: "var(--vf-disc-coral)" },
  { label: "Physical activity", Icon: Footprints, glyphColor: "var(--vf-disc-apricot)", glowColor: "var(--vf-disc-apricot)" },
  { label: "Meditation", Icon: Flower2, glyphColor: "var(--vf-disc-lilac)", glowColor: "var(--vf-lavender)" },
  { label: "Hydration", Icon: Droplets, glyphColor: "var(--vf-disc-teal)", glowColor: "var(--vf-disc-teal)" },
  { label: "Sleep routine", Icon: Moon, glyphColor: "var(--vf-disc-lilac)", glowColor: "var(--vf-lavender)" },
  { label: "Dietary changes", Icon: Utensils, glyphColor: "var(--vf-disc-teal)", glowColor: "var(--vf-disc-teal)" },
];

export const Route = createFileRoute("/onboarding-step-4")({
  head: () => ({
    meta: [
      { title: "Change category — Vitality Flow" },
      { name: "description", content: "Step 4 of 4 — choose one change to track to see if it works." },
      { property: "og:title", content: "Change category — Vitality Flow" },
      { property: "og:description", content: "Step 4 of 4 — choose one change to track to see if it works." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChangeCategory,
});

function ChangeCategory() {
  const [selected, setSelected] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-white p-0 sm:p-6">
        <main className="relative flex h-dvh max-h-[932px] w-full max-w-[430px] flex-col items-center justify-center rounded-none bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[32px]">
          <p className="text-[12px] text-[#737080]">Step 4 of 4 — saved</p>
          <h1 className="mt-2 text-2xl font-semibold">Saved.</h1>
          <p className="mt-2 text-[13px] text-[#737080]">The next screen is coming next.</p>
          <Link
            to="/onboarding-step-3"
            className="mt-6 inline-flex min-h-11 items-center text-plum underline decoration-2 underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-plum"
          >
            Back to main focus
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative h-dvh max-h-[932px] w-full max-w-[430px] overflow-hidden rounded-none bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[32px]">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        <div className="absolute inset-x-0 top-11 h-12">
          <Button asChild variant="ghost" size="icon" className="absolute left-3 top-0 size-11 rounded-full text-plum focus-visible:ring-[3px] focus-visible:ring-plum">
            <Link to="/onboarding-step-3" aria-label="Back to Main Focus"><ChevronLeft aria-hidden="true" /></Link>
          </Button>
          <p className="pt-3 text-center text-[12px] text-[#737080]">Step 4 of 4</p>
          <div className="mx-auto mt-4 grid w-[186px] grid-cols-4 gap-3" aria-hidden="true">
            <span className="h-1 rounded-full bg-plum" /><span className="h-1 rounded-full bg-plum" />
            <span className="h-1 rounded-full bg-plum" /><span className="h-1 rounded-full bg-plum" />
          </div>
        </div>

        <form
          className="absolute inset-x-0 bottom-0 top-[124px] flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            if (!selected) return;
            try {
              window.localStorage.setItem("vf.onboarding.step4a", JSON.stringify({ change_category: selected }));
              setSaveMessage("");
              setSaved(true);
            } catch {
              setSaveMessage("We couldn't save your answer right now — please try again.");
            }
          }}
        >
          <div className="px-6">
            <h1 className="max-w-[340px] text-[26px] font-semibold leading-[1.08]">
              What change have you decided to track to see if it works?
            </h1>
            <p className="mt-4 text-[16px] text-[#737080]">Choose one to start with.</p>
          </div>

          <fieldset className="mt-2 min-h-0 flex-1 overflow-y-auto" >
            <legend className="sr-only">Change to track</legend>
            <div className="mx-auto mt-3 grid w-[370px] max-w-full grid-cols-2 gap-[14px] px-6 sm:px-0">
              {CATEGORY_OPTIONS.map(({ label, Icon, glyphColor, glowColor }) => {
                const checked = selected === label;
                return (
                  <label
                    key={label}
                    className={`relative flex h-[158px] cursor-pointer flex-col items-center justify-center rounded-[16px] text-center outline-none focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-plum ${checked ? "border-2 border-plum bg-vf-tile" : "border border-[#D5D0D5] bg-vf-tile"}`}
                  >
                    <input
                      type="radio"
                      name="change-category"
                      value={label}
                      checked={checked}
                      onChange={() => {
                        setSelected(label);
                        setSaveMessage("");
                      }}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-[54px] size-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ background: `radial-gradient(closest-side, color-mix(in srgb, ${glowColor} 45%, transparent), transparent)` }}
                    />
                    <Icon aria-hidden="true" size={30} strokeWidth={1.8} style={{ color: glyphColor }} className="relative" />
                    <span className="relative mt-3 px-2 text-[13px] font-medium">{label}</span>
                    {checked ? (
                      <span aria-hidden="true" className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-plum">
                        <Check aria-hidden="true" size={14} strokeWidth={3} className="text-cream" />
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="shrink-0 bg-white px-6 pb-6 pt-2">
            <p role="alert" className="mb-2 min-h-5 text-[13px] leading-5 text-plum">{saveMessage}</p>
            <Button type="submit" disabled={!selected} className="h-[52px] w-full rounded-[16px] bg-plum text-[16px] font-semibold text-cream shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2 disabled:bg-plum disabled:opacity-45">Continue &gt;</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
