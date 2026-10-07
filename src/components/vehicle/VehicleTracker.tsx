"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ClipboardCheck, Droplets, KeyRound, ScanSearch, Search, Wrench, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/lib/types";
import { cn } from "@/lib/utils";

type VehicleCopy = Dictionary["vehicle"];
type StepState = "done" | "active" | "waiting";

const STEP_ICONS: LucideIcon[] = [ClipboardCheck, ScanSearch, Wrench, Droplets, KeyRound];

function stepState(index: number): StepState {
  if (index < 2) return "done";
  if (index === 2) return "active";
  return "waiting";
}

export function VehicleTracker({ copy }: { copy: VehicleCopy }) {
  const [query, setQuery] = useState("");
  const [plate, setPlate] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [searchKey, setSearchKey] = useState(0);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim().toUpperCase() || copy.placeholder;
    setPlate(next);
    setIsSearched(true);
    setSearchKey((current) => current + 1);
  }

  return (
    <div className="mt-10 w-full">
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="flex h-[4.75rem] min-w-0 flex-1 overflow-hidden rounded-2xl bg-zinc-100 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <span className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center bg-[#003399] text-white">
            <span aria-hidden className="text-[10px] leading-none">
              ★
            </span>
            <span className="mt-1 font-display text-2xl font-bold leading-none tracking-wide">TR</span>
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value.toUpperCase())}
            placeholder={copy.placeholder}
            aria-label={copy.searchLabel}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent px-4 font-display text-2xl uppercase tracking-[0.16em] text-zinc-950 outline-none placeholder:text-zinc-400 md:px-5 md:text-3xl md:tracking-[0.2em]"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#FF5A00] px-8 font-display text-2xl uppercase tracking-wide text-zinc-950 transition hover:shadow-[0_0_15px_rgba(255,90,0,0.6)] sm:h-auto"
        >
          <Search className="size-5" strokeWidth={2.4} />
          {copy.submit}
        </button>
      </form>

      <AnimatePresence>
        {isSearched ? (
          <motion.section
            key={searchKey}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
            className="mt-12 w-full max-w-3xl rounded-2xl bg-zinc-900 p-8"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF5A00]">{copy.panelEyebrow}</p>
                <p className="mt-2 font-display text-4xl uppercase leading-none tracking-wide text-white md:text-5xl">{plate}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-display text-2xl uppercase tracking-wide text-white">{copy.vehicleName}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {copy.workOrderLabel} {copy.workOrder}
                </p>
              </div>
            </div>

            <ol className="mt-8">
              {copy.steps.map((step, index) => {
                const state = stepState(index);
                const Icon = STEP_ICONS[index] ?? ClipboardCheck;
                const isLast = index === copy.steps.length - 1;
                const status =
                  state === "done" ? copy.statusDone : state === "active" ? copy.statusActive : copy.statusWaiting;

                return (
                  <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {isLast ? null : (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute top-10 bottom-0 left-5 w-px -translate-x-1/2",
                          index < 2 ? "bg-[#FF5A00]/80" : "bg-zinc-700",
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 grid size-10 shrink-0 place-items-center rounded-full",
                        state === "done" && "bg-emerald-500 text-zinc-950",
                        state === "active" && "bg-[#FF5A00] text-zinc-950",
                        state === "waiting" && "bg-zinc-800 text-zinc-500 ring-1 ring-white/10",
                      )}
                    >
                      {state === "active" ? (
                        <span className="absolute inset-0 animate-ping rounded-full bg-[#FF5A00]/50" />
                      ) : null}
                      {state === "done" ? (
                        <Check className="size-5" strokeWidth={2.6} />
                      ) : (
                        <Icon className={cn("relative size-5", state === "active" && "animate-pulse")} strokeWidth={2.2} />
                      )}
                    </span>
                    <div className="min-w-0 pt-1">
                      <p
                        className={cn(
                          "text-[11px] font-semibold uppercase tracking-[0.22em]",
                          state === "done" && "text-emerald-400",
                          state === "active" && "text-[#FF5A00]",
                          state === "waiting" && "text-zinc-500",
                        )}
                      >
                        {status}
                      </p>
                      <p className={cn("mt-1 text-base leading-snug md:text-lg", state === "waiting" ? "text-zinc-500" : "text-white")}>
                        {step.title}
                      </p>
                      {step.detail ? <p className="mt-1.5 text-sm text-[#FF5A00]">{step.detail}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
