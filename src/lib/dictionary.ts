import "server-only";

import { notFound } from "next/navigation";
import en from "@/dictionaries/en.json";
import tr from "@/dictionaries/tr.json";
import { hasLocale, type Locale } from "@/lib/i18n";

const dictionaries = { tr, en };

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export async function getPageDictionary(locale: string) {
  if (!hasLocale(locale)) notFound();
  return getDictionary(locale);
}
