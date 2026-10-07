"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Dictionary } from "@/lib/types";

export function TestimonialSlider({
  block,
}: {
  block: Dictionary["home"]["testimonials"];
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function slide(direction: number) {
    const node = scroller.current;
    if (!node) return;
    const amount = node.clientWidth * 0.85 * direction;
    node.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 md:px-8">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">
            {block.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">
            {block.title}
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label={block.prev}
            onClick={() => slide(-1)}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-ember hover:text-ember"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label={block.next}
            onClick={() => slide(1)}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-ember hover:text-ember"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {block.items.map((item) => (
          <article
            key={item.name}
            className="min-w-[86%] snap-start rounded-2xl border border-white/10 bg-panel p-6 md:min-w-[46%] lg:min-w-[32%]"
          >
            <div className="flex gap-1 text-ember" aria-label={`${item.stars}/5`}>
              {Array.from({ length: item.stars }).map((_, index) => (
                <Star key={index} className="size-4 fill-ember" />
              ))}
            </div>
            <p className="mt-5 text-base leading-relaxed text-zinc-200">“{item.text}”</p>
            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="font-display text-xl uppercase text-white">{item.name}</p>
              <p className="mt-1 text-sm text-zinc-400">
                {item.role} · {item.city}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
