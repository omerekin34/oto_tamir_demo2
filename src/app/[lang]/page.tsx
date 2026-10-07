import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { InteractiveAnatomy } from "@/components/home/InteractiveAnatomy";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { StatsBand } from "@/components/home/StatsBand";
import { WorkshopBoard } from "@/components/home/WorkshopBoard";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";
import { getPageDictionary } from "@/lib/dictionary";
import { routes } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  const hrefs = routes(lang);

  return (
    <main>
      <Hero hero={dict.home.hero} primaryHref={hrefs.appointment} secondaryHref={hrefs.services} />
      <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">
              {dict.home.servicesEyebrow}
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">
              {dict.home.servicesTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">{dict.home.servicesSubtitle}</p>
          </div>
          <Link href={hrefs.services} className="text-sm font-semibold text-ember hover:text-orange-300">
            {dict.home.servicesCta}
          </Link>
        </div>
        <WorkshopBoard
          lang={lang}
          categories={dict.services.categories.map((category) => ({
            id: category.id,
            label: category.label,
            items: category.items.map((item) => ({
              slug: item.slug,
              title: item.title,
              description: item.description,
              iconName: item.iconName,
              image: item.image,
              imageAlt: item.imageAlt,
              duration: item.content.duration,
              category: category.label,
            })),
          }))}
          tabsLabel={dict.services.tabsLabel}
          prevLabel={dict.home.servicesPrev}
          nextLabel={dict.home.servicesNext}
          progressLabel={dict.home.servicesProgress}
          nextCue={dict.home.servicesNextCue}
          restartLabel={dict.home.servicesRestart}
        />
      </section>
      <InteractiveAnatomy lang={lang} />
      <StatsBand why={dict.home.why} locale={lang} />
      <div className="pb-20">
        <TestimonialSlider block={dict.home.testimonials} />
      </div>
      <PartnerMarquee title={dict.home.partners.title} brands={dict.partners} />
      <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
        <div className="overflow-hidden rounded-3xl border border-ember/30 bg-zinc-900 p-12 md:py-16">
          <h2 className="max-w-3xl font-display text-4xl uppercase leading-none text-white md:text-6xl">
            {dict.home.cta.title}
          </h2>
          <p className="mt-4 max-w-xl text-zinc-300">{dict.home.cta.text}</p>
          <Link
            href={hrefs.appointment}
            className="mt-8 inline-flex rounded-full bg-ember px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_15px_rgba(255,90,0,0.5)] transition-shadow duration-300 hover:bg-orange-500 hover:shadow-[0_0_25px_rgba(255,90,0,0.8)]"
          >
            {dict.home.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
