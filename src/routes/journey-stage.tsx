import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const JOURNEY_OPTIONS = [
  { value: "periods_normal", label: "My periods are normal" },
  { value: "periods_changing", label: "My periods are changing" },
  { value: "periods_irregular", label: "My periods are irregular (2–3 months)" },
  { value: "no_period_12_months", label: "I haven't had a period for 12+ months" },
  { value: "not_sure", label: "I'm not sure" },
] as const;

export const Route = createFileRoute("/journey-stage")({
  head: () => ({
    meta: [
      { title: "Your journey — Vitality Flow" },
      {
        name: "description",
        content:
          "Step 1 of 4 — tell Vitality Flow where you are in your journey.",
      },
      { property: "og:title", content: "Your journey — Vitality Flow" },
      {
        property: "og:description",
        content:
          "Step 1 of 4 — tell Vitality Flow where you are in your journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JourneyStage,
});

function JourneyStage() {
  const navigate = useNavigate({ from: "/journey-stage" });
  const [selected, setSelected] = useState<string>("");
  const [saveMessage, setSaveMessage] = useState("");

  const handleContinue = () => {
    if (!selected) return;
    setSaveMessage("");
    try {
      window.localStorage.setItem(
        "vf.onboarding.step1",
        JSON.stringify({ journey_stage: selected }),
      );
      navigate({ to: "/age-range" });
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
            <Link to="/welcome" aria-label="Back to Welcome">
              <ChevronLeft aria-hidden="true" />
            </Link>
          </Button>
          <p className="pt-3 text-center text-[12px] text-[#737080]">Step 1 of 4</p>
          <div className="mx-auto mt-4 grid w-[186px] grid-cols-4 gap-3" aria-hidden="true">
            <span className="h-[4px] rounded-full bg-plum" />
            <span className="h-[4px] rounded-full bg-[#D5D0D5]" />
            <span className="h-[4px] rounded-full bg-[#D5D0D5]" />
            <span className="h-[4px] rounded-full bg-[#D5D0D5]" />
          </div>
        </div>

        <form
          className="absolute inset-x-0 top-[146px] bottom-6 flex flex-col px-6"
          onSubmit={(event) => {
            event.preventDefault();
            handleContinue();
          }}
        >
          <h1 id="journey-heading" className="max-w-[12ch] text-[28px] font-semibold leading-[1.08]">Where are you in your journey?</h1>
          <p id="journey-help" className="mt-4 text-[16px] leading-6 text-[#737080]">Choose the option that feels closest to you right now.</p>

          <fieldset aria-describedby="journey-help" className="mt-7 space-y-3">
            <legend className="sr-only">Journey stage</legend>
            {JOURNEY_OPTIONS.map((option) => {
              const checked = selected === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex min-h-[64px] cursor-pointer items-center justify-between rounded-[12px] border px-4 text-[15px] leading-5 outline-none focus-within:ring-[3px] focus-within:ring-plum ${checked ? "border-2 border-plum bg-cream" : "border-[#D5D0D5] bg-white"}`}
                >
                  <span className="max-w-[285px]">{option.label}</span>
                  <input
                    type="radio"
                    name="journey-stage"
                    value={option.value}
                    checked={checked}
                    onChange={() => {
                      setSelected(option.value);
                      setSaveMessage("");
                    }}
                    className="sr-only"
                  />
                  <span aria-hidden="true" className={`size-5 shrink-0 rounded-full border ${checked ? "border-plum bg-plum shadow-[inset_0_0_0_4px_var(--cream)]" : "border-[#B9B4B9] bg-white"}`} />
                </label>
              );
            })}
          </fieldset>

          <div className="mt-auto">
            {saveMessage ? <p role="alert" className="mb-3 text-center text-sm text-[#737080]">{saveMessage}</p> : null}
            <Button type="submit" disabled={!selected} className="h-[52px] w-full rounded-[16px] bg-plum text-[16px] font-semibold text-cream shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2 disabled:bg-plum disabled:opacity-45">
              Continue →
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
