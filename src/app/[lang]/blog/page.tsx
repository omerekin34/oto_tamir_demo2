import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { copyFor, postsFor } from "@/data/blog";
import { routes } from "@/lib/i18n";
import { BLUR_DATA_URL } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const copy = copyFor(lang);
  return { title: copy.title, description: copy.subtitle };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const copy = copyFor(lang);
  const posts = postsFor(lang);
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured.slug);
  const hrefs = routes(lang);

  return (
    <main className="bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">{copy.eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl font-black uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{copy.subtitle}</p>

        <Link
          href={`${hrefs.blog}/${featured.slug}`}
          className="group mt-12 grid overflow-hidden rounded-2xl bg-zinc-900 lg:grid-cols-2"
        >
          <div className="relative min-h-72 lg:min-h-[460px]">
            <Image
              src={featured.image}
              alt={featured.alt}
              fill
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              {featured.category} - {featured.date} - {featured.readTime}
            </p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-none text-white md:text-5xl lg:text-6xl">
              {featured.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">{featured.excerpt}</p>
          </div>
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`${hrefs.blog}/${post.slug}`}
              className="group overflow-hidden rounded-2xl bg-zinc-900"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
                  {post.category} - {post.readTime}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-snug text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
