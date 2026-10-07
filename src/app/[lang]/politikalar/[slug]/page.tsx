import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import tr from "@/dictionaries/tr.json";
import { getPageDictionary } from "@/lib/dictionary";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) => tr.policies.items.map((item) => ({ lang, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getPageDictionary(lang);
  const page = dict.policies.items.find((item) => item.slug === slug);
  if (!page) return { title: dict.meta.siteName };
  return { title: page.title, description: page.paragraphs[0] };
}

export default function PolicyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  return (
    <Suspense fallback={<PolicyFallback />}>
      <Policy params={params} />
    </Suspense>
  );
}

function PolicyFallback() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-20">
      <div className="h-4 w-40 animate-pulse rounded-full bg-zinc-800" />
      <div className="mt-4 h-14 w-3/4 animate-pulse rounded bg-zinc-900" />
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-800" />
      </div>
    </main>
  );
}

async function Policy({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getPageDictionary(lang);
  const page = dict.policies.items.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF5A00]">{dict.meta.siteName}</p>
      <h1 className="mt-3 font-display text-5xl uppercase leading-none text-white md:text-6xl">{page.title}</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-400 md:text-base">
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
