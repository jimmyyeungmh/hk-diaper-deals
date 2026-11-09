import Link from "next/link";
import { BestDeals } from "@/components/BestDeals";
import { CostCalculator } from "@/components/CostCalculator";
import { DealCard } from "@/components/DealCard";
import { brands, campaigns, listings } from "@/data/diapers";
import { cheapestBy, costPerDiaper, daysLeft, formatUnit } from "@/lib/pricing";

export default function HomePage() {
  const lTape = listings.filter((item) => item.size === "L" && item.type === "tape");
  const champions = cheapestBy(lTape, (item) => item.brand);
  const lowest = [...lTape].sort((a, b) => costPerDiaper(a) - costPerDiaper(b))[0];
  const soon = campaigns.filter((item) => daysLeft(item.ends) <= 7);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <p className="text-sm font-medium text-ember">香港尿片格價</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">今日邊款尿片最抵？</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            比較幫寶適、好奇、妙而舒、滿意寶寶。包裝價錢唔等於每片價錢，格片幫你計清楚。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/compare?size=L&type=tape" className="rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-white">
              格價比較
            </Link>
            <Link href="/promotions" className="rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium">
              睇優惠
            </Link>
          </div>
        </div>
        {lowest ? (
          <div className="rounded-2xl bg-ink p-5 text-paper">
            <p className="text-sm text-gold">L 碼紙尿片最低</p>
            <p className="tabular mt-2 text-4xl font-bold">{formatUnit(costPerDiaper(lowest))}</p>
            <p className="mt-2 text-sm">
              {brands[lowest.brand].name} {lowest.series} · {lowest.store} · {lowest.count} 片
            </p>
          </div>
        ) : null}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">L 碼紙尿片，各品牌最平</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {champions.map((listing) => (
            <DealCard key={listing.id} listing={listing} badge="品牌最平" />
          ))}
        </div>
      </section>

      <div className="mt-12">
        <BestDeals listings={listings} />
      </div>

      <div className="mt-12">
        <CostCalculator listings={listings} />
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold">即將完結的優惠</h2>
          <Link href="/promotions" className="text-sm font-medium text-ember">
            全部優惠
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {soon.map((item) => (
            <article key={item.id} className="rounded-2xl border border-line bg-card p-4">
              <p className="text-sm text-ember">{item.store}</p>
              <h3 className="mt-1 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">尚餘 {daysLeft(item.ends)} 日</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
