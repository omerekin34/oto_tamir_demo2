import type { Metadata } from "next";
import Image from "next/image";
import { ServicesBoard } from "@/components/services/ServicesBoard";
import { getPageDictionary } from "@/lib/dictionary";
import { toTabCategories } from "@/lib/services";
import { BLUR_DATA_URL } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  return { title: dict.services.title, description: dict.services.subtitle };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  const seo = dict.services.seo;

  return (
    <main>
      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">{dict.services.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl uppercase leading-none text-white md:text-7xl">
          {dict.services.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{dict.services.subtitle}</p>
        <div className="mt-10">
          <ServicesBoard
            lang={lang}
            tabsLabel={dict.services.tabsLabel}
            prevLabel={dict.services.prev}
            nextLabel={dict.services.next}
            nextCue={dict.services.nextCue}
            restartLabel={dict.services.restart}
            progressLabel={dict.services.progress}
            categories={toTabCategories(dict.services.categories)}
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-20 md:px-8 lg:grid-cols-2 lg:pb-28">
        <div>
          <h2 className="font-display text-4xl uppercase leading-none text-white md:text-6xl">{seo.title}</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            {seo.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-800">
          <Image
            src={seo.image}
            alt={seo.imageAlt}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>
      </section>
    </main>
  );
}
