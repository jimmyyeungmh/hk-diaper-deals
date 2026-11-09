import { PromoBoard } from "@/components/PromoBoard";
import { listings } from "@/data/diapers";

export const metadata = {
  title: "優惠活動",
  description: "香港尿片商戶優惠同減價包裝。",
};

export default function PromotionsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">優惠活動</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        商戶推廣同期貨架減價分開列出。滿額減價同現金券未計入每片成本。
      </p>
      <div className="mt-6">
        <PromoBoard listings={listings} />
      </div>
    </main>
  );
}
