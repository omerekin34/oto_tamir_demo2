"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/lib/types";

export function FAQ({
  faq,
}: {
  faq: Dictionary["contact"]["faq"];
}) {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">
        {faq.eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl uppercase leading-none text-white md:text-6xl">
        {faq.title}
      </h2>
      <Accordion type="single" collapsible className="mt-8">
        {faq.items.map((item, index) => (
          <AccordionItem key={item.q} value={`faq-${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
