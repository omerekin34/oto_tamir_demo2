"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ServiceCard } from "@/components/services/ServiceCard";
import type { ServiceCardData } from "@/lib/services";
import { cn } from "@/lib/utils";

function gridClass(count: number) {
  return cn("grid gap-4", count === 1 ? "mx-auto w-full max-w-md" : "sm:grid-cols-2 xl:grid-cols-3");
}

export function ServiceGrid({
  lang,
  categoryId,
  allServices,
  categories,
  activeTabIndex,
}: {
  lang: string;
  categoryId: string;
  allServices: ServiceCardData[];
  categories: string[];
  activeTabIndex: number;
}) {
  const filteredServices = allServices.filter((service) => service.category === categories[activeTabIndex]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryId}
        className={gridClass(filteredServices.length)}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
          exit: { transition: { duration: 0.12 } },
        }}
      >
        {filteredServices.map((item) => (
          <motion.div
            key={item.slug}
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
              exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
            }}
          >
            <ServiceCard lang={lang} service={item} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
