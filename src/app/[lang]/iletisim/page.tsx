import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQ } from "@/components/ui/FAQ";
import { getPageDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  return { title: dict.nav.contact, description: dict.contact.subtitle };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">{dict.contact.eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl uppercase leading-none text-white md:text-7xl">
        {dict.contact.title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{dict.contact.subtitle}</p>
      <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
        <ContactForm form={dict.contact.form} />
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-panel">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="font-display text-2xl uppercase text-white">{dict.contact.infoTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{dict.footer.address}</p>
            <p className="mt-1 text-sm text-zinc-400">{dict.footer.hours}</p>
          </div>
          <div className="relative h-[420px]">
            <iframe
              title={dict.contact.mapTitle}
              src="https://maps.google.com/maps?q=Maslak%20Sariyer%20Istanbul&z=14&output=embed"
              className="map-frame h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <FAQ faq={dict.contact.faq} />
      </div>
    </main>
  );
}
