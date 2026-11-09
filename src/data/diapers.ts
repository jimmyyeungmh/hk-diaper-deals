export type BrandId = "pampers" | "huggies" | "merries" | "moony";
export type DiaperType = "tape" | "pants";
export type SizeId = "NB" | "S" | "M" | "L" | "XL" | "XXL";

export type Brand = {
  id: BrandId;
  name: string;
  en: string;
  tint: string;
  ink: string;
};

export type Listing = {
  id: string;
  brand: BrandId;
  series: string;
  type: DiaperType;
  size: SizeId;
  count: number;
  store: string;
  price: number;
  originalPrice?: number;
  promoLabel?: string;
  promoEnds?: string;
};

export type Campaign = {
  id: string;
  store: string;
  title: string;
  detail: string;
  ends: string;
  brands: BrandId[];
};

export const brands: Record<BrandId, Brand> = {
  pampers: { id: "pampers", name: "幫寶適", en: "Pampers", tint: "#e7f1fb", ink: "#0b4f8a" },
  huggies: { id: "huggies", name: "好奇", en: "Huggies", tint: "#fde8e4", ink: "#9f1239" },
  merries: { id: "merries", name: "妙而舒", en: "Merries", tint: "#fde7f1", ink: "#9d174d" },
  moony: { id: "moony", name: "滿意寶寶", en: "Moony", tint: "#e5f6ec", ink: "#166534" },
};

export const sizeOptions: { id: SizeId; name: string; weight: string }[] = [
  { id: "NB", name: "初生", weight: "約 5 公斤以下" },
  { id: "S", name: "細碼", weight: "約 4–8 公斤" },
  { id: "M", name: "中碼", weight: "約 6–11 公斤" },
  { id: "L", name: "大碼", weight: "約 9–14 公斤" },
  { id: "XL", name: "加大", weight: "約 12–17 公斤" },
  { id: "XXL", name: "特大", weight: "約 13–25 公斤" },
];

export const typeLabels: Record<DiaperType, string> = {
  tape: "紙尿片",
  pants: "學行褲",
};

