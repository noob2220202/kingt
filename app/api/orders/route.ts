import { NextResponse } from "next/server";
import { createOrder } from "@/lib/store";

interface CheckoutBody {
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  items?: { productId?: string; quantity?: number }[];
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const customer = body.customer;
  if (
    !customer?.name?.trim() ||
    !customer?.phone?.trim() ||
    !customer?.email?.trim() ||
    !customer?.address?.trim()
  ) {
    return NextResponse.json(
      { error: "주문자 정보를 모두 입력해 주세요." },
      { status: 400 }
    );
  }

  const items = (body.items ?? []).filter(
    (item): item is { productId: string; quantity: number } =>
      typeof item.productId === "string" &&
      typeof item.quantity === "number" &&
      item.quantity > 0
  );

  if (items.length === 0) {
    return NextResponse.json({ error: "장바구니가 비어 있습니다." }, { status: 400 });
  }

  try {
    const order = await createOrder({
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email.trim(),
        address: customer.address.trim(),
      },
      items,
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "주문 처리 중 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}
