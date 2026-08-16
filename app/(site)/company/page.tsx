import { InfoPage, InfoSection } from "@/components/site/InfoPage";
import { BUSINESS_INFO, SITE_NAME } from "@/lib/business";

export const metadata = { title: "회사소개" };

export default function CompanyPage() {
  return (
    <InfoPage
      title="회사소개"
      lead={`${SITE_NAME}은 신뢰할 수 있는 상품권 유통 파트너입니다.`}
    >
      <InfoSection title="비전">
        <p>
          {SITE_NAME}은 &lsquo;가장 투명하고 빠른 상품권 거래&rsquo;를 목표로{" "}
          {BUSINESS_INFO.foundedYear}년 설립되었습니다. 문화상품권부터 백화점상품권,
          콘텐츠 기프트카드까지 다양한 상품을 합리적인 가격에 제공합니다.
        </p>
      </InfoSection>
      <InfoSection title="핵심 가치">
        <ul className="list-disc pl-5">
          <li>정품 정가 매입을 통한 투명한 유통 구조</li>
          <li>결제 완료 후 실시간 발송</li>
          <li>고객센터를 통한 빠른 응대</li>
        </ul>
      </InfoSection>
      <InfoSection title="사업자 정보">
        <ul className="flex flex-col gap-1">
          <li>상호: {BUSINESS_INFO.companyName}</li>
          <li>대표자: {BUSINESS_INFO.ceoName}</li>
          <li>사업자등록번호: {BUSINESS_INFO.businessRegNo}</li>
          <li>주소: {BUSINESS_INFO.address}</li>
          <li>업태 / 종목: 서비스업 / 상품권매매</li>
        </ul>
      </InfoSection>
    </InfoPage>
  );
}
