import { forwardRef } from "react";
import {
  Mail,
  MessageCircle,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const Instagram = forwardRef<SVGSVGElement, LucideProps>(function Instagram(
  { color = "currentColor", size = 24, strokeWidth = 2, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
});

const socials: {
  name: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/demogaraj",
    icon: Instagram,
    external: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/908504402727",
    icon: MessageCircle,
    external: true,
  },
  {
    name: "Mail",
    href: "mailto:servis@demogaraj.com",
    icon: Mail,
  },
];

export function TopBar({ slogans }: { slogans: string[] }) {
  const line = [...slogans, ...slogans];

  return (
    <div className="sticky top-0 z-50 flex h-8 items-center bg-ember text-zinc-950">
      <nav aria-label="Social media" className="flex shrink-0 items-center gap-4 pl-3">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              {...(social.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={social.name}
              className="text-black transition-colors hover:text-white"
            >
              <Icon className="size-3.5" strokeWidth={2} aria-hidden />
            </a>
          );
        })}
      </nav>
      <span aria-hidden className="mx-2 h-3.5 w-px shrink-0 bg-zinc-950/25" />
      <div className="relative flex-1 overflow-hidden">
        <div className="motion-safe-marquee flex w-max animate-ticker gap-10 whitespace-nowrap px-4 text-[11px] font-semibold uppercase tracking-[0.22em]">
          {line.map((slogan, index) => (
            <span key={`${slogan}-${index}`} className="flex items-center gap-10">
              {slogan}
              <span aria-hidden className="size-1 rounded-full bg-zinc-950" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
