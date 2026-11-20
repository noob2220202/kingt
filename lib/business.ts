export interface BusinessInfo {
  companyName: string | null;
  ceoName: string | null;
  businessRegNo: string | null;
  address: string | null;
  mailOrderRegNo: string | null;
  csPhone: string | null;
  csEmail: string | null;
  foundedYear: number;
}

// Marketing brand name shown in the header, page titles, and admin panel.
// Used from client components too, so must be NEXT_PUBLIC_-prefixed to be
// inlined at build time.
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "킹상품권";

// Unset → code default. Set to an empty string → field is hidden. This lets a
// second deployment hide another business's registration details instead of
// silently inheriting them.
function envField(name: string, fallback: string | null): string | null {
  const value = process.env[name];
  if (value === undefined) return fallback;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export const BUSINESS_INFO: BusinessInfo = {
  companyName: envField("BUSINESS_COMPANY_NAME", SITE_NAME),
  ceoName: envField("BUSINESS_CEO_NAME", "전민재"),
  businessRegNo: envField("BUSINESS_REG_NO", "755-94-01767"),
  address: envField("BUSINESS_ADDRESS", "부산광역시 사하구 장림번영로 50"),
  mailOrderRegNo: envField("BUSINESS_MAIL_ORDER_REG_NO", null),
  csPhone: envField("BUSINESS_CS_PHONE", null),
  csEmail: envField("BUSINESS_CS_EMAIL", null),
  foundedYear: Number(process.env.BUSINESS_FOUNDED_YEAR) || 2024,
};