const offers: Omit<Listing, "id">[] = [
  { brand: "pampers", series: "一級幫", type: "tape", size: "NB", count: 84, store: "HKTVmall", price: 219, originalPrice: 249, promoLabel: "快閃 88 折", promoEnds: "2026-11-20" },
  { brand: "pampers", series: "一級幫", type: "tape", size: "NB", count: 84, store: "百佳", price: 232 },
  { brand: "pampers", series: "一級幫", type: "tape", size: "S", count: 70, store: "惠康", price: 189 },
  { brand: "pampers", series: "一級幫", type: "tape", size: "S", count: 70, store: "萬寧", price: 182, originalPrice: 208, promoLabel: "易賞錢價", promoEnds: "2026-11-18" },
  { brand: "pampers", series: "一級幫", type: "tape", size: "M", count: 64, store: "HKTVmall", price: 176, originalPrice: 206, promoLabel: "快閃", promoEnds: "2026-11-12" },
  { brand: "pampers", series: "一級幫", type: "tape", size: "M", count: 64, store: "百佳", price: 186 },
  { brand: "pampers", series: "一級幫", type: "tape", size: "L", count: 52, store: "HKTVmall", price: 156, originalPrice: 188, promoLabel: "快閃", promoEnds: "2026-11-16" },
  { brand: "pampers", series: "一級幫", type: "tape", size: "L", count: 52, store: "惠康", price: 162 },
  { brand: "pampers", series: "一級幫", type: "tape", size: "L", count: 52, store: "屈臣氏", price: 169 },
  { brand: "pampers", series: "一級幫", type: "tape", size: "XL", count: 44, store: "百佳", price: 164 },
  { brand: "pampers", series: "一級幫", type: "tape", size: "XL", count: 44, store: "HKTVmall", price: 158 },
  { brand: "pampers", series: "極致乾爽", type: "tape", size: "M", count: 64, store: "惠康", price: 142 },
  { brand: "pampers", series: "極致乾爽", type: "tape", size: "M", count: 64, store: "百佳", price: 149 },
  { brand: "pampers", series: "極致乾爽", type: "tape", size: "L", count: 52, store: "HKTVmall", price: 132, originalPrice: 159, promoLabel: "滿 $400 減 $40 前", promoEnds: "2026-11-30" },
  { brand: "pampers", series: "極致乾爽", type: "tape", size: "L", count: 52, store: "百佳", price: 139 },
  { brand: "pampers", series: "極致乾爽", type: "tape", size: "L", count: 52, store: "萬寧", price: 145 },
  { brand: "pampers", series: "一級幫", type: "pants", size: "L", count: 46, store: "HKTVmall", price: 168 },
  { brand: "pampers", series: "一級幫", type: "pants", size: "L", count: 46, store: "一田", price: 175 },
  { brand: "pampers", series: "一級幫", type: "pants", size: "XL", count: 38, store: "惠康", price: 162, originalPrice: 189, promoLabel: "會員價", promoEnds: "2026-11-15" },
  { brand: "pampers", series: "一級幫", type: "pants", size: "XL", count: 38, store: "屈臣氏", price: 170 },
  { brand: "huggies", series: "金裝", type: "tape", size: "S", count: 78, store: "惠康", price: 188 },
  { brand: "huggies", series: "金裝", type: "tape", size: "S", count: 78, store: "百佳", price: 196 },
  { brand: "huggies", series: "金裝", type: "tape", size: "M", count: 64, store: "HKTVmall", price: 156, originalPrice: 186, promoLabel: "今日特價", promoEnds: "2026-11-12" },
  { brand: "huggies", series: "金裝", type: "tape", size: "M", count: 64, store: "惠康", price: 164 },
  { brand: "huggies", series: "金裝", type: "tape", size: "L", count: 54, store: "惠康", price: 136, originalPrice: 168, promoLabel: "會員週", promoEnds: "2026-11-15" },
  { brand: "huggies", series: "金裝", type: "tape", size: "L", count: 54, store: "百佳", price: 148 },
  { brand: "huggies", series: "金裝", type: "tape", size: "L", count: 54, store: "HKTVmall", price: 142 },
  { brand: "huggies", series: "金裝", type: "tape", size: "XL", count: 42, store: "萬寧", price: 146 },
  { brand: "huggies", series: "金裝", type: "tape", size: "XL", count: 42, store: "百佳", price: 152 },
  { brand: "huggies", series: "鉑金裝", type: "tape", size: "M", count: 58, store: "一田", price: 178 },
  { brand: "huggies", series: "鉑金裝", type: "tape", size: "M", count: 58, store: "HKTVmall", price: 169, originalPrice: 199, promoLabel: "快閃", promoEnds: "2026-11-20" },
  { brand: "huggies", series: "鉑金裝", type: "tape", size: "L", count: 48, store: "屈臣氏", price: 172 },
  { brand: "huggies", series: "鉑金裝", type: "tape", size: "L", count: 48, store: "惠康", price: 166 },
  { brand: "huggies", series: "金裝", type: "pants", size: "L", count: 44, store: "百佳", price: 152 },
  { brand: "huggies", series: "金裝", type: "pants", size: "L", count: 44, store: "HKTVmall", price: 146, originalPrice: 172, promoLabel: "快閃", promoEnds: "2026-11-16" },
  { brand: "huggies", series: "金裝", type: "pants", size: "XL", count: 36, store: "惠康", price: 148 },
  { brand: "huggies", series: "金裝", type: "pants", size: "XL", count: 36, store: "萬寧", price: 155 },
  { brand: "huggies", series: "金裝", type: "pants", size: "XXL", count: 26, store: "惠康", price: 138 },
  { brand: "huggies", series: "金裝", type: "pants", size: "XXL", count: 26, store: "百佳", price: 145 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "NB", count: 90, store: "一田", price: 268 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "NB", count: 90, store: "HKTVmall", price: 252, originalPrice: 298, promoLabel: "日本尿片週", promoEnds: "2026-11-18" },
  { brand: "merries", series: "紙尿片", type: "tape", size: "S", count: 82, store: "屈臣氏", price: 236 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "S", count: 82, store: "萬寧", price: 228 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "M", count: 64, store: "HKTVmall", price: 198, originalPrice: 236, promoLabel: "85 折", promoEnds: "2026-11-12" },
  { brand: "merries", series: "紙尿片", type: "tape", size: "M", count: 64, store: "一田", price: 214 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "M", count: 64, store: "百佳", price: 222 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "L", count: 54, store: "HKTVmall", price: 188, originalPrice: 228, promoLabel: "快閃 85 折", promoEnds: "2026-11-12" },
  { brand: "merries", series: "紙尿片", type: "tape", size: "L", count: 54, store: "惠康", price: 198 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "L", count: 54, store: "一田", price: 209 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "XL", count: 44, store: "一田", price: 198 },
  { brand: "merries", series: "紙尿片", type: "tape", size: "XL", count: 44, store: "HKTVmall", price: 192 },
  { brand: "merries", series: "學行褲", type: "pants", size: "L", count: 44, store: "HKTVmall", price: 186 },
  { brand: "merries", series: "學行褲", type: "pants", size: "L", count: 44, store: "萬寧", price: 194 },
  { brand: "merries", series: "學行褲", type: "pants", size: "XL", count: 38, store: "一田", price: 182, originalPrice: 208, promoLabel: "單件 9 折", promoEnds: "2026-11-18" },
  { brand: "merries", series: "學行褲", type: "pants", size: "XL", count: 38, store: "屈臣氏", price: 196 },
  { brand: "moony", series: "極上", type: "tape", size: "S", count: 84, store: "HKTVmall", price: 228 },
  { brand: "moony", series: "極上", type: "tape", size: "S", count: 84, store: "一田", price: 238 },
  { brand: "moony", series: "極上", type: "tape", size: "M", count: 64, store: "屈臣氏", price: 206 },
  { brand: "moony", series: "極上", type: "tape", size: "M", count: 64, store: "HKTVmall", price: 196, originalPrice: 228, promoLabel: "85 折", promoEnds: "2026-11-12" },
  { brand: "moony", series: "極上", type: "tape", size: "L", count: 54, store: "HKTVmall", price: 186 },
  { brand: "moony", series: "極上", type: "tape", size: "L", count: 54, store: "一田", price: 196 },
  { brand: "moony", series: "極上", type: "tape", size: "L", count: 54, store: "萬寧", price: 202 },
  { brand: "moony", series: "極上", type: "tape", size: "XL", count: 44, store: "HKTVmall", price: 192, originalPrice: 222, promoLabel: "快閃", promoEnds: "2026-11-20" },
  { brand: "moony", series: "有機棉", type: "tape", size: "M", count: 46, store: "一田", price: 228 },
  { brand: "moony", series: "有機棉", type: "tape", size: "M", count: 46, store: "屈臣氏", price: 238 },
  { brand: "moony", series: "有機棉", type: "tape", size: "L", count: 38, store: "HKTVmall", price: 198, originalPrice: 238, promoLabel: "日本尿片週", promoEnds: "2026-11-18" },
  { brand: "moony", series: "有機棉", type: "tape", size: "L", count: 38, store: "一田", price: 208 },
  { brand: "moony", series: "極上", type: "pants", size: "L", count: 44, store: "萬寧", price: 196 },
  { brand: "moony", series: "極上", type: "pants", size: "L", count: 44, store: "HKTVmall", price: 188 },
  { brand: "moony", series: "極上", type: "pants", size: "XL", count: 36, store: "一田", price: 186 },
  { brand: "moony", series: "極上", type: "pants", size: "XL", count: 36, store: "惠康", price: 192 },
  { brand: "moony", series: "極上", type: "pants", size: "XXL", count: 26, store: "一田", price: 168 },
  { brand: "moony", series: "極上", type: "pants", size: "XXL", count: 26, store: "HKTVmall", price: 162, originalPrice: 188, promoLabel: "快閃", promoEnds: "2026-11-16" },
];

