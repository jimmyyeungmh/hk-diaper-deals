import { brands, typeLabels, type Listing } from "@/data/diapers";
import { costPerDiaper, discountPercent, formatPack, formatUnit } from "@/lib/pricing";

export function DealCard({ listing, badge }: { listing: Listing; badge?: string }) {
  const brand = brands[listing.brand];
  const unit = costPerDiaper(listing);
  const discount = discountPercent(listing);

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
            style={{ background: brand.tint, color: brand.ink }}
          >
            {brand.name}
            <span className="ml-1 opacity-70">{brand.en}</span>
          </span>
          <h3 className="mt-2 text-lg font-semibold">
            {brand.name} {listing.series}
          </h3>
          <p className="text-sm text-muted">
            {typeLabels[listing.type]} · {listing.size} · {listing.count} 片 · {listing.store}
          </p>
        </div>
        {badge ? <span className="shrink-0 rounded-full bg-gold px-2 py-1 text-xs font-medium">{badge}</span> : null}
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted">每片</p>
          <p className="tabular text-2xl font-bold text-pine">{formatUnit(unit)}</p>
        </div>
        <div className="text-right">
          <p className="tabular text-sm">包裝 {formatPack(listing.price)}</p>
          {listing.originalPrice ? (
            <p className="tabular text-xs text-muted line-through">正價 {formatPack(listing.originalPrice)}</p>
          ) : null}
          {discount ? <p className="text-xs font-medium text-ember">省 {discount}%</p> : null}
        </div>
      </div>
      {listing.promoLabel ? <p className="mt-3 text-xs text-muted">優惠：{listing.promoLabel}</p> : null}
    </article>
  );
}
