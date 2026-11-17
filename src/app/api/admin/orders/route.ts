import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { isAdminAuthed } from "@/lib/admin-auth";

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  try {
    const { id, status } = await req.json();
    if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
    const supabase = getServiceSupabase();
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao atualizar pedido" }, { status: 500 });
  }
}

export async function DELETE() {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from("orders").delete().neq("id", "");
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao limpar pedidos" }, { status: 500 });
  }
}
