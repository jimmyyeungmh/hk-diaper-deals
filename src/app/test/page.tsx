import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Supabase Test</h1>

      {data?.map((item) => (
        <div key={item.id}>
        {item.brand} {item.series} {item.size}
      </div>
      ))}
    </main>
  );
}