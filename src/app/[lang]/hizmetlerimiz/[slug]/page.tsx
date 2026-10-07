import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import tr from "@/dictionaries/tr.json";
import { ServiceCard, ServiceGlyph } from "@/components/services/ServiceCard";
import { getPageDictionary } from "@/lib/dictionary";
import { locales, routes } from "@/lib/i18n";
import { findService, relatedServices } from "@/lib/services";
import { BLUR_DATA_URL } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    tr.services.categories.flatMap((category) =>
      category.items.map((item) => ({ lang, slug: item.slug })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getPageDictionary(lang);
  const match = findService(dict.services.categories, slug);
  if (!match) return { title: dict.services.title };
  return { title: match.item.title, description: match.item.description };
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  return (
    <Suspense fallback={<ServiceDetailFallback />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

function ServiceDetailFallback() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <div className="h-5 w-32 animate-pulse rounded-full bg-zinc-800" />
      <div className="mt-6 h-[380px] animate-pulse rounded-3xl bg-zinc-900 md:h-[480px]" />
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="h-5 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-zinc-800" />
          <div className="mt-6 h-44 animate-pulse rounded-2xl bg-zinc-900" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-28 animate-pulse rounded-2xl bg-zinc-900" />
            <div className="h-28 animate-pulse rounded-2xl bg-zinc-900" />
          </div>
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-zinc-900" />
      </div>
    </main>
  );
}

async function ServiceDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getPageDictionary(lang);
  const match = findService(dict.services.categories, slug);
  if (!match) notFound();

  const { category, item } = match;
  const copy = dict.services.detail;
  const hrefs = routes(lang);
  const related = relatedServices(dict.services.categories, slug);
  const whatsappHref = `${copy.whatsappHref}?text=${encodeURIComponent(copy.whatsappText.replace("{title}", item.title))}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <Link href={hrefs.services} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white">
        <ArrowLeft className="size-4" />
        {copy.back}
      </Link>

      <div className="relative mt-6 h-[380px] overflow-hidden rounded-3xl border border-zinc-800 md:h-[480px]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(min-width: 1280px) 1120px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <p className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ember backdrop-blur-sm">
              {category.label}
            </p>
            <p className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              {dict.services.durationLabel} · {item.content.duration}
            </p>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-none text-white md:text-6xl">
            {item.title}
          </h1>
        </div>
      </div>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article>
          <p className="text-lg leading-relaxed text-zinc-200">{item.content.overview}</p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">{item.description}</p>

          <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 md:p-6">
            <h2 className="font-display text-3xl uppercase text-white">{copy.signsTitle}</h2>
            <ul className="mt-4 space-y-3">
              {item.content.signs.map((sign) => (
                <li key={sign} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-200">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FF5A00]" />
                  {sign}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-3xl uppercase text-white">{copy.stepsTitle}</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {item.content.steps.map((step, index) => (
                <li key={step} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                  <span className="font-display text-2xl text-[#FF5A00]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-200">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-3xl uppercase text-white">{copy.howTitle}</h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-400">{item.content.how}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-3xl uppercase text-white">{copy.includesTitle}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {item.content.includes.map((line) => (
                <li key={line} className="flex items-start gap-3 rounded-xl border border-zinc-800 px-4 py-3 text-sm leading-relaxed text-zinc-200">
                  <Check className="mt-0.5 size-4 shrink-0 text-[#FF5A00]" />
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-3xl uppercase text-white">{copy.whyTitle}</h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-400">{item.content.why}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-3xl uppercase text-white">{copy.advantagesTitle}</h2>
            <ul className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
              {item.content.advantages.map((advantage) => (
                <li key={advantage} className="flex items-start gap-3 py-3 text-sm leading-relaxed text-zinc-200">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#FF5A00]" />
                  {advantage}
                </li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:sticky lg:top-28">
          <ServiceGlyph name={item.iconName} className="size-7 text-[#FF5A00]" />
          <h2 className="mt-5 text-xl font-semibold leading-snug text-white">{copy.bookTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{copy.bookText}</p>
          <Link
            href={hrefs.appointment}
            className="mt-6 flex items-center justify-center rounded-full bg-[#FF5A00] px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-orange-500"
          >
            {copy.bookCta}
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5a]"
          >
            <MessageCircle className="size-4" />
            {copy.whatsapp}
          </a>
        </aside>
      </div>

      <section className="mt-16 border-t border-zinc-800 pt-12">
        <h2 className="font-display text-3xl uppercase text-white md:text-4xl">{copy.relatedTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {related.map((service) => (
            <ServiceCard
              key={service.slug}
              lang={lang}
              service={{
                slug: service.slug,
                title: service.title,
                description: service.description,
                iconName: service.iconName,
                image: service.image,
                imageAlt: service.imageAlt,
                duration: service.content.duration,
                category:
                  dict.services.categories.find((entry) =>
                    entry.items.some((item) => item.slug === service.slug),
                  )?.label ?? "",
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
