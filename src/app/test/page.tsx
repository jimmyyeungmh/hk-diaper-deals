import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const result = await supabase
    .from("products")
    .select("*");

  return (
    <pre>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}