import { Suspense } from "react";
import { CompareExplorer } from "@/components/CompareExplorer";
import { CostCalculator } from "@/components/CostCalculator";
import { listings } from "@/data/diapers";

export const metadata = {
  title: "格價比較",
  description: "按品牌、尺碼、商戶比較香港尿片包裝價同每片成本。",
};

export default function ComparePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">格價比較</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        同一尺碼先好比較。每片成本用包裝售價除以片數，折扣排序只計算有正價的減價包裝。
      </p>
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-muted">載入報價…</p>}>
          <CompareExplorer listings={listings} />
        </Suspense>
      </div>
      <div className="mt-8">
        <CostCalculator listings={listings} />
      </div>
    </main>
  );
}
