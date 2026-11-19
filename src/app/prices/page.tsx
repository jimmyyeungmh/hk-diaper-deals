import { supabase } from "@/lib/supabase";

export default async function PricesPage() {
  const { data, error } = await supabase
    .from("prices")
    .select("*");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>香港尿片格價</h1>

      {data?.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
          }}
        >
          Product {item.product_id}
          {" | "}
          Store {item.store_id}
          {" | "}
          HK${item.price}
        </div>
      ))}
    </main>
  );
}