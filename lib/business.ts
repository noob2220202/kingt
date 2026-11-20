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

export const BUSINESS_INFO: BusinessInfo = {
  companyName: process.env.BUSINESS_COMPANY_NAME || SITE_NAME,
  ceoName: process.env.BUSINESS_CEO_NAME || "정무성",
  businessRegNo: process.env.BUSINESS_REG_NO || "755-94-01767",
  address: process.env.BUSINESS_ADDRESS || "부산광역시 사하구 장림번영로 50",
  mailOrderRegNo: null,
  csPhone: process.env.BUSINESS_CS_PHONE || "010-2245-1756",
  csEmail: null,
  foundedYear: Number(process.env.BUSINESS_FOUNDED_YEAR) || 2024,
};
