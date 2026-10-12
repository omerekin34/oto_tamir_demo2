"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  Building2,
  CarFront,
  ChevronDown,
  CloudRain,
  Hammer,
  MapPin,
  Menu,
  MessageSquareQuote,
  Search,
  Sparkles,
  Truck,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/global/LanguageSwitcher";
import { routes } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";
import { cn } from "@/lib/utils";

type NavItem = Dictionary["nav"]["servicesMenu"][number];

const icons: Record<string, LucideIcon> = {
  Hammer,
  Truck,
  CarFront,
  CloudRain,
  Wrench,
  Sparkles,
  Building2,
  BookOpen,
  MapPin,
  Briefcase,
  MessageSquareQuote,
};

function MenuIcon({ name }: { name: string }) {
  const Icon = icons[name] ?? Wrench;
  return <Icon className="size-5" />;
}

export function Navbar({
  lang,
  nav,
  langLabel,
}: {
  lang: string;
  nav: Dictionary["nav"];
  langLabel: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"services" | "corporate" | null>(null);
  const [pinned, setPinned] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<"services" | "corporate" | null>(null);
  const hrefs = routes(lang);

  const plain = [
    { href: hrefs.blog, label: nav.blog },
    { href: hrefs.contact, label: nav.contact },
  ];

  useEffect(() => {
    if (!menu) return;
    const close = () => {
      setMenu(null);
      setPinned(false);
    };
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
    setPinned(false);
    setMobileGroup(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(null);
        setPinned(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleMenu(id: "services" | "corporate") {
    if (menu === id && pinned) {
      setPinned(false);
      setMenu(null);
      return;
    }
    setPinned(true);
    setMenu(id);
  }

  const panels = {
    services: {
      title: nav.megaServicesTitle,
      items: nav.servicesMenu,
      viewAll: hrefs.services,
      viewAllLabel: nav.viewAll,
    },
    corporate: {
      title: nav.megaCorporateTitle,
      items: nav.corporateMenu,
      viewAll: hrefs.about,
      viewAllLabel: nav.viewCorporate,
    },
  };

  const activePanel = menu ? panels[menu] : null;

  return (
    <header
      className={cn(
        "sticky top-8 z-40 border-b transition duration-300",
        scrolled || open || menu
          ? "border-white/10 bg-zinc-950/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
      onMouseLeave={() => {
        if (!pinned) setMenu(null);
      }}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href={hrefs.home} className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-ember font-display text-xl text-zinc-950">
            D
          </span>
          <span className="font-display text-2xl uppercase tracking-[0.14em] text-white">
            Demo Garaj
          </span>
        </Link>
        <nav className="hidden items-center gap-4 xl:gap-7 lg:flex">
          <MegaTrigger
            label={nav.corporate}
            open={menu === "corporate"}
            active={pathname.startsWith(hrefs.about)}
            onOpen={() => setMenu("corporate")}
            onToggle={() => toggleMenu("corporate")}
          />
          <MegaTrigger
            label={nav.services}
            open={menu === "services"}
            active={pathname.startsWith(hrefs.services)}
            onOpen={() => setMenu("services")}
            onToggle={() => toggleMenu("services")}
          />
          <PlainLink href={plain[0].href} label={plain[0].label} active={pathname.startsWith(plain[0].href)} />
          <PlainLink href={plain[1].href} label={plain[1].label} active={pathname.startsWith(plain[1].href)} />
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher label={langLabel} />
          </div>
          <Link
            href={hrefs.vehicleStatus}
            className="hidden items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-sm font-semibold text-white transition hover:border-[#FF5A00] lg:inline-flex"
          >
            <Search className="size-4 text-[#FF5A00]" />
            {nav.vehicleStatus}
          </Link>
          <Link
            href={hrefs.appointment}
            className="hidden rounded-full bg-ember px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-orange-500 sm:inline-flex"
          >
            {nav.cta}
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {activePanel ? (
          <motion.div
            key={menu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full hidden border-b border-white/10 bg-zinc-900 shadow-[0_28px_80px_rgba(0,0,0,0.45)] lg:block"
          >
            <div className="mx-auto w-full max-w-7xl px-8 py-8">
              <div className="flex items-end justify-between gap-6">
                <p className="font-display text-2xl uppercase tracking-wide text-white">{activePanel.title}</p>
                <Link href={activePanel.viewAll} className="text-sm font-semibold text-[#FF5A00] hover:text-orange-400">
                  {activePanel.viewAllLabel}
                </Link>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {activePanel.items.map((item) => (
                  <MegaLink key={item.href} lang={lang} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {open ? (
        <div className="border-t border-white/10 bg-zinc-950/95 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link href={hrefs.home} className="py-2 text-lg text-white">
              {nav.home}
            </Link>
            <MobileGroup
              label={nav.corporate}
              open={mobileGroup === "corporate"}
              onToggle={() => setMobileGroup((current) => (current === "corporate" ? null : "corporate"))}
              items={nav.corporateMenu}
              lang={lang}
              viewAll={hrefs.about}
              viewAllLabel={nav.viewCorporate}
            />
            <MobileGroup
              label={nav.services}
              open={mobileGroup === "services"}
              onToggle={() => setMobileGroup((current) => (current === "services" ? null : "services"))}
              items={nav.servicesMenu}
              lang={lang}
              viewAll={hrefs.services}
              viewAllLabel={nav.viewAll}
            />
            <Link href={hrefs.blog} className="py-2 text-lg text-white">
              {nav.blog}
            </Link>
            <Link href={hrefs.contact} className="py-2 text-lg text-white">
              {nav.contact}
            </Link>
            <Link href={hrefs.vehicleStatus} className="inline-flex items-center gap-2 py-2 text-lg text-white lg:hidden">
              <Search className="size-4 text-[#FF5A00]" />
              {nav.vehicleStatus}
            </Link>
            <div className="mt-2 flex items-center gap-3 sm:hidden">
              <LanguageSwitcher label={langLabel} />
              <Link
                href={hrefs.appointment}
                className="flex-1 rounded-full bg-ember px-4 py-3 text-center text-sm font-semibold text-zinc-950"
              >
                {nav.cta}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function PlainLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium tracking-wide transition",
        active ? "text-ember" : "text-zinc-300 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}

function MegaTrigger({
  label,
  open,
  active,
  onOpen,
  onToggle,
}: {
  label: string;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium tracking-wide transition",
        open || active ? "text-ember" : "text-zinc-300 hover:text-white",
      )}
      aria-expanded={open}
      onMouseEnter={onOpen}
      onClick={onToggle}
    >
      {label}
      <ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
    </button>
  );
}

function MegaLink({ lang, item }: { lang: string; item: NavItem }) {
  return (
    <Link
      href={`/${lang}/${item.href}`}
      className="group flex gap-3 rounded-xl border border-transparent p-3 transition hover:border-[#FF5A00]/40 hover:bg-zinc-950"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-zinc-950 text-[#FF5A00]">
        <MenuIcon name={item.icon} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-white">{item.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-zinc-400">{item.text}</span>
      </span>
    </Link>
  );
}

function MobileGroup({
  label,
  open,
  onToggle,
  items,
  lang,
  viewAll,
  viewAllLabel,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: NavItem[];
  lang: string;
  viewAll: string;
  viewAllLabel: string;
}) {
  return (
    <div>
      <button type="button" className="flex w-full items-center justify-between py-2 text-lg text-white" onClick={onToggle}>
        {label}
        <ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="mb-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-900 p-2">
          {items.map((item) => (
            <Link key={item.href} href={`/${lang}/${item.href}`} className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className="grid size-9 place-items-center rounded-lg bg-zinc-950 text-[#FF5A00]">
                <MenuIcon name={item.icon} />
              </span>
              <span className="text-sm text-white">{item.title}</span>
            </Link>
          ))}
          <Link href={viewAll} className="px-2 py-2 text-sm font-semibold text-[#FF5A00]">
            {viewAllLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
