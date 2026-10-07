"use client";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { BLUR_DATA_URL, cn } from "@/lib/utils";

type HDImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  zoom?: "soft" | "strong";
};

export function HDImage({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  className,
  zoom = "soft",
}: HDImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      sizes={sizes}
      className={cn(
        "object-cover transition duration-700 ease-out",
        zoom === "strong" ? "group-hover:scale-110" : "group-hover:scale-105",
        className,
      )}
    />
  );
}

type HDImageCardProps = {
  title: string;
  summary: string;
  description?: string;
  image: string;
  alt: string;
  tag?: string;
  duration?: string;
  durationLabel?: string;
  href?: string;
};

export function HDImageCard({
  title,
  summary,
  description,
  image,
  alt,
  tag,
  duration,
  durationLabel,
  href,
}: HDImageCardProps) {
  const card = (
    <Tilt
      tiltMaxAngleX={7}
      tiltMaxAngleY={7}
      scale={1.02}
      transitionSpeed={1400}
      glareEnable
      glareMaxOpacity={0.16}
      glareColor="#FF5A00"
      glarePosition="all"
      glareBorderRadius="16px"
      className="h-full"
    >
      <article className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink">
        <div className="absolute inset-0">
          <HDImage
            src={image}
            alt={alt}
            zoom="strong"
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/25 opacity-0 transition duration-700 group-hover:opacity-100" />
        </div>
        <div className="relative z-10 flex flex-1 flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            {tag ? (
              <span className="rounded-full border border-ember/40 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember backdrop-blur-sm">
                {tag}
              </span>
            ) : (
              <span />
            )}
            {duration ? (
              <span className="rounded-full bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-zinc-200 backdrop-blur-sm">
                {durationLabel ? `${durationLabel} · ${duration}` : duration}
              </span>
            ) : null}
          </div>
          <div>
            <h3 className="font-display text-3xl uppercase leading-none text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200">{summary}</p>
            {description ? (
              <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-zinc-400 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </Tilt>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block h-full rounded-2xl">
      {card}
    </Link>
  );
}
