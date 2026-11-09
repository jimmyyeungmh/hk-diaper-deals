"use client";

import { brands, sizeOptions, stores, typeLabels, type BrandId, type DiaperType, type Listing, type SizeId } from "@/data/diapers";
import { costPerDiaper, discountPercent, formatPack, formatUnit } from "@/lib/pricing";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

type SortKey = "unit" | "pack" | "discount";

export function CompareExplorer({ listings }: { listings: Listing[] }) {
  const params = useSearchParams();
  const initialBrand = params.get("brand") ?? undefined;
  const initialSize = params.get("size") ?? undefined;
  const initialType = params.get("type");
  const initialStore = params.get("store");
  const initialSort = params.get("sort");
  const [brand, setBrand] = useState<BrandId | "all">(isBrand(initialBrand) ? initialBrand : "all");
  const [size, setSize] = useState<SizeId | "all">(isSize(initialSize) ? initialSize : "L");
  const [type, setType] = useState<DiaperType | "all">(initialType === "tape" || initialType === "pants" ? initialType : "all");
  const [store, setStore] = useState(initialStore && stores.includes(initialStore) ? initialStore : "all");
  const [sort, setSort] = useState<SortKey>(initialSort === "pack" || initialSort === "discount" ? initialSort : "unit");

  const rows = useMemo(() => {
    const filtered = listings.filter((item) => {
      if (brand !== "all" && item.brand !== brand) return false;
      if (size !== "all" && item.size !== size) return false;
      if (type !== "all" && item.type !== type) return false;
      if (store !== "all" && item.store !== store) return false;
      return true;
    });
    return filtered.sort((a, b) => {
      if (sort === "pack") return a.price - b.price;
      if (sort === "discount") return (discountPercent(b) ?? -1) - (discountPercent(a) ?? -1);
      return costPerDiaper(a) - costPerDiaper(b);
    });
  }, [listings, brand, size, type, store, sort]);

  const bestId = rows.length > 0 && sort === "unit" ? rows[0].id : null;

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-line bg-card p-4 sm:grid-cols-2 lg:grid-cols-5">
        <Select label="品牌" value={brand} onChange={(value) => setBrand(value as BrandId | "all")}>
          <option value="all">全部</option>
          {Object.values(brands).map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select label="尺碼" value={size} onChange={(value) => setSize(value as SizeId | "all")}>
          <option value="all">全部</option>
          {sizeOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id} {item.name}
            </option>
          ))}
        </Select>
        <Select label="類型" value={type} onChange={(value) => setType(value as DiaperType | "all")}>
          <option value="all">全部</option>
          <option value="tape">紙尿片</option>
          <option value="pants">學行褲</option>
        </Select>
        <Select label="商戶" value={store} onChange={setStore}>
          <option value="all">全部</option>
          {stores.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select label="排序" value={sort} onChange={(value) => setSort(value as SortKey)}>
          <option value="unit">每片成本（低至高）</option>
          <option value="pack">包裝售價（低至高）</option>
          <option value="discount">折扣（高至低）</option>
        </Select>
      </div>
      <p className="mt-4 text-sm text-muted">共 {rows.length} 個報價</p>
      {rows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-line bg-card p-6 text-sm">沒有符合條件的報價。</p>
      ) : (
        <>
          <div className="mt-4 hidden overflow-hidden rounded-2xl border border-line bg-card md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper text-muted">
                <tr>
                  <th className="px-3 py-3 font-medium">產品</th>
                  <th className="px-3 py-3 font-medium">商戶</th>
                  <th className="px-3 py-3 font-medium">片數</th>
                  <th className="px-3 py-3 font-medium">包裝價</th>
                  <th className="px-3 py-3 font-medium">每片</th>
                  <th className="px-3 py-3 font-medium">優惠</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => {
                  const brandInfo = brands[item.brand];
                  const discount = discountPercent(item);
                  return (
                    <tr key={item.id} className="border-t border-line">
                      <td className="px-3 py-3">
                        <div className="font-medium">
                          {brandInfo.name} {item.series}
                          {item.id === bestId ? <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-xs">最抵</span> : null}
                        </div>
                        <div className="text-xs text-muted">
                          {typeLabels[item.type]} · {item.size}
                        </div>
                      </td>
                      <td className="px-3 py-3">{item.store}</td>
                      <td className="px-3 py-3 tabular">{item.count}</td>
                      <td className="px-3 py-3 tabular">
                        {formatPack(item.price)}
                        {item.originalPrice ? <div className="text-xs text-muted line-through">{formatPack(item.originalPrice)}</div> : null}
                      </td>
                      <td className="px-3 py-3 tabular font-semibold text-pine">{formatUnit(costPerDiaper(item))}</td>
                      <td className="px-3 py-3 text-xs">{discount ? `${item.promoLabel ?? "減價"} · 省 ${discount}%` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid gap-3 md:hidden">
            {rows.map((item) => {
              const brandInfo = brands[item.brand];
              return (
                <article key={item.id} className="rounded-2xl border border-line bg-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs" style={{ color: brandInfo.ink }}>
                        {brandInfo.name}
                      </p>
                      <h3 className="font-semibold">
                        {item.series} · {typeLabels[item.type]} {item.size}
                      </h3>
                      <p className="text-sm text-muted">
                        {item.store} · {item.count} 片
                      </p>
                    </div>
                    {item.id === bestId ? <span className="rounded-full bg-gold px-2 py-1 text-xs">最抵</span> : null}
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <p className="tabular text-2xl font-bold text-pine">{formatUnit(costPerDiaper(item))}</p>
                    <p className="tabular text-sm">包裝 {formatPack(item.price)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2"
      >
        {children}
      </select>
    </label>
  );
}

function isBrand(value: string | undefined): value is BrandId {
  return value === "pampers" || value === "huggies" || value === "merries" || value === "moony";
}

function isSize(value: string | undefined): value is SizeId {
  return value === "NB" || value === "S" || value === "M" || value === "L" || value === "XL" || value === "XXL";
}
