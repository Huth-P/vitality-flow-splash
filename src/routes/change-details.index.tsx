import { useEffect, useState, type KeyboardEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type ChosenChange = { category: string; label: string; unit?: string };
type SupplementFields = { amount: string; frequency: string; when: string };

const VALID_CATEGORIES = ["Supplements", "Meditation", "Hydration"];
const AMOUNTS = ["50mg", "100mg", "200mg", "400mg", "500mg", "1000mg"];
const FREQUENCIES = ["Once daily", "Twice daily", "As needed"];
const TIMES = ["Morning", "Midday", "Evening", "Night", "With food"];

export const Route = createFileRoute("/change-details/")({
  head: () => ({ meta: [
    { title: "Change details — Vitality Flow" },
    { name: "description", content: "Step 4 of 4 — add details for your chosen change." },
    { property: "og:title", content: "Change details — Vitality Flow" },
    { property: "og:description", content: "Step 4 of 4 — add details for your chosen change." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ChangeDetails,
});

function ChangeDetails() {
  const navigate = useNavigate({ from: "/change-details/" });
  const [chosen, setChosen] = useState<ChosenChange | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [stepValue, setStepValue] = useState(10);
  const [fields, setFields] = useState<SupplementFields>({ amount: "", frequency: "", when: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("vf.chosenChange");
      if (!stored) return;
      const parsed: unknown = JSON.parse(stored);
      if (typeof parsed === "object" && parsed !== null && "category" in parsed && typeof parsed.category === "string" && VALID_CATEGORIES.includes(parsed.category)) {
        const label = "label" in parsed && typeof parsed.label === "string" ? parsed.label : "";
        if (parsed.category === "Supplements" && !label) return;
        setChosen({ category: parsed.category, label, unit: "unit" in parsed && typeof parsed.unit === "string" ? parsed.unit : "" });
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
    if (event.key === "ArrowUp") { event.preventDefault(); updateStep(step); }
    if (event.key === "ArrowDown") { event.preventDefault(); updateStep(-step); }
  };

  const handleFinish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!chosen) return;
    const amount = fields.amount;
    if (!isStepper && (!amount || !fields.frequency || !fields.when)) {
      setMessage("Add a value to finish setup");
      return;
    }
    try {
      const profile = isStepper
        ? { ...chosen, label: chosen.category, unit, value: stepValue }
        : { ...chosen, amount, frequency: fields.frequency, when: fields.when };
      window.localStorage.setItem("vf.profile", JSON.stringify(profile));
      setMessage("");
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
            <Link to={chosen?.category === "Supplements" ? "/change-details/supplements" : "/onboarding-step-4"} aria-label="Back"><ChevronLeft aria-hidden="true" className="size-[18px]" strokeWidth={1.8} /></Link>
          </Button>
          <p className="pt-3 text-center text-[11px] text-[#737080]">Step 4 of 4</p>
          <div className="mx-auto mt-[13px] grid w-[210px] grid-cols-4 gap-[14px]" aria-hidden="true">
            <span className="h-1 rounded-[2px] bg-vf-disc-lilac" /><span className="h-1 rounded-[2px] bg-vf-disc-lilac" />
            <span className="h-1 rounded-[2px] bg-vf-disc-lilac" /><span className="h-1 rounded-[2px] bg-vf-disc-lilac" />
          </div>
        </header>

        {!loaded ? <LoadingState /> : !chosen ? <MissingState /> : (
          <form className="absolute inset-x-0 bottom-0 top-[186px] flex flex-col" onSubmit={handleFinish}>
            <div className="px-6">
              <h1 className="text-[24px] font-semibold leading-tight">Tell us a bit more</h1>
              <p className="mt-1 text-[14px] text-[#29252A]">Add the details for your chosen change.</p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-[23px] pb-3 pt-[11px]">
              {isStepper ? (
                <StepperRow category={chosen.category} value={stepValue} unit={unit} step={step} maximum={maximum} onDecrease={() => updateStep(-step)} onIncrease={() => updateStep(step)} onKeyDown={handleStepKeys} />
              ) : (
                <>
                  <section className="relative h-[162px] w-full overflow-hidden rounded-[15px] border border-vf-soft-border bg-vf-soft-surface p-4 shadow-[0_4px_6px_rgba(0,0,0,0.08)]" aria-label="Chosen supplement">
                    <span className="text-[11px] text-[#29252A]">Supplement</span>
                    <p className="mt-2 text-[16px] font-semibold text-[#29252A]">{chosen.label}</p>
                    <span aria-hidden="true" className="absolute left-[256px] top-[19px] size-[62px] rounded-full bg-vf-disc-lilac opacity-30 blur-[9px]" />
                  </section>
                  <div className="mt-[57px] space-y-[45px]">
                    <DetailSelect label="Amount" value={fields.amount} options={AMOUNTS} onChange={(value) => { setFields((current) => ({ ...current, amount: value })); setMessage(""); }} />
                    <DetailSelect label="Frequency" value={fields.frequency} options={FREQUENCIES} onChange={(value) => { setFields((current) => ({ ...current, frequency: value })); setMessage(""); }} />
                    <DetailSelect label="When do you take it?" value={fields.when} options={TIMES} onChange={(value) => { setFields((current) => ({ ...current, when: value })); setMessage(""); }} />
                  </div>
                </>
              )}
              <p role="alert" className="mt-3 min-h-5 text-[13px] leading-5 text-plum">{message}</p>
            </div>

            <div className="shrink-0 bg-background px-6 pb-8 pt-2">
              <Button type="submit" className="h-[52px] w-full rounded-full bg-plum text-[18px] font-semibold text-vf-on-plum shadow-none hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2">Finish setup</Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

function LoadingState() {
  return <div className="absolute inset-x-6 top-[186px]" aria-label="Loading change details"><div className="h-7 w-52 rounded bg-[#E8E4E6]" /><div className="mt-3 h-5 w-72 rounded bg-[#E8E4E6]" /><div className="mt-8 h-[162px] rounded-[15px] border border-vf-soft-border bg-vf-soft-surface" /></div>;
}

function MissingState() {
  return <section className="absolute inset-x-6 top-[186px]"><h1 className="text-[24px] font-semibold leading-tight">Hmm, we lost that.</h1><p className="mt-5 max-w-[330px] text-[16px] leading-6 text-[#737080]">Not you — us. Your choice didn't save properly. Let's go find it again.</p><Button asChild className="mt-8 min-h-11 rounded-full bg-plum text-vf-on-plum hover:bg-plum focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2"><Link to="/onboarding-step-4">Go back</Link></Button></section>;
}

type DetailSelectProps = { label: string; value: string; options: readonly string[]; onChange: (value: string) => void };
function DetailSelect({ label, value, options, onChange }: DetailSelectProps) {
  const id = `detail-${label.toLowerCase().replaceAll(" ", "-").replaceAll("?", "")}`;
  return <div className="relative h-[49px] rounded-[10.5px] border border-vf-soft-border bg-vf-soft-surface px-3 outline-none focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-plum"><label htmlFor={id} className="absolute -top-6 left-0 text-[11px] font-semibold text-[#29252A]">{label}</label><select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="absolute inset-0 size-full cursor-pointer appearance-none bg-transparent px-3 pr-10 text-[13px] font-medium outline-none"><option value="">Select</option>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-[7px] w-[7px] -translate-y-1/2 text-[#29252A]" strokeWidth={1.6} /></div>;
}

type StepperRowProps = { category: string; value: number; unit: string; step: number; maximum: number; onDecrease: () => void; onIncrease: () => void; onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void };
function StepperRow({ category, value, unit, step, maximum, onDecrease, onIncrease, onKeyDown }: StepperRowProps) {
  return <fieldset className="relative rounded-[8px] border border-[#D5D0D5] bg-white px-4 py-4"><legend className="px-1 text-[13px] font-medium">{category}</legend><div className="mt-2 flex items-center justify-center gap-5"><Button type="button" variant="outline" size="icon" className="size-11 border-[#B9B4B9] text-plum focus-visible:ring-[3px] focus-visible:ring-plum" onClick={onDecrease} disabled={value === 0} aria-label={`Decrease by ${step}`}><Minus aria-hidden="true" className="size-5" /></Button><div role="spinbutton" tabIndex={0} aria-label={`${category} amount`} aria-valuenow={value} aria-valuemin={0} aria-valuemax={maximum} aria-valuetext={`${value} ${unit}`} onKeyDown={onKeyDown} className="flex min-h-11 min-w-28 items-center justify-center rounded-[8px] font-semibold outline-none focus-visible:ring-[3px] focus-visible:ring-plum focus-visible:ring-offset-2"><span aria-live="polite">{value} {unit}</span></div><Button type="button" variant="outline" size="icon" className="size-11 border-[#B9B4B9] text-plum focus-visible:ring-[3px] focus-visible:ring-plum" onClick={onIncrease} disabled={value === maximum} aria-label={`Increase by ${step}`}><Plus aria-hidden="true" className="size-5" /></Button></div></fieldset>;
}
