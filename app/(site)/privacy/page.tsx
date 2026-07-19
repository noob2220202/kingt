import { InfoPage, InfoSection } from "@/components/site/InfoPage";

export const metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return (
    <InfoPage title="개인정보처리방침">
      <InfoSection title="1. 수집하는 개인정보 항목">
        <p>주문 시 이름, 연락처, 이메일, 배송지 주소를 수집합니다.</p>
      </InfoSection>
      <InfoSection title="2. 개인정보의 수집 및 이용 목적">
        <ul className="list-disc pl-5">
          <li>상품 주문 및 핀번호 발송</li>
          <li>주문/배송 관련 안내 및 고객 응대</li>
          <li>부정 이용 방지 및 서비스 개선</li>
        </ul>
      </InfoSection>
      <InfoSection title="3. 개인정보의 보유 및 이용기간">
        <p>회원 탈퇴 또는 목적 달성 시까지 보관하며, 관련 법령에 따라 일정 기간 보관될 수 있습니다.</p>
      </InfoSection>
      <InfoSection title="4. 개인정보의 파기">
        <p>수집 및 이용 목적이 달성된 개인정보는 지체 없이 파기합니다.</p>
      </InfoSection>
    </InfoPage>
  );
}
