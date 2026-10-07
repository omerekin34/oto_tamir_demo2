import type { Metadata } from "next";
import { Suspense } from "react";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { EmergencyHotline } from "@/components/global/EmergencyHotline";
import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { PageTransition } from "@/components/global/PageTransition";
import { TopBar } from "@/components/global/TopBar";
import { getPageDictionary } from "@/lib/dictionary";
import { locales } from "@/lib/i18n";
import "../globals.css";

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

const display = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "900"],
  variable: "--font-display-family",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  return {
    title: {
      default: dict.meta.title,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);

  return (
    <html lang={lang} data-scroll-behavior="smooth" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <Suspense fallback={<div className="h-8 bg-ember" />}>
          <TopBar slogans={dict.topbar.slogans} />
        </Suspense>
        <Suspense fallback={<div className="h-16" />}>
          <Navbar lang={lang} nav={dict.nav} langLabel={dict.lang.label} />
        </Suspense>
        <Suspense fallback={null}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <Footer lang={lang} dict={dict} />
        <EmergencyHotline
          label={dict.emergency.label}
          hint={dict.emergency.hint}
          phoneHref={dict.emergency.phoneHref}
          phoneDisplay={dict.emergency.phoneDisplay}
        />
      </body>
    </html>
  );
}
