import type { SVGProps } from "react";
import Link from "next/link";
import { MapPin, PhoneCall } from "lucide-react";
import { FooterNewsletter } from "@/components/global/FooterNewsletter";
import type { Dictionary } from "@/lib/types";
import { cn } from "@/lib/utils";

const socialIcons = {
  instagram: InstagramIcon,
  whatsapp: WhatsappIcon,
  mail: MailIcon,
} as const;

export function Footer({
  lang,
  dict,
}: {
  lang: string;
  dict: Dictionary;
}) {
  const year = 2026;
  const footer = dict.footer;

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_7rem),linear-gradient(180deg,#09090b,#050505)]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:gap-10">
        <div>
          <Link
            href={`/${lang}`}
            className="inline-flex flex-col font-display text-4xl uppercase leading-[0.85] tracking-[0.08em] text-white"
          >
            <span>Demo</span>
            <span className="text-[#FF5A00]">Garaj</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">{footer.about}</p>
          <ul className="mt-6 flex gap-3">
            {footer.social.map((item) => {
              const Icon = socialIcons[item.id as keyof typeof socialIcons];
              if (!Icon) return null;
              const external = !item.href.startsWith("mailto:");
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={item.label}
                    className="grid size-10 place-items-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-[#FF5A00] hover:bg-[#FF5A00] hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5A00]"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label={footer.servicesTitle}>
          <ColumnTitle>{footer.servicesTitle}</ColumnTitle>
          <ul className="mt-5 space-y-3">
            {footer.services.map((item) => (
              <li key={item.slug}>
                <ShiftLink href={`/${lang}/hizmetlerimiz/${item.slug}`}>{item.label}</ShiftLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={footer.corporateTitle}>
          <ColumnTitle>{footer.corporateTitle}</ColumnTitle>
          <ul className="mt-5 space-y-3">
            {footer.corporateLinks.map((item) => (
              <li key={item.label}>
                <ShiftLink href={`/${lang}/${item.href}`}>{item.label}</ShiftLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnTitle>{footer.contactTitle}</ColumnTitle>
          <address className="mt-5 not-italic">
            <p className="flex gap-3 text-sm leading-relaxed text-zinc-400">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#FF5A00]" aria-hidden="true" />
              <span>{footer.address}</span>
            </p>
            <div className="mt-5 flex gap-3">
              <PhoneCall className="mt-1 size-4 shrink-0 text-[#FF5A00]" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {footer.emergencyLabel}
                </p>
                <a
                  href={dict.emergency.phoneHref}
                  className="mt-1 block font-display text-3xl tracking-wide text-white transition hover:text-[#FF5A00]"
                >
                  {dict.emergency.phoneDisplay}
                </a>
              </div>
            </div>
          </address>
          <FooterNewsletter
            text={footer.newsletterText}
            placeholder={footer.newsletterPlaceholder}
            submitLabel={footer.newsletterSubmit}
            success={footer.newsletterSuccess}
            invalid={footer.newsletterInvalid}
          />
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 pb-24 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-xs text-zinc-500">
            © {year} {dict.meta.siteName}. {footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legalLinks.map((item) => (
              <li key={item.href}>
                <ShiftLink href={`/${lang}/${item.href}`} compact>
                  {item.label}
                </ShiftLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-white">
      <span className="h-px w-4 bg-[#FF5A00]" aria-hidden="true" />
      {children}
    </h2>
  );
}

function ShiftLink({
  href,
  children,
  compact = false,
}: {
  href: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex max-w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5A00]"
    >
      <span
        className={cn(
          "text-zinc-400 transition duration-200 group-hover:translate-x-1 group-hover:text-[#FF5A00]",
          compact ? "text-xs" : "text-sm",
        )}
      >
        {children}
      </span>
    </Link>
  );
}

function iconProps(props: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 20.5a8.5 8.5 0 1 0-7.4-4.3L4 20.5l4.4-.7A8.5 8.5 0 0 0 12 20.5Z" />
      <path d="M9.2 10.1c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4.2.6.7 1.7.7 1.8s0 .3-.2.5l-.3.4c-.1.1-.1.3 0 .5.3.4.9 1.3 1.8 1.7.3.1.4.1.6-.1l.4-.5c.2-.2.4-.1.6 0 .3.1 1.3.6 1.5.7.2.1.3.2.3.4 0 .4-.4 1.1-.9 1.2-.6.2-1.3.1-2.2-.3-1.2-.5-2.6-1.7-3.3-3-.5-.9-.8-1.7-.7-2.3 0-.3.2-.7.4-1" />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
