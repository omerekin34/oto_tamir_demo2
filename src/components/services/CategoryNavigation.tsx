"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function upper(value: string, lang: string) {
  return value.toLocaleUpperCase(lang === "en" ? "en" : "tr");
}

export function CategoryNavigation({
  lang,
  categories,
  tabsLabel,
  prevLabel,
  nextLabel,
  nextCue,
  restartLabel,
  progressLabel,
  idPrefix,
  children,
}: {
  lang: string;
  categories: string[];
  tabsLabel: string;
  prevLabel: string;
  nextLabel: string;
  nextCue: string;
  restartLabel: string;
  progressLabel: string;
  idPrefix: string;
  children: (activeTabIndex: number) => ReactNode;
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const lastIndex = Math.max(categories.length - 1, 0);
  const index = Math.min(activeTabIndex, lastIndex);
  const activeLabel = categories[index] ?? "";
  const upcomingLabel = index >= lastIndex ? restartLabel : (categories[index + 1] ?? restartLabel);
  const panelId = `${idPrefix}-panel`;

  function go(target: number, focusTab = false) {
    if (target < 0 || target > lastIndex || target === index) return;
    setActiveTabIndex(target);
    if (!focusTab) return;
    requestAnimationFrame(() => {
      document.getElementById(`${idPrefix}-tab-${target}`)?.focus();
    });
  }

  if (categories.length === 0) return null;

  return (
    <div>
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label={tabsLabel}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(index + 1, true);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(index - 1, true);
          }
        }}
      >
        {categories.map((label, tabIndex) => {
          const active = tabIndex === index;
          return (
            <button
              key={`${idPrefix}-${tabIndex}`}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${tabIndex}`}
              aria-selected={active}
              aria-controls={panelId}
              tabIndex={active ? 0 : -1}
              onClick={() => go(tabIndex)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                active ? "bg-[#FF5A00] text-white" : "bg-zinc-900 text-zinc-400 hover:text-zinc-200",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="shrink-0">
          <p className="text-sm font-bold uppercase tracking-widest text-[#FF5A00]">{upper(activeLabel, lang)}</p>
          <p className="mt-1 text-xs text-zinc-400">
            <span className="uppercase tracking-widest">{upper(nextCue, lang)} : </span>
            <span className="text-white">{upcomingLabel}</span>
          </p>
        </div>

        <div className="flex min-w-48 flex-1 gap-1.5" role="group" aria-label={progressLabel}>
          {categories.map((label, tabIndex) => (
            <button
              key={`${idPrefix}-progress-${tabIndex}`}
              type="button"
              aria-label={label}
              aria-current={tabIndex === index ? "step" : undefined}
              onClick={() => go(tabIndex)}
              className="flex h-4 min-w-0 flex-1 items-center"
            >
              <span
                className={cn(
                  "h-1 w-full rounded-full transition-colors",
                  tabIndex === index ? "bg-[#FF5A00]" : tabIndex < index ? "bg-[#FF5A00]/40" : "bg-zinc-800",
                )}
              />
            </button>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="inline-flex items-center gap-1 rounded-full bg-transparent px-4 py-1.5 text-sm font-medium text-zinc-300 transition hover:text-white disabled:pointer-events-none disabled:opacity-50"
          >
            <ChevronLeft className="size-4" aria-hidden />
            {prevLabel}
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index >= lastIndex}
            className="inline-flex items-center gap-1 rounded-full bg-[#FF5A00] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:pointer-events-none disabled:opacity-50"
          >
            {nextLabel}
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${index}`} className="mt-8">
        {children(index)}
      </div>
    </div>
  );
}
