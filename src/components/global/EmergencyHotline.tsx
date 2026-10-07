"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export function EmergencyHotline({
  label,
  hint,
  phoneHref,
  phoneDisplay,
}: {
  label: string;
  hint: string;
  phoneHref: string;
  phoneDisplay: string;
}) {
  const pathname = usePathname();
  if (pathname?.split("/").includes("randevu")) return null;

  return (
    <a
      href={phoneHref}
      className="group fixed right-5 bottom-5 z-50 flex items-center gap-3"
      aria-label={`${label} ${phoneDisplay}`}
    >
      <span className="relative hidden rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-zinc-300 backdrop-blur-md sm:block">
        {hint}
      </span>
      <span className="relative flex animate-pulse items-center gap-2 rounded-full border border-orange-300/40 bg-gradient-to-b from-orange-400 to-ember px-4 py-3.5 font-display text-lg uppercase tracking-wide text-zinc-950 shadow-[0_0_15px_rgba(255,90,0,0.6)] transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(255,90,0,0.9)] group-hover:-translate-y-0.5">
        <Phone className="size-5" />
        {label}
      </span>
    </a>
  );
}
