import Link from "next/link";
import { BUSINESS_INFO, SITE_NAME } from "@/lib/business";

const FOOTER_GROUPS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "고객센터",
    links: [
      { href: "/shipping", label: "배송안내" },
      { href: "/returns", label: "교환·환불" },
      { href: "/guide", label: "이용안내" },
    ],
  },
  {
    title: "회사",
    links: [
      { href: "/company", label: "회사소개" },
      { href: "/stores", label: "매장찾기" },
      { href: "/careers", label: "채용" },
    ],
  },
  {
    title: "정책",
    links: [
      { href: "/terms", label: "이용약관" },
      { href: "/privacy", label: "개인정보처리방침" },
    ],
  },
];

export function SiteFooter() {
  const infoRows = [
    BUSINESS_INFO.companyName && ["상호", BUSINESS_INFO.companyName],
    BUSINESS_INFO.ceoName && ["대표자", BUSINESS_INFO.ceoName],
    BUSINESS_INFO.businessRegNo && ["사업자등록번호", BUSINESS_INFO.businessRegNo],
    BUSINESS_INFO.address && ["주소", BUSINESS_INFO.address],
    BUSINESS_INFO.mailOrderRegNo && ["통신판매업신고번호", BUSINESS_INFO.mailOrderRegNo],
    BUSINESS_INFO.csEmail && ["이메일", BUSINESS_INFO.csEmail],
    BUSINESS_INFO.csPhone && ["고객센터", BUSINESS_INFO.csPhone],
  ].filter((row): row is [string, string] => Boolean(row));

  return (
    <footer className="mt-16 border-t border-border bg-canvas-subtle">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-lg font-extrabold">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-ink-muted">
              믿을 수 있는 상품권 전문 쇼핑몰
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold">{group.title}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {infoRows.length > 0 && (
          <div className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-ink-muted">
            <p className="flex flex-wrap gap-x-3 gap-y-1">
              {infoRows.map(([label, value]) => (
                <span key={label}>
                  {label} {value}
                </span>
              ))}
            </p>
            <p className="mt-3">
              © {BUSINESS_INFO.foundedYear} {BUSINESS_INFO.companyName}. All rights
              reserved.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
