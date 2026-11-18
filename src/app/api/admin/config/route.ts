import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { toDbConfig } from "@/lib/db-mappers";
import { isAdminAuthed } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  try {
    const body = await req.json();
    const supabase = getServiceSupabase();
    const dbConfig = toDbConfig(body);
    let { error } = await supabase.from("store_config").upsert(dbConfig);
    if (error) {
      // fallback: tenta insert em caso de falha de upsert (ex.: row inexistente)
      const { error: insErr } = await supabase.from("store_config").insert(dbConfig);
      error = insErr || null;
    }
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao salvar config" }, { status: 500 });
  }
}
