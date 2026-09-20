import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CHANGE_CATEGORY_NOUNS,
  CHANGE_CATEGORY_OPTIONS,
  type IntermediateCategory,
} from "./category-options";

type StoredChoice = { category?: unknown; label?: unknown; unit?: unknown };

type CategoryOptionScreenProps = {
  category: IntermediateCategory;
  from: "/change-details/supplements" | "/change-details/physical-activity" | "/change-details/sleep-routine" | "/change-details/dietary-changes";
};

export function CategoryOptionScreen({ category, from }: CategoryOptionScreenProps) {
  const navigate = useNavigate({ from });
  const [selection, setSelection] = useState("");
  const [otherDraft, setOtherDraft] = useState("");
  const [message, setMessage] = useState("");
  const options = CHANGE_CATEGORY_OPTIONS[category];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const label = selection === "Other" ? otherDraft.trim() : selection;
    if (!label) {
      setMessage("Select an option to continue");
      return;
    }

    try {
      let stored: StoredChoice = {};
      const raw = window.localStorage.getItem("vf.chosenChange");
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed === "object" && parsed !== null) stored = parsed as StoredChoice;
      }
      const chosenChange = { ...stored, category, label, unit: "" };
      window.localStorage.setItem("vf.chosenChange", JSON.stringify(chosenChange));

      if (category === "Supplements") {
        navigate({ to: "/change-details" });
        return;
      }

      const completedChoice = { category, label };
      window.localStorage.setItem("vf.chosenChange", JSON.stringify(completedChoice));
      window.localStorage.setItem("vf.profile", JSON.stringify(completedChoice));
      navigate({ to: "/transition" });
    } catch {
      setMessage("We couldn't save your answer right now — please try again.");
    }
  };

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative h-dvh max-h-[932px] w-full max-w-[430px] overflow-hidden rounded-none border-vf-soft-border bg-background text-[#29252A] sm:h-[932px] sm:rounded-[30px] sm:border">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        <header className="absolute inset-x-0 top-10 h-14">
          <Button asChild variant="ghost" size="icon" className="absolute left-3 top-0 size-11 rounded-full text-[#29252A] focus-visible:ring-[3px] focus-visible:ring-plum">
            <Link to="/onboarding-step-4" aria-label="Back to Change Category"><ChevronLeft aria-hidden="true" className="size-[18px]" strokeWidth={1.8} /></Link>
          </Button>
          <p className="pt-3 text-center text-[11px] text-[#737080]">Step 4 of 4</p>
          <div className="mx-auto mt-[13px] grid w-[210px] grid-cols-4 gap-[14px]" aria-hidden="true">
            <span className="h-1 rounded-[2px] bg-vf-disc-lilac" /><span className="h-1 rounded-[2px] bg-vf-disc-lilac" />
            <span className="h-1 rounded-[2px] bg-vf-disc-lilac" /><span className="h-1 rounded-[2px] bg-vf-disc-lilac" />
          </div>
        </header>

        <form className="absolute inset-x-0 bottom-0 top-[186px] flex flex-col" onSubmit={handleSubmit}>
          <div className="px-6">
            <h1 className="text-[24px] font-semibold leading-tight">Tell us a bit more</h1>
            <p id="category-help" className="mt-1 text-[14px] text-[#29252A]">Select your {CHANGE_CATEGORY_NOUNS[category]}.</p>
          </div>

          <fieldset aria-describedby="category-help" className="mt-[26px] min-h-0 flex-1 overflow-y-auto px-6 pb-3">
            <legend className="sr-only">Select your {CHANGE_CATEGORY_NOUNS[category]}</legend>
            <div className="space-y-[9px]">
              {options.map((option) => {
                const checked = selection === option;
                const inputId = `${from.replaceAll("/", "-")}-${option.toLowerCase().replaceAll(" ", "-")}`;
                return (
                  <label
                    key={option}
                    htmlFor={inputId}
                    className={`relative flex min-h-11 cursor-pointer items-center rounded-[10.5px] border bg-vf-soft-surface px-4 outline-none focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-plum ${checked ? "border-vf-disc-lilac" : "border-vf-soft-border"}`}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name="category-option"
                      value={option}
                      checked={checked}
                      onChange={() => {
                        setSelection(option);
                        if (option !== "Other") setOtherDraft("");
                        setMessage("");
                      }}
                      className="absolute left-4 top-1/2 size-px -translate-y-1/2 opacity-0"
                    />
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="min-w-0 shrink text-[16px] font-semibold leading-5">{option}</span>
                      {checked && option === "Other" ? (
                        <span className="flex min-w-0 flex-1 items-end gap-1">
                          <label htmlFor={`${inputId}-text`} className="sr-only">Enter the {CHANGE_CATEGORY_NOUNS[category]} name</label>
                          <input
                            id={`${inputId}-text`}
                            value={otherDraft}
                            onChange={(event) => {
                              setOtherDraft(event.target.value);
                              setMessage("");
                            }}
                            maxLength={60}
                            autoComplete="off"
                            className="h-7 min-w-0 max-w-32 flex-1 border-0 border-b-2 border-vf-soft-border bg-transparent px-0 text-[13px] outline-none focus-visible:border-plum focus-visible:ring-0"
                          />
                          <span className="shrink-0 text-[10px] font-normal text-[#737080]" aria-live="polite">{otherDraft.length}/60</span>
                        </span>
                      ) : null}
                    </span>
                    <span className={`flex size-[18px] shrink-0 items-center justify-center rounded-full border ${checked ? "border-vf-disc-lilac bg-vf-disc-lilac" : "border-[#B8B3BD] bg-background"}`} aria-hidden="true">
                      {checked ? <Check className="size-3 text-vf-on-plum" strokeWidth={3} /> : null}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="shrink-0 bg-background px-6 pb-8 pt-2">
            <p role="alert" className="mb-2 min-h-5 text-[13px] leading-5 text-plum">{message}</p>
            <Button type="submit" className="h-[52px] w-full rounded-full bg-plum text-[18px] font-semibold text-vf-on-plum shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">Continue</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
