"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { CATEGORY_LABELS } from "@/lib/format";
import { SITE_NAME } from "@/lib/business";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/products", label: "전체 상품" },
  { href: "/company", label: "회사소개" },
  { href: "/stores", label: "매장찾기" },
];

export function SiteHeader() {
  const { totalCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-xl sm:hidden"
          >
            ☰
          </button>
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            {SITE_NAME}
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <button
                type="button"
                className="text-ink-muted transition-colors hover:text-ink"
                onClick={() => setCategoryOpen((v) => !v)}
              >
                카테고리
              </button>
              {categoryOpen && (
                <div className="absolute left-0 top-full w-44 rounded-xl border border-border bg-surface py-2 shadow-lg">
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <Link
                      key={key}
                      href={`/products?category=${key}`}
                      className="block px-4 py-2 text-sm hover:bg-canvas-subtle"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        <button
          type="button"
          onClick={openCart}
          aria-label="장바구니 열기"
          className="relative flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-canvas-subtle"
        >
          🛒 장바구니
          {totalCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-bold text-white">
              {totalCount}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 text-sm font-medium sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2 hover:bg-canvas-subtle"
            >
              {link.label}
            </Link>
          ))}
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Link
              key={key}
              href={`/products?category=${key}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2 pl-5 text-ink-muted hover:bg-canvas-subtle"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
