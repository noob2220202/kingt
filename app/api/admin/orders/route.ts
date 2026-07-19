import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import { listOrders } from "@/lib/store";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }
  const orders = await listOrders();
  return NextResponse.json({ orders });
}
