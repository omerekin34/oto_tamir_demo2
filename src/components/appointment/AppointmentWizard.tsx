"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CarFront,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cog,
  MapPin,
  ScanSearch,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/lib/types";
import { cn } from "@/lib/utils";

type WizardCopy = Dictionary["appointment"]["wizard"];
type ServiceId = "periodic" | "engine" | "body" | "diagnostic";

type LocationStatus = "idle" | "pending" | "ok" | "denied";

type Draft = {
  service: ServiceId | "";
  complaint: string;
  needsTow: boolean | null;
  location: { lat: number; lng: number } | null;
  locationStatus: LocationStatus;
  date: string;
  time: string;
  flexible: boolean;
  note: string;
  name: string;
  phone: string;
  plate: string;
};

const empty: Draft = {
  service: "",
  complaint: "",
  needsTow: null,
  location: null,
  locationStatus: "idle",
  date: "",
  time: "",
  flexible: false,
  note: "",
  name: "",
  phone: "",
  plate: "",
};

const serviceIcons: Record<ServiceId, LucideIcon> = {
  periodic: Wrench,
  engine: Cog,
  body: CarFront,
  diagnostic: ScanSearch,
};

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function todayIso() {
  const now = new Date();
  return isoDate(now.getFullYear(), now.getMonth(), now.getDate());
}

function monthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = Array.from({ length: offset }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function stepMessage(step: number, draft: Draft, copy: WizardCopy) {
  const steps = copy.steps;
  if (step === 1 && !draft.service) return steps.service.error;
  if (step === 2 && draft.complaint.trim().length < 8) return steps.complaint.error;
  if (step === 3 && draft.needsTow === null) return steps.tow.error;
  if (step === 4 && !draft.flexible && (!draft.date || !draft.time)) return steps.schedule.error;
  if (step === 5) {
    if (draft.name.trim().length < 2) return steps.details.errors.name;
    const count = digits(draft.phone).length;
    if (count < 10 || count > 13) return steps.details.errors.phone;
    const plate = draft.plate.trim().toLocaleUpperCase("tr-TR");
    if (!/^\d{2}\s?[A-ZÇĞİÖŞÜ]{1,3}\s?\d{2,4}$/.test(plate)) return steps.details.errors.plate;
  }
  return "";
}

export function AppointmentWizard({ copy, lang }: { copy: WizardCopy; lang: string }) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(empty);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const locale = lang === "en" ? "en-GB" : "tr-TR";
  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(cursor);
  const cells = useMemo(
    () => monthCells(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  );
  const pills = draft.service ? copy.steps.complaint.pills[draft.service] : copy.steps.complaint.pills.engine;
  const progress = copy.progress.replace("{current}", String(step));

  function patch(partial: Partial<Draft>) {
    setDraft((current) => ({ ...current, ...partial }));
    setError("");
  }

  function togglePill(pill: string) {
    setDraft((current) => {
      const has = current.complaint.includes(pill);
      const complaint = has
        ? current.complaint
            .replace(pill, "")
            .replace(/\s+,/g, ",")
            .replace(/,\s*,/g, ", ")
            .replace(/^[,\s]+|[,\s]+$/g, "")
            .replace(/\s{2,}/g, " ")
        : current.complaint.trim()
          ? `${current.complaint.trim()}, ${pill}`
          : pill;
      return { ...current, complaint };
    });
    setError("");
  }

  function chooseTow(needsTow: boolean) {
    setError("");
    if (!needsTow) {
      setDraft((current) => ({
        ...current,
        needsTow: false,
        location: null,
        locationStatus: "idle",
      }));
      return;
    }
    setDraft((current) => ({ ...current, needsTow: true, locationStatus: "pending" }));
    if (!navigator.geolocation) {
      setDraft((current) => (current.needsTow ? { ...current, locationStatus: "denied" } : current));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDraft((current) =>
          current.needsTow
            ? {
                ...current,
                location: { lat: position.coords.latitude, lng: position.coords.longitude },
                locationStatus: "ok",
              }
            : current,
        );
      },
      () => {
        setDraft((current) => (current.needsTow ? { ...current, locationStatus: "denied" } : current));
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  function goNext() {
    const message = stepMessage(step, draft, copy);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep((current) => Math.min(5, current + 1));
  }

  async function submit() {
    const message = stepMessage(5, draft, copy);
    if (message) {
      setError(message);
      return;
    }
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSending(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8">
        <CheckCircle2 className="size-8 text-[#FF5A00]" />
        <h2 className="mt-4 font-display text-4xl uppercase text-white">{copy.successTitle}</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">{copy.successText}</p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setDraft(empty);
            setStep(1);
            setError("");
          }}
          className="mt-6 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-[#FF5A00]"
        >
          {copy.another}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF5A00]">{progress}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800" aria-hidden>
        <motion.div
          className="h-full bg-[#FF5A00]"
          initial={false}
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="relative mt-8 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 ? (
              <ServiceStep
                copy={copy.steps.service}
                selected={draft.service}
                onSelect={(service) =>
                  patch({
                    service,
                    complaint: draft.service === service ? draft.complaint : "",
                  })
                }
              />
            ) : null}
            {step === 2 ? (
              <ComplaintStep
                copy={copy.steps.complaint}
                complaint={draft.complaint}
                pills={pills}
                onChange={(complaint) => patch({ complaint })}
                onPill={togglePill}
              />
            ) : null}
            {step === 3 ? <TowStep copy={copy.steps.tow} draft={draft} onChoose={chooseTow} /> : null}
            {step === 4 ? (
              <ScheduleStep
                copy={copy.steps.schedule}
                draft={draft}
                monthLabel={monthLabel}
                cells={cells}
                year={cursor.getFullYear()}
                month={cursor.getMonth()}
                onPrev={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                onNext={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                onDate={(date) => patch({ date })}
                onTime={(time) => patch({ time })}
                onFlexible={(flexible) => patch({ flexible })}
                onNote={(note) => patch({ note })}
              />
            ) : null}
            {step === 5 ? (
              <DetailsStep
                copy={copy.steps.details}
                draft={draft}
                sending={sending}
                onName={(name) => patch({ name })}
                onPhone={(phone) => patch({ phone })}
                onPlate={(plate) => patch({ plate: plate.toLocaleUpperCase("tr-TR") })}
                onSubmit={submit}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

      <div className={cn("mt-6 flex items-center gap-3", step === 5 ? "justify-start" : "justify-between")}>
        {step > 1 ? (
          <button
            type="button"
            onClick={() => {
              setError("");
              setStep((current) => current - 1);
            }}
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#FF5A00]"
          >
            {copy.back}
          </button>
        ) : (
          <span />
        )}
        {step < 5 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-[#FF5A00] px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-[#ff6a1a]"
          >
            {copy.next}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ServiceStep({
  copy,
  selected,
  onSelect,
}: {
  copy: WizardCopy["steps"]["service"];
  selected: string;
  onSelect: (id: ServiceId) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl uppercase leading-none text-white md:text-4xl">{copy.question}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {copy.options.map((option) => {
          const id = option.id as ServiceId;
          const Icon = serviceIcons[id] ?? Wrench;
          const active = selected === id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(id)}
              className={cn(
                "flex gap-4 rounded-2xl border bg-zinc-950 p-5 text-left transition",
                active
                  ? "border-[#FF5A00] shadow-[0_0_28px_rgba(255,90,0,0.28)]"
                  : "border-white/10 hover:border-white/25",
              )}
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-xl",
                  active ? "bg-[#FF5A00] text-zinc-950" : "bg-zinc-900 text-[#FF5A00]",
                )}
              >
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block font-display text-2xl uppercase text-white">{option.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-zinc-400">{option.text}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ComplaintStep({
  copy,
  complaint,
  pills,
  onChange,
  onPill,
}: {
  copy: WizardCopy["steps"]["complaint"];
  complaint: string;
  pills: string[];
  onChange: (value: string) => void;
  onPill: (pill: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl uppercase leading-none text-white md:text-4xl">{copy.question}</h2>
      <textarea
        value={complaint}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        placeholder={copy.placeholder}
        className="mt-6 w-full resize-y rounded-2xl border border-white/10 bg-zinc-950 px-4 py-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#FF5A00]"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {pills.map((pill) => {
          const active = complaint.includes(pill);
          return (
            <button
              key={pill}
              type="button"
              onClick={() => onPill(pill)}
              className={cn(
                "rounded-full border px-3 py-2 text-sm transition",
                active
                  ? "border-[#FF5A00] bg-[#FF5A00] text-zinc-950"
                  : "border-white/15 bg-zinc-950 text-zinc-200 hover:border-[#FF5A00]/70",
              )}
            >
              {pill}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TowStep({
  copy,
  draft,
  onChoose,
}: {
  copy: WizardCopy["steps"]["tow"];
  draft: Draft;
  onChoose: (needsTow: boolean) => void;
}) {
  const status =
    draft.locationStatus === "pending"
      ? copy.locating
      : draft.locationStatus === "ok"
        ? copy.located
        : draft.locationStatus === "denied"
          ? copy.locationDenied
          : "";

  return (
    <div>
      <h2 className="font-display text-3xl uppercase leading-none text-white md:text-4xl">{copy.question}</h2>
      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={() => onChoose(true)}
          className={cn(
            "rounded-2xl border px-5 py-6 text-left transition",
            draft.needsTow === true
              ? "border-[#FF5A00] bg-zinc-950 shadow-[0_0_28px_rgba(255,90,0,0.28)]"
              : "border-white/10 bg-zinc-950 hover:border-white/25",
          )}
        >
          <span className="flex items-center gap-3 font-display text-2xl uppercase text-white">
            <MapPin className="size-5 text-[#FF5A00]" />
            {copy.needTow}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onChoose(false)}
          className={cn(
            "rounded-2xl border px-5 py-6 text-left font-display text-2xl uppercase text-white transition",
            draft.needsTow === false
              ? "border-[#FF5A00] bg-zinc-950 shadow-[0_0_28px_rgba(255,90,0,0.28)]"
              : "border-white/10 bg-zinc-950 hover:border-white/25",
          )}
        >
          {copy.self}
        </button>
      </div>
      {draft.needsTow && status ? <p className="mt-4 text-sm text-zinc-400">{status}</p> : null}
    </div>
  );
}

function ScheduleStep({
  copy,
  draft,
  monthLabel,
  cells,
  year,
  month,
  onPrev,
  onNext,
  onDate,
  onTime,
  onFlexible,
  onNote,
}: {
  copy: WizardCopy["steps"]["schedule"];
  draft: Draft;
  monthLabel: string;
  cells: Array<number | null>;
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onDate: (date: string) => void;
  onTime: (time: string) => void;
  onFlexible: (value: boolean) => void;
  onNote: (value: string) => void;
}) {
  const today = todayIso();
  const now = new Date();
  const canGoPrev = isoDate(year, month, 1) > isoDate(now.getFullYear(), now.getMonth(), 1);

  return (
    <div>
      <h2 className="font-display text-3xl uppercase leading-none text-white md:text-4xl">{copy.question}</h2>
      <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-4">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canGoPrev}
            aria-label={copy.prevMonth}
            className="grid size-9 place-items-center rounded-full border border-white/10 text-white disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <p className="font-display text-xl uppercase tracking-wide text-white">{monthLabel}</p>
          <button
            type="button"
            onClick={onNext}
            aria-label={copy.nextMonth}
            className="grid size-9 place-items-center rounded-full border border-white/10 text-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
          {copy.weekdays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {cells.map((day, index) => {
            if (!day) return <span key={`empty-${index}`} />;
            const value = isoDate(year, month, day);
            const past = value < today;
            const active = draft.date === value;
            return (
              <button
                key={value}
                type="button"
                disabled={past}
                onClick={() => onDate(value)}
                className={cn(
                  "grid h-10 place-items-center rounded-xl text-sm transition",
                  active
                    ? "bg-[#FF5A00] font-semibold text-zinc-950"
                    : "text-white hover:bg-zinc-900",
                  past && "cursor-not-allowed text-zinc-700 hover:bg-transparent",
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{copy.timeLabel}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {copy.slots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => onTime(slot)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition",
              draft.time === slot
                ? "border-[#FF5A00] bg-[#FF5A00] text-zinc-950"
                : "border-white/15 text-zinc-200 hover:border-[#FF5A00]/70",
            )}
          >
            {slot}
          </button>
        ))}
      </div>
      <label className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-200">
        <input
          type="checkbox"
          checked={draft.flexible}
          onChange={(event) => onFlexible(event.target.checked)}
          className="mt-0.5 size-4 accent-[#FF5A00]"
        />
        {copy.flexible}
      </label>
      <label className="mt-4 block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{copy.note}</span>
        <textarea
          value={draft.note}
          onChange={(event) => onNote(event.target.value)}
          rows={3}
          placeholder={copy.notePlaceholder}
          className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#FF5A00]"
        />
      </label>
    </div>
  );
}

function DetailsStep({
  copy,
  draft,
  sending,
  onName,
  onPhone,
  onPlate,
  onSubmit,
}: {
  copy: WizardCopy["steps"]["details"];
  draft: Draft;
  sending: boolean;
  onName: (value: string) => void;
  onPhone: (value: string) => void;
  onPlate: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl uppercase leading-none text-white md:text-4xl">{copy.title}</h2>
      <div className="mt-6 grid gap-5">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{copy.name}</span>
          <input
            value={draft.name}
            onChange={(event) => onName(event.target.value)}
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#FF5A00]"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{copy.phone}</span>
          <input
            value={draft.phone}
            onChange={(event) => onPhone(event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#FF5A00]"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF5A00]">{copy.plate}</span>
          <input
            value={draft.plate}
            onChange={(event) => onPlate(event.target.value)}
            autoCapitalize="characters"
            spellCheck={false}
            aria-describedby="plate-hint"
            className="mt-2 w-full rounded-2xl border border-[#FF5A00]/60 bg-zinc-950 px-4 py-4 text-center font-display text-3xl uppercase tracking-[0.28em] text-white outline-none transition focus:border-[#FF5A00] focus:shadow-[0_0_32px_rgba(255,90,0,0.35)]"
          />
          <span id="plate-hint" className="mt-2 block text-xs leading-relaxed text-zinc-400">
            {copy.plateHint}
          </span>
        </label>
        <button
          type="button"
          disabled={sending}
          onClick={onSubmit}
          className="mt-2 w-full rounded-2xl bg-[#FF5A00] px-6 py-4 font-display text-2xl uppercase tracking-wide text-zinc-950 shadow-[0_0_32px_rgba(255,90,0,0.45)] transition hover:shadow-[0_0_48px_rgba(255,90,0,0.75)] disabled:opacity-60"
        >
          {sending ? copy.sending : copy.submit}
        </button>
      </div>
    </div>
  );
}
