"use client";

import { useEffect, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, ShieldCheck, Timer, Wrench } from "lucide-react";
import type { Dictionary } from "@/lib/types";

const icons = [ShieldCheck, Timer, Wrench, Cpu];

function Counter({
  value,
  suffix,
  locale,
}: {
  value: number;
  suffix: string;
  locale: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString(locale === "tr" ? "tr-TR" : "en-US")}
      {suffix}
    </span>
  );
}

export function StatsBand({
  why,
  locale,
}: {
  why: Dictionary["home"]["why"];
  locale: string;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">{why.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">
            {why.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">{why.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {why.points.map((point, index) => {
            const Icon = icons[index] ?? Wrench;
            return (
              <article key={point.title} className="rounded-2xl border border-white/10 bg-panel p-5">
                <Icon className="size-5 text-ember" />
                <h3 className="mt-4 font-display text-2xl uppercase text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{point.text}</p>
              </article>
            );
          })}
        </div>
      </div>
      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
        {why.stats.map((stat) => (
          <div key={stat.label} className="bg-ink px-5 py-8">
            <dt className="font-display text-4xl text-ember md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} locale={locale} />
            </dt>
            <dd className="mt-2 text-sm text-zinc-400">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
