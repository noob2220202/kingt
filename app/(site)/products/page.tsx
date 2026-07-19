import Link from "next/link";
import { listProducts } from "@/lib/store";
import { CATEGORY_LABELS } from "@/lib/format";
import { ProductCard } from "@/components/site/ProductCard";
import type { ProductCategory } from "@/lib/types";

export const metadata = {
  title: "전체 상품",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await listProducts();
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const categories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold">전체 상품</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            !category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-canvas-subtle"
          }`}
        >
          전체
        </Link>
        {categories.map(([key, label]) => (
          <Link
            key={key}
            href={`/products?category=${key}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              category === key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-canvas-subtle"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-ink-muted">
          해당 카테고리의 상품이 없습니다.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
