import type { Metadata } from "next";
import { MapSection } from "@/components/about/MapSection";
import { StatsSection } from "@/components/about/StatsSection";
import { StorySection } from "@/components/about/StorySection";
import { TestimonialSection } from "@/components/about/TestimonialSection";
import { WhyUsSection } from "@/components/about/WhyUsSection";
import { getPageDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  return { title: dict.nav.about, description: dict.about.lead };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getPageDictionary(lang);
  const about = dict.about;

  return (
    <main>
      <StorySection about={about} />
      <StatsSection stats={about.stats} locale={lang} />
      <WhyUsSection why={about.why} />
      <MapSection map={about.map} />
      <TestimonialSection block={about.testimonials} />
    </main>
  );
}
