import { MapTurkey } from "@/components/ui/MapTurkey";
import type { Dictionary } from "@/lib/types";

export function MapSection({ map }: { map: Dictionary["about"]["map"] }) {
  return (
    <section id="harita" className="bg-zinc-900">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF5A00]">{map.eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">{map.title}</h2>
        <p className="mt-4 max-w-2xl text-zinc-400">{map.subtitle}</p>
        <div className="mt-8">
          <MapTurkey map={map} />
        </div>
      </div>
    </section>
  );
}
