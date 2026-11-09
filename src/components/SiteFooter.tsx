import { dataAsOf } from "@/data/diapers";
import { formatDate } from "@/lib/pricing";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">
        <p>價格為示範樣本，更新日期 {formatDate(dataAsOf)}。下單前請以商戶頁面為準。</p>
        <p className="mt-1">每片成本 = 包裝售價 ÷ 片數。門檻滿減及現金券未自動疊加。</p>
      </div>
    </footer>
  );
}
