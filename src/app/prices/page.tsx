import { supabase } from "@/lib/supabase";

export default async function PricesPage() {
  const { data, error } = await supabase
    .from("prices")
    .select("*");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>價格列表</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}