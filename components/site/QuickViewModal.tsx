"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useQuickView } from "@/lib/quickview-context";
import { useToast } from "@/components/Toast";
import { CATEGORY_LABELS, formatKrw } from "@/lib/format";
import { ProductThumb } from "./ProductCard";

export function QuickViewModal() {
  const { product, close } = useQuickView();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} 퀵뷰`}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-2xl overflow-hidden rounded-2xl bg-surface shadow-xl"
      >
        <div className="hidden w-2/5 sm:block">
          <ProductThumb product={product} />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-ink-muted">
              {CATEGORY_LABELS[product.category]}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="text-ink-muted hover:text-ink"
            >
              ✕
            </button>
          </div>
          <h2 className="mt-1 text-xl font-bold">{product.name}</h2>
          <p className="mt-2 text-sm text-ink-muted">{product.description}</p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-sm font-semibold text-danger">
              {product.discountRate}%
            </span>
            <span className="text-xl font-bold">{formatKrw(product.price)}</span>
            <span className="text-xs text-ink-muted line-through">
              {formatKrw(product.faceValue)}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-sm text-ink-muted">수량</span>
            <div className="flex items-center rounded-lg border border-border">
              <button
                type="button"
                aria-label="수량 감소"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-lg"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                type="button"
                aria-label="수량 증가"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 text-lg"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              addItem(product, quantity);
              showToast(`${product.name}을(를) 장바구니에 담았습니다.`);
              close();
              setQuantity(1);
            }}
            className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {formatKrw(product.price * quantity)} 장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}
