"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDateTime, formatKrw } from "@/lib/format";
import type { Order } from "@/lib/types";

const LAST_ORDER_KEY = "king-gift-last-order";

export default function CheckoutCompletePage() {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(LAST_ORDER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of sessionStorage on mount
      setOrder(raw ? (JSON.parse(raw) as Order) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  if (order === undefined) return null;

  if (order === null) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-xl font-bold">주문 내역을 찾을 수 없습니다</h1>
        <Link
          href="/"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          홈으로 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <span className="text-4xl">✅</span>
        <h1 className="mt-4 text-2xl font-bold">주문이 완료되었습니다</h1>
        <p className="mt-2 text-ink-muted">주문해 주셔서 감사합니다.</p>

        <div className="mt-6 rounded-xl bg-canvas-subtle p-5 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-ink-muted">주문번호</span>
            <span className="font-semibold">{order.orderNumber}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-ink-muted">주문일시</span>
            <span>{formatDateTime(order.createdAt)}</span>
          </div>
          <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatKrw(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-bold">
            <span>총 결제금액</span>
            <span>{formatKrw(order.totalAmount)}</span>
          </div>
        </div>

        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  );
}
