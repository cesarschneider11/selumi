import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { toDbOrder, fromDbOrder } from "@/lib/db-mappers";
import { INITIAL_CONFIG } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getServiceSupabase();
    const cfg = await supabase.from("store_config").select("*").eq("id", 1).maybeSingle();
    const pixKey = (cfg.data?.pix_key as string | null | undefined) ?? INITIAL_CONFIG.pixKey;
    const pixKeyType = (cfg.data?.pix_key_type as string | null | undefined) ?? INITIAL_CONFIG.pixKeyType;
    const dbOrder = toDbOrder({ ...body, pixKey, pixKeyType });
    const { data, error } = await supabase.from("orders").upsert(dbOrder).select("*").single();
    if (error) throw error;
    return NextResponse.json({ order: fromDbOrder(data as any) });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao salvar pedido" }, { status: 500 });
  }
}
