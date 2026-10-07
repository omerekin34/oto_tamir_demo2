export function PartnerMarquee({ title, brands }: { title: string; brands: string[] }) {
  const line = [...brands, ...brands];

  return (
    <section className="border-y border-white/10 bg-black py-8">
      <p className="px-5 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        {title}
      </p>
      <div className="mt-5 overflow-hidden">
        <div className="motion-safe-marquee flex w-max animate-marquee gap-12 px-6">
          {line.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="font-display text-3xl uppercase tracking-[0.18em] text-zinc-500"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
