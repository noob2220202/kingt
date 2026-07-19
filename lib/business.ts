export interface BusinessInfo {
  companyName: string | null;
  ceoName: string | null;
  businessRegNo: string | null;
  address: string | null;
  mailOrderRegNo: string | null;
  csPhone: string | null;
  csEmail: string | null;
}

export const BUSINESS_INFO: BusinessInfo = {
  companyName: "킹상품권",
  ceoName: "전민재",
  businessRegNo: "755-94-01767",
  address: "부산광역시 사하구 장림번영로 50",
  mailOrderRegNo: null,
  csPhone: null,
  csEmail: null,
};
