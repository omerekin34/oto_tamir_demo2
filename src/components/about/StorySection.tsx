"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { HDImage } from "@/components/ui/HDImageCard";
import type { Dictionary } from "@/lib/types";
import { BLUR_DATA_URL } from "@/lib/utils";

type About = Dictionary["about"];
type Shot = About["gallery"][number];

export function StorySection({ about }: { about: About }) {
  const [shot, setShot] = useState<Shot | null>(null);

  return (
    <section id="hikaye" className="bg-zinc-950">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">{about.eyebrow}</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none text-white md:text-7xl">
            {about.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-200">{about.lead}</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-400">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="group relative min-h-[460px] overflow-hidden rounded-3xl border border-white/10">
          <HDImage src={about.image} alt={about.imageAlt} priority sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 pb-16 md:grid-cols-3 md:px-8">
        {about.gallery.map((item) => (
          <button
            key={item.caption}
            type="button"
            onClick={() => setShot(item)}
            className="group relative min-h-64 overflow-hidden rounded-2xl border border-white/10 text-left"
          >
            <HDImage src={item.image} alt={item.alt} sizes="(min-width: 768px) 30vw, 100vw" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 font-display text-xl uppercase text-white">
              {item.caption}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {shot ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/80 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShot(null)}
          >
            <motion.div
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={shot.image}
                alt={shot.alt}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setShot(null)}
                className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/20 bg-zinc-950/70 text-white"
                aria-label={shot.caption}
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
