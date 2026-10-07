"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import type { Dictionary } from "@/lib/types";

type Stat = Dictionary["about"]["stats"]["items"][number];

function Counter({
  stat,
  locale,
}: {
  stat: Stat;
  locale: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) =>
    Math.round(latest).toLocaleString(locale === "tr" ? "tr-TR" : "en-US"),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, stat.value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, stat.value, value]);

  return (
    <span ref={ref} className="font-display text-5xl text-[#FF5A00] md:text-6xl">
      {stat.prefix}
      <motion.span>{rounded}</motion.span>
      {stat.suffix}
    </span>
  );
}

export function StatsSection({
  stats,
  locale,
}: {
  stats: Dictionary["about"]["stats"];
  locale: string;
}) {
  return (
    <section className="bg-zinc-900">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF5A00]">{stats.eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">{stats.title}</h2>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
          {stats.items.map((stat) => (
            <div key={stat.label} className="bg-zinc-950 px-5 py-8">
              <dt>
                <Counter stat={stat} locale={locale} />
              </dt>
              <dd className="mt-3 text-sm text-zinc-400">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
