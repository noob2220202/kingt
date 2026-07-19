import { InfoPage, InfoSection } from "@/components/site/InfoPage";

export const metadata = { title: "교환·환불" };

export default function ReturnsPage() {
  return (
    <InfoPage title="교환·환불" lead="상품권 특성상 교환/환불 정책을 안내드립니다.">
      <InfoSection title="환불 가능 기간">
        <p>
          핀번호 미사용 건에 한해 발송 후 24시간 이내 환불 요청이 가능합니다. 고객센터로
          주문번호와 함께 요청해 주세요.
        </p>
      </InfoSection>
      <InfoSection title="환불 불가 사유">
        <ul className="list-disc pl-5">
          <li>핀번호를 사용(충전, 결제)한 경우</li>
          <li>발송 후 24시간이 경과한 경우</li>
          <li>단순 변심으로 인한 요청이 반복되는 경우</li>
        </ul>
      </InfoSection>
      <InfoSection title="오발송/오류 상품">
        <p>
          발송 오류(중복 발송, 금액 오류 등)가 확인되면 확인 즉시 정정 및 환불을 도와드립니다.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
