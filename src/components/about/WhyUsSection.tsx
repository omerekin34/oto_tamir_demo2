"use client";

import { motion } from "framer-motion";
import { LifeBuoy, Package, Receipt, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/lib/types";

const icons: Record<string, LucideIcon> = {
  Package,
  ShieldCheck,
  LifeBuoy,
  Receipt,
  Wrench,
};

export function WhyUsSection({ why }: { why: Dictionary["about"]["why"] }) {
  return (
    <section className="bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF5A00]">{why.eyebrow}</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl uppercase leading-none text-white md:text-6xl">
          {why.title}
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-400">{why.subtitle}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((item) => {
            const Icon = icons[item.icon] ?? Wrench;
            return (
              <motion.article
                key={item.title}
                initial="rest"
                whileHover="hover"
                className="rounded-2xl border border-white/10 bg-zinc-900 p-6 transition duration-300 hover:border-[#FF5A00]"
              >
                <motion.div
                  variants={{
                    rest: { y: 0 },
                    hover: { y: [0, -8, -2] },
                  }}
                  transition={{ duration: 0.35 }}
                  className="grid size-12 place-items-center rounded-xl border border-white/10 bg-zinc-950 text-[#FF5A00]"
                >
                  <Icon className="size-5" />
                </motion.div>
                <h3 className="mt-5 font-display text-2xl uppercase text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
