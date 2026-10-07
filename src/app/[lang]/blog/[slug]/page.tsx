import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { copyFor, postBySlug, postsFor, type BlogBlock } from "@/data/blog";
import { locales, routes } from "@/lib/i18n";
import { BLUR_DATA_URL } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((lang) => postsFor(lang).map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = postBySlug(lang, slug);
  if (!post) return { title: copyFor(lang).title };
  return { title: post.title, description: post.excerpt };
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "ul") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{block.text}</p>;
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  return (
    <Suspense fallback={<BlogPostFallback />}>
      <BlogPost params={params} />
    </Suspense>
  );
}

function BlogPostFallback() {
  return (
    <main className="bg-zinc-950">
      <div className="h-[78vh] min-h-[520px] w-full animate-pulse bg-zinc-900" />
      <div className="mx-auto w-full max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <div className="h-5 w-28 animate-pulse rounded-full bg-zinc-800" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </main>
  );
}

async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = postBySlug(lang, slug);
  if (!post) notFound();

  const copy = copyFor(lang);
  const hrefs = routes(lang);

  return (
    <main className="bg-zinc-950">
      <section className="relative h-[78vh] min-h-[520px] w-full">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl px-5 pb-24 md:px-8 md:pb-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
            {post.category} - {post.date} - {post.readTime}
          </p>
          <h1 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white md:text-6xl">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto w-full max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <Link href={hrefs.blog} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white">
          <ArrowLeft className="size-4" />
          {copy.back}
        </Link>
        <div className="prose prose-invert prose-zinc mt-8 max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-white">
          {post.content.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
        <aside className="mt-14 rounded-2xl border border-ember/30 bg-zinc-900 p-6 md:p-8">
          <p className="font-display text-3xl font-black uppercase leading-none text-white md:text-4xl">{copy.cta}</p>
          <Link
            href={hrefs.appointment}
            className="mt-6 inline-flex rounded-full bg-ember px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-500"
          >
            {copy.ctaButton}
          </Link>
        </aside>
      </article>
    </main>
  );
}
