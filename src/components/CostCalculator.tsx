"use client";

import { sizeOptions, type SizeId, type Listing } from "@/data/diapers";
import { costPerDiaper, formatUnit, median } from "@/lib/pricing";
import { useMemo, useState } from "react";

export function CostCalculator({ listings }: { listings: Listing[] }) {
  const [price, setPrice] = useState("136");
  const [count, setCount] = useState("54");
  const [size, setSize] = useState<SizeId | "">("L");

  const priceValue = Number(price);
  const countValue = Number(count);
  const valid = priceValue > 0 && countValue > 0;
  const unit = valid ? priceValue / countValue : null;

  const market = useMemo(() => {
    const pool = listings.filter((item) => (size ? item.size === size : true));
    return median(pool.map(costPerDiaper));
  }, [listings, size]);

  const gap = unit !== null && market ? ((market - unit) / market) * 100 : null;

  return (
    <form className="rounded-2xl border border-dashed border-ember/40 bg-card p-4" onSubmit={(event) => event.preventDefault()}>
      <h2 className="text-lg font-semibold">每片成本計算機</h2>
      <p className="mt-1 text-sm text-muted">輸入貨架上的包裝售價同片數，即時計出每片幾多。</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          包裝售價（HK$）
          <input
            inputMode="decimal"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 tabular"
          />
        </label>
        <label className="block text-sm">
          片數
          <input
            inputMode="numeric"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 tabular"
          />
        </label>
        <label className="block text-sm">
          對比尺碼
          <select
            value={size}
            onChange={(event) => setSize(event.target.value as SizeId | "")}
            className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2"
          >
            <option value="">全部尺碼</option>
            {sizeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.id} {option.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 border-t border-dashed border-line pt-4">
        {unit === null ? (
          <p className="text-sm text-muted">請輸入大於 0 的售價及片數。</p>
        ) : (
          <>
            <p className="text-xs text-muted">每片成本</p>
            <p className="tabular text-3xl font-bold text-pine">{formatUnit(unit)}</p>
            {market !== null && gap !== null ? (
              <p className="mt-2 text-sm">
                {size || "全部"}尺碼示範報價中位數為每片 {formatUnit(market)}。
                {gap >= 0 ? ` 這包平約 ${gap.toFixed(0)}%。` : ` 這包貴約 ${Math.abs(gap).toFixed(0)}%。`}
              </p>
            ) : null}
          </>
        )}
      </div>
    </form>
  );
}
