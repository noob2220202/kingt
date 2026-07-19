"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/Toast";
import { formatKrw } from "@/lib/format";
import type { Order } from "@/lib/types";

const LAST_ORDER_KEY = "king-gift-last-order";

export default function CheckoutPage() {
  const { lines, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (lines.length === 0) {
      showToast("장바구니가 비어 있습니다.", "error");
      return;
    }
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.address.trim()) {
      showToast("주문자 정보를 모두 입력해 주세요.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: lines.map((l) => ({ productId: l.product.id, quantity: l.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error ?? "주문 처리 중 오류가 발생했습니다.", "error");
        return;
      }
      const order: Order = data.order;
      window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      clearCart();
      router.push("/checkout/complete");
    } catch {
      showToast("네트워크 오류가 발생했습니다.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-xl font-bold">장바구니가 비어 있습니다</h1>
        <Link
          href="/products"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          상품 보러가기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3">
      <form
        id="checkout-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:col-span-2"
      >
        <h1 className="text-2xl font-bold">주문/결제</h1>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-semibold">주문자 정보</h2>
          <div className="mt-4 flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-sm">
              이름
              <input
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="rounded-lg border border-border bg-canvas px-3 py-2 outline-none focus:border-primary"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              연락처
              <input
                required
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="010-0000-0000"
                className="rounded-lg border border-border bg-canvas px-3 py-2 outline-none focus:border-primary"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              이메일
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="rounded-lg border border-border bg-canvas px-3 py-2 outline-none focus:border-primary"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              배송지 주소
              <input
                required
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="rounded-lg border border-border bg-canvas px-3 py-2 outline-none focus:border-primary"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-semibold">주문 상품</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {lines.map((line) => (
              <li key={line.product.id} className="flex justify-between text-sm">
                <span>
                  {line.product.name} × {line.quantity}
                </span>
                <span className="font-medium">
                  {formatKrw(line.product.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 lg:hidden"
        >
          {submitting ? "주문 처리 중..." : `${formatKrw(totalPrice)} 결제하기`}
        </button>
      </form>


      <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-semibold">결제 요약</h2>
        <div className="mt-4 flex justify-between text-sm text-ink-muted">
          <span>상품 금액</span>
          <span>{formatKrw(totalPrice)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-ink-muted">
          <span>배송비</span>
          <span>0원</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-bold">
          <span>총 결제금액</span>
          <span>{formatKrw(totalPrice)}</span>
        </div>
        <button
          type="submit"
          form="checkout-form"
          disabled={submitting}
          className="mt-5 hidden w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 lg:block"
        >
          {submitting ? "주문 처리 중..." : "결제하기"}
        </button>
      </aside>
    </div>
  );
}
