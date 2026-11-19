export const instant = false;

import { supabase } from "@/lib/supabase";

export default async function DealsPage() {
  const { data, error } = await supabase
    .from("prices")
    .select(`
      *,
      products(*),
      stores(*)
    `);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>尿片格價</h1>

      {data?.map((item: any) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <h3>
            {item.products.brand} {item.products.series}
          </h3>

          <p>尺碼：{item.products.size}</p>

          <p>片數：{item.products.pieces}</p>

          <p>店舖：{item.stores.name}</p>

          <p>價格：${item.price}</p>

          <p>
            每片：
            ${(item.price / item.products.pieces).toFixed(2)}
          </p>

          <p>優惠：{item.promotion}</p>
        </div>
      ))}
    </main>
  );
}