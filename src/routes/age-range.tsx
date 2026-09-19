import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const AGE_OPTIONS = ["Under 40", "40–45", "46–50", "51–55", "56+"] as const;

export const Route = createFileRoute("/age-range")({
  head: () => ({
    meta: [
      { title: "Age range — Vitality Flow" },
      { name: "description", content: "Step 2 of 4 — choose your age range." },
      { property: "og:title", content: "Age range — Vitality Flow" },
      { property: "og:description", content: "Step 2 of 4 — choose your age range." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AgeRange,
});

function AgeRange() {
  const navigate = useNavigate({ from: "/age-range" });
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative h-dvh max-h-[932px] w-full max-w-[430px] overflow-hidden rounded-none bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[32px]">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        <div className="absolute inset-x-0 top-11 h-12">
          <Button asChild variant="ghost" size="icon" className="absolute left-3 top-0 size-11 rounded-full text-plum focus-visible:ring-[3px] focus-visible:ring-plum">
            <Link to="/journey-stage" aria-label="Back to Journey Stage"><ChevronLeft aria-hidden="true" /></Link>
          </Button>
          <p className="pt-3 text-center text-[12px] text-[#737080]">Step 2 of 4</p>
          <div className="mx-auto mt-4 grid w-[186px] grid-cols-4 gap-3" aria-hidden="true">
            <span className="h-[4px] rounded-full bg-plum" /><span className="h-[4px] rounded-full bg-plum" />
            <span className="h-[4px] rounded-full bg-[#D5D0D5]" /><span className="h-[4px] rounded-full bg-[#D5D0D5]" />
          </div>
        </div>

        <form className="absolute inset-x-0 top-[174px] bottom-6 flex flex-col px-6" onSubmit={(event) => { event.preventDefault(); if (selected) navigate({ to: "/onboarding-step-3" }); }}>
          <h1 className="text-[28px] font-semibold leading-[1.08]">What is your age range?</h1>
          <p id="age-help" className="mt-5 text-[13px] leading-5 text-[#737080]">This helps us provide more relevant educational information.</p>
          <fieldset aria-describedby="age-help" className="mt-7 space-y-3">
            <legend className="sr-only">Age range</legend>
            {AGE_OPTIONS.map((option) => {
              const checked = selected === option;
              return (
                <label key={option} className={`flex min-h-[64px] cursor-pointer items-center justify-between rounded-[12px] border px-4 text-[15px] outline-none focus-within:ring-[3px] focus-within:ring-plum ${checked ? "border-2 border-plum bg-cream" : "border-[#D5D0D5] bg-white"}`}>
                  <span>{option}</span>
                  <input type="radio" name="age-range" value={option} checked={checked} onChange={() => setSelected(option)} className="sr-only" />
                  <span aria-hidden="true" className={`size-5 shrink-0 rounded-full border ${checked ? "border-plum bg-plum" : "border-[#B9B4B9] bg-white"}`} />
                </label>
              );
            })}
          </fieldset>
          <Button type="submit" disabled={!selected} className="mt-auto h-[52px] w-full rounded-[16px] bg-plum text-[16px] font-semibold text-cream shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2 disabled:bg-plum disabled:opacity-45">Continue &gt;</Button>
        </form>
      </main>
    </div>
  );
}