import { InfoPage, InfoSection } from "@/components/site/InfoPage";

export const metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <InfoPage title="이용약관">
      <InfoSection title="제1조 (목적)">
        <p>
          본 약관은 킹상품권(이하 &lsquo;회사&rsquo;)이 제공하는 상품권 판매 서비스의
          이용조건 및 절차, 회원과 회사의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </InfoSection>
      <InfoSection title="제2조 (서비스의 제공)">
        <p>
          회사는 문화상품권, 콘텐츠 기프트카드, 백화점상품권 등 각종 상품권을 온라인으로
          판매하며, 결제 완료 후 핀번호를 전자적으로 발송합니다.
        </p>
      </InfoSection>
      <InfoSection title="제3조 (계약의 성립)">
        <p>
          이용자가 주문/결제 절차를 완료하면 회사가 이를 승낙함으로써 계약이 성립되며,
          회사는 재고 상황 등에 따라 주문을 취소할 수 있습니다.
        </p>
      </InfoSection>
      <InfoSection title="제4조 (환불)">
        <p>미사용 상품권에 한해 교환·환불 정책에 따라 환불이 진행됩니다.</p>
      </InfoSection>
    </InfoPage>
  );
}
