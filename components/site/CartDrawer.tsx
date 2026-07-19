"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatKrw } from "@/lib/format";
import { ProductThumb } from "./ProductCard";

export function CartDrawer() {
  const { isOpen, closeCart, lines, setQuantity, removeItem, totalPrice, totalCount } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={closeCart}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col bg-surface shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-bold">장바구니 ({totalCount})</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="장바구니 닫기"
            className="text-ink-muted hover:text-ink"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-ink-muted">
              <p>장바구니가 비어 있습니다.</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="text-sm font-medium text-primary underline underline-offset-4"
              >
                상품 보러가기
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.product.id} className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <ProductThumb product={line.product} />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold">{line.product.name}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(line.product.id)}
                        aria-label={`${line.product.name} 삭제`}
                        className="text-xs text-ink-muted hover:text-danger"
                      >
                        삭제
                      </button>
                    </div>
                    <span className="text-sm text-ink-muted">
                      {formatKrw(line.product.price)}
                    </span>
                    <div className="mt-2 flex items-center rounded-lg border border-border w-fit">
                      <button
                        type="button"
                        aria-label="수량 감소"
                        onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                        className="px-2.5 py-1 text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="수량 증가"
                        onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                        className="px-2.5 py-1 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-ink-muted">총 결제금액</span>
            <span className="text-lg font-bold">{formatKrw(totalPrice)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeCart}
            aria-disabled={lines.length === 0}
            className={`block w-full rounded-lg py-3 text-center text-sm font-semibold transition-opacity ${
              lines.length === 0
                ? "pointer-events-none bg-canvas-subtle text-ink-muted"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            주문하기
          </Link>
        </div>
      </div>
    </div>
  );
}
