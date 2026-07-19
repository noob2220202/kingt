import { InfoPage, InfoSection } from "@/components/site/InfoPage";

export const metadata = { title: "이용안내" };

export default function GuidePage() {
  return (
    <InfoPage title="이용안내" lead="처음 이용하시는 분들을 위한 안내입니다.">
      <InfoSection title="구매 절차">
        <ol className="list-decimal pl-5">
          <li>원하는 상품권을 장바구니에 담습니다.</li>
          <li>주문/결제 페이지에서 주문자 정보를 입력합니다.</li>
          <li>결제 완료 후 이메일과 문자로 핀번호를 받습니다.</li>
        </ol>
      </InfoSection>
      <InfoSection title="유효기간">
        <p>
          상품권의 유효기간은 발행사 정책에 따르며, 대부분 발행일로부터 5년입니다. 정확한
          유효기간은 각 상품 상세 안내를 참고해 주세요.
        </p>
      </InfoSection>
      <InfoSection title="자주 묻는 질문">
        <p className="font-medium text-ink">Q. 핀번호는 어디서 확인하나요?</p>
        <p>A. 주문 시 입력하신 이메일과 문자로 발송됩니다.</p>
        <p className="mt-2 font-medium text-ink">Q. 대량 구매도 가능한가요?</p>
        <p>A. 고객센터로 문의 주시면 별도 안내해 드립니다.</p>
      </InfoSection>
    </InfoPage>
  );
}
