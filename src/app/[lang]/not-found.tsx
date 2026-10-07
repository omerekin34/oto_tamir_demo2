"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import en from "@/dictionaries/en.json";
import tr from "@/dictionaries/tr.json";

export default function NotFound() {
  const pathname = usePathname() || "/tr";
  const lang = pathname.split("/")[1] === "en" ? "en" : "tr";
  const dict = lang === "en" ? en : tr;

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-5 py-24">
      <p className="font-display text-7xl text-ember">404</p>
      <h1 className="mt-4 font-display text-5xl uppercase text-white">{dict.notFound.title}</h1>
      <p className="mt-4 text-zinc-400">{dict.notFound.text}</p>
      <Link
        href={`/${lang}`}
        className="mt-8 w-fit rounded-full bg-ember px-5 py-3 text-sm font-semibold text-zinc-950"
      >
        {dict.notFound.back}
      </Link>
    </main>
  );
}
