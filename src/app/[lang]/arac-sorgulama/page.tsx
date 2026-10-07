import type { Metadata } from "next";
import { VehicleTracker } from "@/components/vehicle/VehicleTracker";
import { getPageDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  return { title: dict.vehicle.metaTitle, description: dict.vehicle.metaDescription };
}

export default async function VehicleStatusPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);

  return (
    <main className="bg-zinc-950">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-5 py-16 md:px-8 md:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#FF5A00]">{dict.vehicle.eyebrow}</p>
        <h1 className="mt-3 text-center font-display text-5xl uppercase leading-none text-white md:text-7xl">{dict.vehicle.title}</h1>
        <p className="mt-5 max-w-xl text-center text-base leading-relaxed text-zinc-400">{dict.vehicle.subtitle}</p>
        <VehicleTracker copy={dict.vehicle} />
      </div>
    </main>
  );
}
