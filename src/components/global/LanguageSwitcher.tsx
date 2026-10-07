"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function swapLocale(pathname: string, locale: "tr" | "en") {
  const segments = pathname.split("/");
  segments[1] = locale;
  const next = segments.join("/");
  return next.endsWith("/") && next.length > 1 ? next.slice(0, -1) : next || `/${locale}`;
}

export function LanguageSwitcher({ label }: { label: string }) {
  const pathname = usePathname() || "/tr";
  const current = pathname.split("/")[1] === "en" ? "en" : "tr";

  return (
    <div
      className="flex items-center rounded-full border border-white/20 bg-white/5 p-0.5 text-[11px] font-semibold tracking-[0.16em]"
      aria-label={label}
    >
      {(["tr", "en"] as const).map((locale) => (
        <Link
          key={locale}
          href={swapLocale(pathname, locale)}
          hrefLang={locale}
          scroll={false}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition",
            current === locale ? "bg-ember text-zinc-950" : "text-zinc-300 hover:text-white",
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
