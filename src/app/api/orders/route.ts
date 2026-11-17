import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { toDbOrder, fromDbOrder } from "@/lib/db-mappers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getServiceSupabase();
    const dbOrder = toDbOrder(body);
    const { data, error } = await supabase.from("orders").upsert(dbOrder).select("*").single();
    if (error) throw error;
    return NextResponse.json({ order: fromDbOrder(data as any) });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao salvar pedido" }, { status: 500 });
  }
}
