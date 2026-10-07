import type { Dictionary } from "@/lib/types";

export type ServiceCategory = Dictionary["services"]["categories"][number];
export type ServiceItem = ServiceCategory["items"][number];
export type ServiceCardData = Pick<
  ServiceItem,
  "slug" | "title" | "description" | "iconName" | "image" | "imageAlt"
> & {
  duration?: string;
  category: string;
};

export type ServiceTabCategory = {
  id: string;
  label: string;
  items: ServiceCardData[];
};

export function findService(categories: ServiceCategory[], slug: string) {
  for (const category of categories) {
    const item = category.items.find((entry) => entry.slug === slug);
    if (item) return { category, item };
  }
  return null;
}

export function relatedServices(categories: ServiceCategory[], slug: string, limit = 3) {
  const current = findService(categories, slug);
  if (!current) return [];

  const sameCategory = current.category.items.filter((item) => item.slug !== slug);
  const others = categories
    .filter((category) => category.id !== current.category.id)
    .flatMap((category) => category.items);

  return [...sameCategory, ...others].slice(0, limit);
}

export function toTabCategories(categories: ServiceCategory[]): ServiceTabCategory[] {
  return categories.map((category) => ({
    id: category.id,
    label: category.label,
    items: category.items.map(({ slug, title, description, iconName, image, imageAlt, content }) => ({
      slug,
      title,
      description,
      iconName,
      image,
      imageAlt,
      duration: content.duration,
      category: category.label,
    })),
  }));
}
