"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ServiceTabs({
  categories,
  activeCategory,
  label,
  onChange,
  align = "center",
  layoutId = "service-category-pill",
  panelId = "service-grid",
}: {
  categories: { id: string; label: string }[];
  activeCategory: string;
  label: string;
  onChange: (id: string) => void;
  align?: "center" | "start";
  layoutId?: string;
  panelId?: string;
}) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", align === "start" ? "justify-start" : "justify-center")}
      role="tablist"
      aria-label={label}
    >
      {categories.map((category) => {
        const active = category.id === activeCategory;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            id={`service-tab-${category.id}`}
            aria-selected={active}
            aria-controls={panelId}
            onClick={() => onChange(category.id)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap",
              active ? "text-white" : "bg-zinc-900 text-zinc-400 hover:text-zinc-200",
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-[#FF5A00]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative z-10">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
