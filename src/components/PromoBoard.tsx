"use client";

import { brands, campaigns, type BrandId, type Listing } from "@/data/diapers";
import { costPerDiaper, daysLeft, discountPercent, formatDate, formatPack, formatUnit } from "@/lib/pricing";
import { useMemo, useState, type ReactNode } from "react";

export function PromoBoard({ listings }: { listings: Listing[] }) {
  const [brand, setBrand] = useState<BrandId | "all">("all");

  const visibleCampaigns = campaigns.filter((item) => brand === "all" || item.brands.includes(brand));
  const promoListings = useMemo(() => {
    return listings
      .filter((item) => item.promoLabel && (brand === "all" || item.brand === brand))
      .sort((a, b) => (discountPercent(b) ?? 0) - (discountPercent(a) ?? 0));
  }, [listings, brand]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterChip active={brand === "all"} onClick={() => setBrand("all")}>
          全部品牌
        </FilterChip>
        {Object.values(brands).map((item) => (
          <FilterChip key={item.id} active={brand === item.id} onClick={() => setBrand(item.id)}>
            {item.name}
          </FilterChip>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {visibleCampaigns.map((item) => {
          const left = daysLeft(item.ends);
          return (
            <article key={item.id} className="rounded-2xl border border-line bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-ember">{item.store}</p>
                <p className={`rounded-full px-2 py-1 text-xs ${left <= 3 ? "bg-gold" : "bg-paper"}`}>
                  {left > 0 ? `尚餘 ${left} 日` : "已完結"}
                </p>
              </div>
              <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
              <p className="mt-3 text-xs text-muted">至 {formatDate(item.ends)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.brands.map((id) => (
                  <span key={id} className="rounded-full px-2 py-0.5 text-xs" style={{ background: brands[id].tint, color: brands[id].ink }}>
                    {brands[id].name}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <h2 className="mt-10 text-2xl font-semibold">減價包裝</h2>
      <div className="mt-4 grid gap-3">
        {promoListings.map((item) => {
          const discount = discountPercent(item);
          return (
            <article key={item.id} className="grid gap-2 rounded-2xl border border-line bg-card p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h3 className="font-semibold">
                  {brands[item.brand].name} {item.series} · {item.size}
                </h3>
                <p className="text-sm text-muted">
                  {item.store} · {item.count} 片 · {item.promoLabel}
                  {item.promoEnds ? ` · 至 ${formatDate(item.promoEnds)}` : ""}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="tabular text-lg font-bold text-pine">{formatUnit(costPerDiaper(item))} / 片</p>
                <p className="tabular text-sm">
                  {formatPack(item.price)}
                  {discount ? <span className="ml-2 text-ember">省 {discount}%</span> : null}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-full px-3 py-1.5 text-sm ${active ? "bg-ink text-paper" : "border border-line bg-card"}`}>
      {children}
    </button>
  );
}
