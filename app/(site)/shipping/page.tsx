import { InfoPage, InfoSection } from "@/components/site/InfoPage";

export const metadata = { title: "배송안내" };

export default function ShippingPage() {
  return (
    <InfoPage
      title="배송안내"
      lead="모든 상품은 온라인 핀번호 형태로 이메일과 문자로 발송됩니다."
    >
      <InfoSection title="발송 시간">
        <p>평일 오전 9시 ~ 오후 6시 사이 결제 완료 건은 접수 후 최대 30분 이내 발송됩니다.</p>
        <p>오후 6시 이후 또는 주말/공휴일 주문 건은 다음 영업일 오전 중 순차 발송됩니다.</p>
      </InfoSection>
      <InfoSection title="발송 방법">
        <ul className="list-disc pl-5">
          <li>주문 시 입력한 이메일 주소로 핀번호 및 사용 방법 안내</li>
          <li>연락처로 발송 완료 알림 문자 발송</li>
          <li>배송지 주소는 세금계산서 및 명세서 발송을 위한 정보로 사용됩니다.</li>
        </ul>
      </InfoSection>
      <InfoSection title="유의사항">
        <p>
          이메일 주소를 정확히 입력하지 않으면 발송이 지연될 수 있습니다. 발송 후 30분이
          지나도 수신되지 않을 경우 고객센터로 문의해 주세요.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
