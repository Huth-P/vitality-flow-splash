import { useEffect, useState, type KeyboardEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type ChosenChange = {
  category: string;
  label: string;
  unit: string;
};

const CATEGORY_OPTIONS: Record<string, readonly string[]> = {
  Supplements: ["Omega 3", "Vitamin D", "Magnesium", "Creatine", "Zinc", "Iron", "Other"],
  "Physical activity": ["Strength training", "Walking", "Running", "Yoga", "Pilates", "Cycling", "Swimming", "Other"],
  "Sleep routine": [
    "Going to bed at a consistent time",
    "Reducing screen time before bed",
    "Avoiding caffeine later in the day",
    "Creating a wind-down routine",
    "Adjusting the bedroom environment",
    "Getting more morning daylight",
    "Other",
  ],
  "Dietary changes": [
    "Eating more protein",
    "Eating more fibre",
    "Reducing caffeine",
    "Reducing alcohol",
    "Eating at more consistent times",
    "Reducing ultra-processed foods",
    "Other",
  ],
};

const VALID_CATEGORIES = [
  ...Object.keys(CATEGORY_OPTIONS),
  "Meditation",
  "Hydration",
];

export const Route = createFileRoute("/change-details")({
  head: () => ({
    meta: [
      { title: "Change details — Vitality Flow" },
      { name: "description", content: "Step 4 of 4 — add details for your chosen change." },
      { property: "og:title", content: "Change details — Vitality Flow" },
      { property: "og:description", content: "Step 4 of 4 — add details for your chosen change." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChangeDetails,
});

function ChangeDetails() {
  const navigate = useNavigate({ from: "/change-details" });
  const [chosen, setChosen] = useState<ChosenChange | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [selection, setSelection] = useState("");
  const [otherDraft, setOtherDraft] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [stepValue, setStepValue] = useState(10);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("vf.chosenChange");
      if (!stored) {
        setLoaded(true);
        return;
      }
      const parsed: unknown = JSON.parse(stored);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "category" in parsed &&
        typeof parsed.category === "string" &&
        VALID_CATEGORIES.includes(parsed.category)
      ) {
        setChosen({
          category: parsed.category,
          label: "label" in parsed && typeof parsed.label === "string" ? parsed.label : "",
          unit: "unit" in parsed && typeof parsed.unit === "string" ? parsed.unit : "",
        });
        setStepValue(parsed.category === "Hydration" ? 8 : 10);
      }
    } catch {
      setChosen(null);
    } finally {
      setLoaded(true);
    }
  }, []);

  const isStepper = chosen?.category === "Meditation" || chosen?.category === "Hydration";
  const step = chosen?.category === "Meditation" ? 5 : 1;
  const maximum = chosen?.category === "Meditation" ? 120 : 30;
  const unit = chosen?.category === "Meditation" ? "minutes" : "glasses";

  const updateStep = (amount: number) => {
    setStepValue((current) => Math.min(maximum, Math.max(0, current + amount)));
    setMessage("");
  };

  const handleStepKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      updateStep(step);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      updateStep(-step);
    }
  };

  const handleFinish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!chosen) return;

    const resolvedLabel = isStepper ? chosen.category : selection === "Other" ? otherValue.trim() : selection;
    if (!resolvedLabel) {
      setMessage("Add a value to finish setup");
      return;
    }

    try {
      window.localStorage.setItem(
        "vf.profile",
        JSON.stringify({
          ...chosen,
          label: resolvedLabel,
          unit: isStepper ? unit : "",
          value: isStepper ? stepValue : resolvedLabel,
        }),
      );
      setMessage("");
      navigate({ to: "/transition" });
    } catch {
      setMessage("We couldn't save your answer right now — please try again.");
    }
  };

  return (
    <div className="vf-system-font flex min-h-dvh w-full items-center justify-center bg-plum-deep p-0 sm:p-6">
      <main className="relative h-dvh max-h-[932px] w-full max-w-[430px] overflow-hidden rounded-none bg-white text-[#2A292F] sm:h-[932px] sm:rounded-[32px]">
        <span className="absolute left-6 top-3 text-[11px] font-semibold" aria-hidden="true">9:41</span>
        <header className="absolute inset-x-0 top-11 h-14">
          <Button asChild variant="ghost" className="absolute left-3 top-0 min-h-11 px-2 text-[12px] font-medium text-plum focus-visible:ring-[3px] focus-visible:ring-plum">
            <Link to="/onboarding-step-4" aria-label="Back to Change Category"><ChevronLeft aria-hidden="true" className="size-4" />Step 4 of 4</Link>
          </Button>
          <p className="pr-6 pt-3 text-right text-[12px] text-[#737080]">Step 4 of 4</p>
          <div className="mx-auto mt-4 grid w-[186px] grid-cols-4 gap-3" aria-hidden="true">
            <span className="h-1 rounded-full bg-plum" /><span className="h-1 rounded-full bg-plum" />
            <span className="h-1 rounded-full bg-plum" /><span className="h-1 rounded-full bg-plum" />
          </div>
        </header>

        {!loaded ? (
          <div className="absolute inset-x-6 top-[140px]" aria-label="Loading change details">
            <div className="h-8 w-52 rounded bg-[#E8E4E6]" />
            <div className="mt-4 h-5 w-72 rounded bg-[#E8E4E6]" />
            <div className="mt-12 h-[72px] rounded-[8px] border border-[#D5D0D5] bg-white" />
          </div>
        ) : !chosen ? (
          <section className="absolute inset-x-6 top-[150px]">
            <h1 className="text-[28px] font-semibold leading-tight">Hmm, we lost that.</h1>
            <p className="mt-5 max-w-[330px] text-[16px] leading-6 text-[#737080]">Not you — us. Your choice didn't save properly. Let's go find it again.</p>
            <Button asChild className="mt-8 min-h-11 bg-plum text-cream hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">
              <Link to="/onboarding-step-4">Go back</Link>
            </Button>
          </section>
        ) : (
          <form className="absolute inset-x-0 bottom-0 top-[132px] flex flex-col" onSubmit={handleFinish}>
            <div className="px-6">
              <h1 className="text-[28px] font-semibold leading-tight">Tell us a bit more</h1>
              <p className="mt-3 text-[16px] text-[#737080]">Add the details for your chosen change.</p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-3 pt-10">
              {isStepper ? (
                <StepperRow
                  category={chosen.category}
                  value={stepValue}
                  unit={unit}
                  step={step}
                  minimum={0}
                  maximum={maximum}
                  onDecrease={() => updateStep(-step)}
                  onIncrease={() => updateStep(step)}
                  onKeyDown={handleStepKeys}
                />
              ) : (
                <DropdownRow
                  category={chosen.category}
                  options={CATEGORY_OPTIONS[chosen.category] ?? []}
                  selection={selection}
                  otherDraft={otherDraft}
                  onSelectionChange={(value) => {
                    setSelection(value);
                    setMessage("");
                    if (value !== "Other") {
                      setOtherDraft("");
                      setOtherValue("");
                    }
                  }}
                  onOtherChange={(value) => {
                    setOtherDraft(value);
                    setMessage("");
                  }}
                  onOtherBlur={() => setOtherValue(otherDraft.trim())}
                />
              )}
              <p role="alert" className="mt-3 min-h-5 text-[13px] leading-5 text-plum">{message}</p>
            </div>

            <div className="shrink-0 bg-white px-6 pb-6 pt-2">
              <p className="mb-1 text-center text-[11px] leading-4 text-[#5E5B66]">Your selections stay on this device. Nothing is sent to a server.</p>
              <p className="mb-3 text-center text-[11px] leading-4 text-[#5E5B66]">Data stays on this device.</p>
              <Button type="submit" className="h-[52px] w-full rounded-[16px] bg-plum text-[16px] font-semibold text-cream shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">Finish setup &gt;</Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

type DropdownRowProps = {
  category: string;
  options: readonly string[];
  selection: string;
  otherDraft: string;
  onSelectionChange: (value: string) => void;
  onOtherChange: (value: string) => void;
  onOtherBlur: () => void;
};

function DropdownRow({ category, options, selection, otherDraft, onSelectionChange, onOtherChange, onOtherBlur }: DropdownRowProps) {
  const selectId = `change-detail-${category.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <div className="relative min-h-[72px] rounded-[8px] border border-[#D5D0D5] bg-white px-4 py-3 outline-none focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-plum">
      <label htmlFor={selectId} className="block text-[11px] font-medium text-[#5E5B66]">{category}</label>
      <div className="mt-1 flex min-h-11 items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className={`min-w-0 truncate text-[15px] ${selection ? "font-semibold text-[#2A292F]" : "text-[#737080]"}`}>
            {selection || "Choose an option"}
          </span>
          {selection === "Other" ? (
            <span className="flex min-w-0 flex-1 items-end gap-1">
              <label htmlFor={`${selectId}-other`} className="sr-only">Describe your {category.toLowerCase()} change</label>
              <input
                id={`${selectId}-other`}
                value={otherDraft}
                onChange={(event) => onOtherChange(event.target.value)}
                onBlur={onOtherBlur}
                maxLength={60}
                autoComplete="off"
                className="h-7 min-w-0 max-w-32 flex-1 border-0 border-b-2 border-[#D5D0D5] bg-transparent px-0 text-[13px] outline-none focus-visible:border-plum focus-visible:ring-0"
              />
              <span className="shrink-0 text-[10px] text-[#5E5B66]" aria-live="polite">{otherDraft.length}/60</span>
            </span>
          ) : null}
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center" aria-hidden="true"><ChevronDown className="size-5 text-plum" /></span>
        <select
          id={selectId}
          value={selection}
          onChange={(event) => onSelectionChange(event.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label={`${category} option`}
        >
          <option value="">Choose an option</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
    </div>
  );
}

type StepperRowProps = {
  category: string;
  value: number;
  unit: string;
  step: number;
  minimum: number;
  maximum: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
};

function StepperRow({ category, value, unit, step, minimum, maximum, onDecrease, onIncrease, onKeyDown }: StepperRowProps) {
  return (
    <fieldset className="relative rounded-[8px] border border-[#D5D0D5] bg-white px-4 py-4">
      <legend className="px-1 text-[13px] font-medium">{category}</legend>
      <div className="mt-2 flex items-center justify-center gap-5">
        <Button type="button" variant="outline" size="icon" className="size-11 border-[#B9B4B9] text-plum focus-visible:ring-[3px] focus-visible:ring-plum" onClick={onDecrease} disabled={value === minimum} aria-label={`Decrease by ${step}`}>
          <Minus aria-hidden="true" className="size-5" />
        </Button>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-label={`${category} amount`}
          aria-valuenow={value}
          aria-valuemin={minimum}
          aria-valuemax={maximum}
          aria-valuetext={`${value} ${unit}`}
          onKeyDown={onKeyDown}
          className="flex min-h-11 min-w-28 items-center justify-center rounded-[8px] font-semibold outline-none focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2"
        >
          <span aria-live="polite">{value} {unit}</span>
        </div>
        <Button type="button" variant="outline" size="icon" className="size-11 border-[#B9B4B9] text-plum focus-visible:ring-[3px] focus-visible:ring-plum" onClick={onIncrease} disabled={value === maximum} aria-label={`Increase by ${step}`}>
          <Plus aria-hidden="true" className="size-5" />
        </Button>
      </div>
    </fieldset>
  );
}