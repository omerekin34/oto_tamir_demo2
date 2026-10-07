"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Dictionary } from "@/lib/types";

export function TestimonialSection({
  block,
}: {
  block: Dictionary["about"]["testimonials"];
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function slide(direction: number) {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: node.clientWidth * 0.85 * direction, behavior: "smooth" });
  }

  return (
    <section id="yorumlar" className="bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF5A00]">{block.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">{block.title}</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label={block.prev}
              onClick={() => slide(-1)}
              className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#FF5A00] hover:text-[#FF5A00]"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label={block.next}
              onClick={() => slide(1)}
              className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#FF5A00] hover:text-[#FF5A00]"
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
              className="min-w-[86%] snap-start rounded-2xl border border-white/10 bg-zinc-900 p-6 md:min-w-[46%] lg:min-w-[32%]"
            >
              <div className="flex gap-1 text-[#FF5A00]" aria-label={`${item.stars}/5`}>
                {Array.from({ length: item.stars }).map((_, index) => (
                  <Star key={index} className="size-4 fill-[#FF5A00]" />
                ))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-zinc-200">“{item.text}”</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-display text-xl uppercase text-white">{item.name}</p>
                <p className="mt-1 text-sm text-zinc-400">{item.vehicle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
