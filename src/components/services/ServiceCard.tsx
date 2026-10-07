import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  AppWindow,
  Armchair,
  ArrowUpRight,
  CarFront,
  ClipboardCheck,
  CloudRain,
  Cog,
  Disc,
  Droplets,
  Fan,
  Gauge,
  Hammer,
  Layers,
  Lightbulb,
  Link2,
  Paintbrush,
  Puzzle,
  ScanSearch,
  Settings2,
  Shield,
  Snowflake,
  Sofa,
  Sparkles,
  SprayCan,
  Thermometer,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCardData } from "@/lib/services";
import { BLUR_DATA_URL } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Hammer,
  Paintbrush,
  Puzzle,
  Droplets,
  AppWindow,
  Armchair,
  Thermometer,
  Fan,
  Lightbulb,
  Disc,
  Gauge,
  CloudRain,
  CarFront,
  ClipboardCheck,
  Activity,
  Settings2,
  Cog,
  Link2,
  Snowflake,
  ScanSearch,
  Sparkles,
  Shield,
  SprayCan,
  Wind,
  Wrench,
  Sofa,
  Layers,
};

export function ServiceGlyph({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Wrench;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}

function durationBadge(lang: string, duration?: string) {
  const english = lang === "en";
  const prefix = english ? "TIME" : "SÜRE";
  const fallback = english ? "1-2 days" : "1-2 gün";
  const value = (duration?.trim() || fallback).toLocaleUpperCase(english ? "en-US" : "tr-TR");
  return `${prefix}: ${value}`;
}

export function ServiceCard({ lang, service }: { lang: string; service: ServiceCardData }) {
  return (
    <Link
      href={`/${lang}/hizmetlerimiz/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-[#FF5A00]"
    >
      <span className="relative block aspect-[16/10] overflow-hidden">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.imageAlt || service.title}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(min-width: 1280px) 360px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 bg-zinc-900" />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-black/25" />
        <span className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-[#FF5A00] backdrop-blur-sm">
          <ServiceGlyph name={service.iconName} className="size-4" />
        </span>
        <span className="absolute top-3 right-12 rounded-full border border-zinc-700 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md">
          {durationBadge(lang, service.duration)}
        </span>
        <ArrowUpRight className="absolute right-3 top-3 size-5 text-white/80 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
      </span>
      <span className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-white">{service.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">{service.description}</p>
      </span>
    </Link>
  );
}
