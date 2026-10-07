"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CategoryNavigation } from "@/components/services/CategoryNavigation";
import { ServiceCard } from "@/components/services/ServiceCard";

export type WorkshopService = {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  image?: string;
  imageAlt?: string;
  duration?: string;
  category: string;
};

export type WorkshopCategory = {
  id: string;
  label: string;
  items: WorkshopService[];
};

export function WorkshopBoard({
  lang,
  categories,
  tabsLabel,
  prevLabel,
  nextLabel,
  progressLabel,
  nextCue,
  restartLabel,
}: {
  lang: string;
  categories: WorkshopCategory[];
  tabsLabel: string;
  prevLabel: string;
  nextLabel: string;
  progressLabel: string;
  nextCue: string;
  restartLabel: string;
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
      <div className="mt-8">
        <CategoryNavigation
          lang={lang}
          categories={tabNames}
          tabsLabel={tabsLabel}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          nextCue={nextCue}
          restartLabel={restartLabel}
          progressLabel={progressLabel}
          idPrefix="workshop"
        >
          {(activeTabIndex) => {
            const filteredServices = allServices.filter(
              (service) => service.category === tabNames[activeTabIndex],
            );

            return (
              <AnimatePresence mode="wait">
                <motion.div
                  key={tabNames[activeTabIndex] ?? activeTabIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map((item) => (
                      <ServiceCard
                        key={item.slug}
                        lang={lang}
                        service={{
                          slug: item.slug,
                          title: item.title,
                          description: item.description,
                          iconName: item.iconName,
                          image: item.image ?? "",
                          imageAlt: item.imageAlt || item.title,
                          duration: item.duration,
                          category: item.category,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            );
          }}
        </CategoryNavigation>
      </div>
    </MotionConfig>
  );
}
