import type { ProductCategory } from "@/lib/types";

const ICON_PATHS: Record<ProductCategory, React.ReactNode> = {
  culture: (
    <>
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a1.5 1.5 0 0 0 0 3v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a1.5 1.5 0 0 0 0-3Z" />
      <path d="M9 6v12" strokeDasharray="2.5 2.5" />
    </>
  ),
  content: (
    <>
      <rect x="2.5" y="7" width="19" height="11" rx="4" />
      <path d="M7.5 10v4M5.5 12h4" />
      <circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="13" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  department: (
    <>
      <path d="M6 8h12l1 12H5Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  life: (
    <>
      <path d="M3 4h2l2.2 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="9.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  cafe: (
    <>
      <path d="M4 8h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
      <path d="M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 3.5c1 .8 1 1.7 0 2.5s-1 1.7 0 2.5" />
      <path d="M12 3.5c1 .8 1 1.7 0 2.5s-1 1.7 0 2.5" />
    </>
  ),
};

export function CategoryIcon({
  category,
  className,
}: {
  category: ProductCategory;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICON_PATHS[category]}
    </svg>
  );
}
