"use client";

import { MotionConfig } from "framer-motion";
import { CategoryNavigation } from "@/components/services/CategoryNavigation";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import type { ServiceTabCategory } from "@/lib/services";

export function ServicesBoard({
  lang,
  categories,
  tabsLabel,
  prevLabel,
  nextLabel,
  nextCue,
  restartLabel,
  progressLabel,
}: {
  lang: string;
  categories: ServiceTabCategory[];
  tabsLabel: string;
  prevLabel: string;
  nextLabel: string;
  nextCue: string;
  restartLabel: string;
  progressLabel: string;
}) {
  const tabNames = categories.map((category) => category.label);
  const allServices = categories.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.label,
    })),
  );

  if (tabNames.length === 0) return null;

  return (
    <MotionConfig reducedMotion="user">
      <CategoryNavigation
        lang={lang}
        categories={tabNames}
        tabsLabel={tabsLabel}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        nextCue={nextCue}
        restartLabel={restartLabel}
        progressLabel={progressLabel}
        idPrefix="services"
      >
        {(activeTabIndex) => (
          <ServiceGrid
            lang={lang}
            categoryId={categories[activeTabIndex]?.id ?? "services"}
            allServices={allServices}
            categories={tabNames}
            activeTabIndex={activeTabIndex}
          />
        )}
      </CategoryNavigation>
    </MotionConfig>
  );
}
