import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const SYMPTOM_OPTIONS = [
  "Trouble sleeping",
  "Hot flashes or night sweats",
  "Mood swings or irritability",
  "Brain fog or memory lapses",
  "Joint or muscle aches",
  "Low energy or fatigue",
  "Weight changes",
  "Low interest in sex",
  "Anxiety or feeling on edge",
  "Other",
] as const;

const OTHER_OPTION = "Other";

export const Route = createFileRoute("/onboarding-step-3")({
  head: () => ({
    meta: [
      { title: "Main focus — Vitality Flow" },
      { name: "description", content: "Step 3 of 4 — choose what you would most like to understand." },
      { property: "og:title", content: "Main focus — Vitality Flow" },
      { property: "og:description", content: "Step 3 of 4 — choose what you would most like to understand." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MainFocus,
});

function MainFocus() {
  const navigate = useNavigate({ from: "/onboarding-step-3" });
  const [selected, setSelected] = useState<string[]>([]);
  const [otherLabel, setOtherLabel] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const resolvedSelections = selected.map((option) =>
    option === OTHER_OPTION ? otherLabel.trim() : option,
  );
  const canContinue = resolvedSelections.length > 0 && resolvedSelections.every(Boolean);

  const toggleOption = (option: string) => {
    setSaveMessage("");
    setSelected((current) => {
      if (current.includes(option)) return current.filter((item) => item !== option);
      if (current.length >= 3) return current;
      return [...current, option];
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canContinue) return;

    const [mainFocus, ...trackedAlongside] = resolvedSelections;
    if (!mainFocus) return;

    try {
      window.localStorage.setItem(
        "vf.onboarding.step3",
        JSON.stringify({ main_focus: mainFocus, tracked_alongside: trackedAlongside }),
      );
      setSaveMessage("");
      navigate({ to: "/onboarding-step-4" });
    } catch {
      setSaveMessage("We couldn't save your answer right now — please try again.");
    }
  };

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative h-dvh max-h-[932px] w-full max-w-[430px] overflow-hidden rounded-none bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[32px]">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        <div className="absolute inset-x-0 top-11 h-12">
          <Button asChild variant="ghost" size="icon" className="absolute left-3 top-0 size-11 rounded-full text-plum focus-visible:ring-[3px] focus-visible:ring-plum">
            <Link to="/age-range" aria-label="Back to Age Range"><ChevronLeft aria-hidden="true" /></Link>
          </Button>
          <p className="pt-3 text-center text-[12px] text-[#737080]">Step 3 of 4</p>
          <div className="mx-auto mt-4 grid w-[186px] grid-cols-4 gap-3" aria-hidden="true">
            <span className="h-1 rounded-full bg-plum" /><span className="h-1 rounded-full bg-plum" />
            <span className="h-1 rounded-full bg-plum" /><span className="h-1 rounded-full bg-[#D5D0D5]" />
          </div>
        </div>

        <form className="absolute inset-x-0 bottom-0 top-[124px] flex flex-col" onSubmit={handleSubmit}>
          <div className="px-6">
            <h1 className="max-w-[360px] text-[26px] font-semibold leading-[1.08]">
              From what you've been experiencing lately, what would you most like to understand?
            </h1>
            <p id="focus-help" className="mt-4 text-[13px] leading-[1.4] text-[#737080]">
              Select up to 3. Your first selection will be your main focus, and the others will be tracked alongside it.
            </p>
          </div>

          <fieldset aria-describedby="focus-help focus-limit" className="mt-4 min-h-0 flex-1 overflow-y-auto px-6 pb-3">
            <legend className="sr-only">Main focus symptoms</legend>
            <p id="focus-limit" className="sr-only" aria-live="polite">{selected.length} of 3 selected</p>
            <div className="space-y-2">
              {SYMPTOM_OPTIONS.map((option) => {
                const checked = selected.includes(option);
                const isMain = selected[0] === option;
                return (
                  <div key={option}>
                    <label className={`flex min-h-[48px] cursor-pointer items-center gap-2 rounded-[12px] border px-3 text-[13px] outline-none focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-plum ${checked ? "border-2 border-plum bg-cream" : "border-[#D5D0D5] bg-white"}`}>
                      <span className="min-w-0 flex-1">{option}</span>
                      {isMain && <span className="shrink-0 rounded-full bg-plum px-2 py-1 text-[10px] font-semibold text-cream">Main focus</span>}
                      <input
                        type="checkbox"
                        name="main-focus"
                        value={option}
                        checked={checked}
                        onChange={() => toggleOption(option)}
                        aria-label={option}
                        className="sr-only"
                      />
                      <span aria-hidden="true" className={`size-5 shrink-0 rounded-full border ${checked ? "border-plum bg-plum" : "border-[#B9B4B9] bg-white"}`} />
                    </label>
                    {option === OTHER_OPTION && checked && (
                      <div className="mt-2 pl-2">
                        <label htmlFor="other-symptom" className="text-[12px] font-medium text-[#2A292F]">Describe your symptom</label>
                        <input
                          id="other-symptom"
                          value={otherLabel}
                          onChange={(event) => { setOtherLabel(event.target.value); setSaveMessage(""); }}
                          maxLength={80}
                          autoComplete="off"
                          className="mt-1 h-11 w-full rounded-[10px] border border-[#D5D0D5] bg-white px-3 text-[14px] outline-none focus-visible:ring-[3px] focus-visible:ring-plum"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </fieldset>

          <div className="shrink-0 bg-white px-6 pb-6 pt-2">
            <p role="alert" className="mb-2 min-h-5 text-[13px] leading-5 text-plum">{saveMessage}</p>
            <Button type="submit" disabled={!canContinue} className="h-[52px] w-full rounded-[16px] bg-plum text-[16px] font-semibold text-cream shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2 disabled:bg-plum disabled:opacity-45">Continue &gt;</Button>
          </div>
        </form>
      </main>
    </div>
  );
}