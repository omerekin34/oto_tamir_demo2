"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { Dictionary } from "@/lib/types";

const SLIDE_INTERVAL_MS = 5000;

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=2400&q=80",
    alt: "Açık motor kapağı üzerinde çalışan usta",
  },
  {
    src: "https://images.unsplash.com/photo-1723099971299-3789db53604c?auto=format&fit=crop&w=2400&q=80",
    alt: "Kaputu açık, garajda yükselen araç",
  },
  {
    src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=2400&q=80",
    alt: "Karanlık atölyede motor başında anahtarla çalışan usta",
  },
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2400&q=80",
    alt: "Motor kayışı, kasnak ve alternatör yakın planı",
  },
  {
    src: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=2400&q=80",
    alt: "Floresan ışık altındaki karanlık garaj",
  },
] as const;

export function Hero({
  hero,
  primaryHref,
  secondaryHref,
}: {
  hero: Dictionary["home"]["hero"];
  primaryHref: string;
  secondaryHref: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const slide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    HERO_SLIDES.forEach((item) => {
      const preload = new window.Image();
      preload.src = item.src;
    });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-zinc-950">
      <motion.div aria-hidden="true" style={{ y }} className="pointer-events-none absolute inset-0 z-0 scale-110">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-zinc-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/45" />
      </motion.div>
      <div className="tech-grid pointer-events-none absolute inset-0 z-10 opacity-40" />
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-5 pt-16 pb-20 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-6xl leading-none font-semibold uppercase text-white sm:text-7xl lg:text-8xl">
            {hero.title}
            <span className="block font-black text-[#FF5A00]">{hero.highlight}</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-300">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-500"
            >
              {hero.primary}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-ember hover:text-ember"
            >
              {hero.secondary}
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {hero.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs tracking-wide text-zinc-300 backdrop-blur-sm"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
