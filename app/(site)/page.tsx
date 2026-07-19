import Link from "next/link";
import { listProducts } from "@/lib/store";
import { CATEGORY_LABELS } from "@/lib/format";
import { ProductCard } from "@/components/site/ProductCard";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import type { ProductCategory } from "@/lib/types";

const CATEGORY_ICONS: Record<ProductCategory, string> = {
  culture: "🎟️",
  content: "🎮",
  department: "🏬",
  life: "🛒",
  cafe: "☕",
};

export default async function HomePage() {
  const products = await listProducts();
  const bestsellers = products.filter((p) => p.bestseller);

  return (
    <div>
      <section className="bg-canvas-subtle">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            상품권 전문 쇼핑몰
          </span>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            필요한 상품권,
            <br className="sm:hidden" /> 킹상품권에서 가장 합리적으로
          </h1>
          <p className="max-w-xl text-ink-muted">
            문화상품권부터 백화점상품권, 콘텐츠 기프트카드까지 — 실시간 발송과 투명한
            할인율로 안전하게 구매하세요.
          </p>
          <div className="flex gap-3">
            <Link
              href="/products"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              전체 상품 보기
            </Link>
            <Link
              href="/guide"
              className="rounded-lg border border-border bg-canvas px-6 py-3 text-sm font-semibold hover:bg-canvas-subtle"
            >
              이용안내
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-bold">카테고리</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(Object.entries(CATEGORY_LABELS) as [ProductCategory, string][]).map(
            ([key, label]) => (
              <Link
                key={key}
                href={`/products?category=${key}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface py-6 text-sm font-medium transition-colors hover:bg-canvas-subtle"
              >
                <span className="text-2xl">{CATEGORY_ICONS[key]}</span>
                {label}
              </Link>
            )
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">베스트셀러</h2>
          <Link
            href="/products"
            className="text-sm font-medium text-primary underline underline-offset-4"
          >
            전체 보기
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "실시간 발송", desc: "결제 완료 즉시 핀번호를 발송해 드립니다." },
            { title: "안심 거래", desc: "전 주문 구매 내역과 배송 현황을 확인할 수 있어요." },
            { title: "투명한 할인율", desc: "상품별 할인율을 그대로 공개합니다." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-canvas-subtle py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <h2 className="text-xl font-bold">소식 받아보기</h2>
          <p className="text-sm text-ink-muted">
            신규 상품과 할인 소식을 이메일로 가장 먼저 받아보세요.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
