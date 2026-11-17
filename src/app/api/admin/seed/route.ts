import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { INITIAL_PRODUCTS, INITIAL_SCENTS, INITIAL_CONFIG } from "@/lib/constants";
import { toDbConfig, toDbProduct, toDbScent } from "@/lib/db-mappers";
import { isAdminAuthed } from "@/lib/admin-auth";

export async function POST() {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  try {
    const supabase = getServiceSupabase();
    // reset tables and seed
    await supabase.from("products").delete().neq("id", "");
    await supabase.from("scents").delete().neq("id", "");
    await supabase.from("store_config").upsert(toDbConfig(INITIAL_CONFIG));
    await supabase.from("products").upsert(INITIAL_PRODUCTS.map((p, i) => toDbProduct(p, i + 1)));
    await supabase.from("scents").upsert(INITIAL_SCENTS.map(toDbScent));
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao restaurar padrão" }, { status: 500 });
  }
}
