import { NextRequest, NextResponse } from "next/server";
import { ADMIN_CREDENTIALS } from "@/lib/constants";
import { createAdminToken, COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (username?.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = createAdminToken();
      const res = NextResponse.json({ ok: true });
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }
    return NextResponse.json({ ok: false, error: "Credenciais inválidas" }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida" }, { status: 400 });
  }
}
