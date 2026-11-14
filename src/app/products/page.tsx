import { supabase } from "@/lib/supabase";

export default async function ProductsPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>產品列表</h1>

      {data?.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{product.brand}</h3>
          <p>系列：{product.series}</p>
          <p>尺碼：{product.size}</p>
          <p>片數：{product.pieces}</p>
        </div>
      ))}
    </main>
  );
}