import { dataAsOf, type Listing } from "@/data/diapers";

export function costPerDiaper(listing: Pick<Listing, "price" | "count">): number {
  return listing.price / listing.count;
}

export function discountPercent(listing: Pick<Listing, "price" | "originalPrice">): number | null {
  if (!listing.originalPrice || listing.originalPrice <= listing.price) return null;
  return Math.round((1 - listing.price / listing.originalPrice) * 100);
}

export function formatPack(amount: number): string {
  return `HK$${new Intl.NumberFormat("zh-HK", { maximumFractionDigits: 0 }).format(Math.round(amount))}`;
}

export function formatUnit(amount: number): string {
  return `HK$${amount.toFixed(2)}`;
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
}

export function daysLeft(iso: string, today = dataAsOf): number {
  const [endYear, endMonth, endDay] = iso.split("-").map(Number);
  const [startYear, startMonth, startDay] = today.split("-").map(Number);
  const end = Date.UTC(endYear, endMonth - 1, endDay);
  const start = Date.UTC(startYear, startMonth - 1, startDay);
  return Math.round((end - start) / 86_400_000);
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) return (sorted[mid - 1] + sorted[mid]) / 2;
  return sorted[mid];
}

export function cheapestBy<T extends Listing>(items: T[], key: (item: T) => string): T[] {
  const winners = new Map<string, T>();
  for (const item of items) {
    const id = key(item);
    const current = winners.get(id);
    if (!current || costPerDiaper(item) < costPerDiaper(current)) winners.set(id, item);
  }
  return [...winners.values()].sort((a, b) => costPerDiaper(a) - costPerDiaper(b));
}