export const listings: Listing[] = offers.map((offer) => ({
  ...offer,
  id: `${offer.brand}-${offer.series}-${offer.type}-${offer.size}-${offer.store}`,
}));

export const stores = [...new Set(listings.map((item) => item.store))];

export const campaigns: Campaign[] = [
  {
    id: "hktv-flash",
    store: "HKTVmall",
    title: "日本尿片快閃 85 折",
    detail: "指定妙而舒及滿意寶寶包裝，以折後價結帳。滿 $300 免運。",
    ends: "2026-11-12",
    brands: ["merries", "moony"],
  },
  {
    id: "wellcome-member",
    store: "惠康",
    title: "會員週：好奇金裝再減",
    detail: "易賞錢會員購買指定好奇金裝紙尿片，貨架價已反映會員優惠。",
    ends: "2026-11-15",
    brands: ["huggies"],
  },
  {
    id: "yata-jp",
    store: "一田",
    title: "日本尿片週 9 折",
    detail: "妙而舒、滿意寶寶單件 9 折，學行褲同價。",
    ends: "2026-11-18",
    brands: ["merries", "moony"],
  },
  {
    id: "mannings",
    store: "萬寧",
    title: "尿片滿 $300 送 $30 券",
    detail: "易賞錢會員單據滿 $300，送下一張可用的 $30 現金券。券未計入下列包裝價。",
    ends: "2026-11-20",
    brands: ["pampers", "huggies", "merries", "moony"],
  },
  {
    id: "parknshop",
    store: "百佳",
    title: "幫寶適極致乾爽滿額減",
    detail: "極致乾爽買滿 $400 減 $40。下列包裝價為減額前售價。",
    ends: "2026-11-30",
    brands: ["pampers"],
  },
  {
    id: "watsons",
    store: "屈臣氏",
    title: "一級幫學行褲第二件 95 折",
    detail: "同一尺碼第二件 95 折，第一件維持正價。",
    ends: "2026-11-22",
    brands: ["pampers"],
  },
];

export const dataAsOf = "2026-11-09";
