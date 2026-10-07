import type { Metadata } from "next";
import { AppointmentFade } from "@/components/appointment/AppointmentFade";
import { AppointmentWizard } from "@/components/appointment/AppointmentWizard";
import { getPageDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  return {
    title: dict.appointment.metaTitle,
    description: dict.appointment.metaDescription,
  };
}

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  const copy = dict.appointment;

  return (
    <AppointmentFade>
      <div className="mx-auto grid w-full max-w-7xl items-start gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:gap-16">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FF5A00]">{copy.eyebrow}</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.92] text-white md:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">{copy.subtitle}</p>
          <div className="mt-8">
            <AppointmentWizard copy={copy.wizard} lang={lang} />
          </div>
        </section>

        <section className="pb-10 lg:pt-2">
          <h2 className="font-display text-4xl uppercase leading-none text-white md:text-5xl">{copy.workshop}</h2>
          <div className="mt-5 space-y-1 text-sm leading-relaxed text-zinc-300">
            <p>{copy.addressLine1}</p>
            <p>{copy.addressLine2}</p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">{copy.hours}</p>
          <div className="relative mt-8 h-[460px] overflow-hidden rounded-xl bg-zinc-900">
            <iframe
              title={copy.mapTitle}
              src="https://maps.google.com/maps?q=Maslak%20Sariyer%20Istanbul&z=14&output=embed"
              className="map-frame h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-zinc-950/40" />
          </div>
        </section>
      </div>
    </AppointmentFade>
  );
}
