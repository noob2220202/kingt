"use client";

import { useCart } from "@/lib/cart-context";
import { useQuickView } from "@/lib/quickview-context";
import { useToast } from "@/components/Toast";
import { CATEGORY_LABELS, formatKrw } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductThumb({ product }: { product: Product }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center text-2xl font-bold text-white"
      style={{
        background: `linear-gradient(135deg, ${product.colorFrom}, ${product.colorTo})`,
      }}
    >
      {product.name.slice(0, 1)}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { open } = useQuickView();
  const { showToast } = useToast();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden">
        <ProductThumb product={product} />
        {product.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            베스트셀러
          </span>
        )}
        <button
          type="button"
          onClick={() => open(product)}
          className="absolute inset-x-3 bottom-3 translate-y-2 rounded-lg bg-canvas/90 py-2 text-sm font-medium text-ink opacity-0 backdrop-blur transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
          퀵뷰로 보기
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium text-ink-muted">
          {CATEGORY_LABELS[product.category]}
        </span>
        <h3 className="font-semibold leading-snug">{product.name}</h3>
        <p className="text-sm text-ink-muted line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-sm font-semibold text-danger">
            {product.discountRate}%
          </span>
          <span className="text-lg font-bold">{formatKrw(product.price)}</span>
          <span className="text-xs text-ink-muted line-through">
            {formatKrw(product.faceValue)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            addItem(product, 1);
            showToast(`${product.name}을(를) 장바구니에 담았습니다.`);
          }}
          className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
