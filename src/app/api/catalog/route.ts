import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { INITIAL_PRODUCTS, INITIAL_SCENTS, INITIAL_CONFIG } from "@/lib/constants";
import { fromDbConfig, fromDbProduct, fromDbScent, fromDbOrder } from "@/lib/db-mappers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const [cfg, prods, scs, ords] = await Promise.all([
      supabase.from("store_config").select("*").eq("id", 1).maybeSingle(),
      supabase.from("products").select("*").order("sort_order", { ascending: true }),
      supabase.from("scents").select("*"),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(200),
    ]);

    const config = cfg.data ? fromDbConfig(cfg.data as any) : INITIAL_CONFIG;
    const products = prods.data && prods.data.length ? (prods.data as any[]).map(fromDbProduct) : INITIAL_PRODUCTS;
    const scents = scs.data && scs.data.length ? (scs.data as any[]).map(fromDbScent) : INITIAL_SCENTS;
    const orders = ords.data ? (ords.data as any[]).map(fromDbOrder) : [];

    return NextResponse.json({ config, products, scents, orders });
  } catch (e: any) {
    return NextResponse.json(
      { config: INITIAL_CONFIG, products: INITIAL_PRODUCTS, scents: INITIAL_SCENTS, orders: [], error: e?.message },
      { status: 200 }
    );
  }
}
