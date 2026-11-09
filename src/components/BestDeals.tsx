"use client";

import { DealCard } from "@/components/DealCard";
import { sizeOptions, typeLabels, type DiaperType, type Listing, type SizeId } from "@/data/diapers";
import { costPerDiaper } from "@/lib/pricing";
import { useMemo, useState } from "react";

export function BestDeals({ listings }: { listings: Listing[] }) {
  const [size, setSize] = useState<SizeId>("L");
  const [type, setType] = useState<DiaperType | "all">("all");

  const deals = useMemo(() => {
    return listings
      .filter((item) => item.size === size && (type === "all" || item.type === type))
      .sort((a, b) => costPerDiaper(a) - costPerDiaper(b))
      .slice(0, 6);
  }, [listings, size, type]);

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">同碼最抵</h2>
          <p className="text-sm text-muted">只比較同一尺碼，避免大包裝片數多而看起來特別平。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSize(option.id)}
              className={`rounded-full px-3 py-1 text-sm ${size === option.id ? "bg-ink text-paper" : "bg-card border border-line"}`}
            >
              {option.id}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {(["all", "tape", "pants"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={`rounded-full px-3 py-1 text-sm ${type === value ? "bg-ember text-white" : "bg-card border border-line"}`}
          >
            {value === "all" ? "全部" : typeLabels[value]}
          </button>
        ))}
      </div>
      {deals.length === 0 ? (
        <p className="mt-6 text-sm text-muted">這個尺碼暫時沒有示範報價。</p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((listing, index) => (
            <DealCard key={listing.id} listing={listing} badge={index === 0 ? "此碼最抵" : undefined} />
          ))}
        </div>
      )}
    </section>
  );
}
