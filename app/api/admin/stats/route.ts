import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import { getStats } from "@/lib/store";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }
  const stats = await getStats();
  return NextResponse.json(stats);
}
