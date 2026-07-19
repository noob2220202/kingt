import { InfoPage, InfoSection } from "@/components/site/InfoPage";
import { BUSINESS_INFO } from "@/lib/business";

export const metadata = { title: "매장찾기" };

const OFFICES = [
  {
    name: "본사 (부산)",
    address: BUSINESS_INFO.address ?? "",
    hours: "평일 09:00 - 18:00",
  },
];

export default function StoresPage() {
  return (
    <InfoPage title="매장찾기" lead="온라인 전문 판매처로, 오프라인 매장은 운영하지 않습니다.">
      <InfoSection title="사무실 안내">
        <div className="flex flex-col gap-3">
          {OFFICES.map((office) => (
            <div key={office.name} className="rounded-xl border border-border p-4">
              <p className="font-medium text-ink">{office.name}</p>
              <p className="mt-1">{office.address}</p>
              <p className="mt-1">운영시간: {office.hours}</p>
            </div>
          ))}
        </div>
      </InfoSection>
      <InfoSection title="온라인 문의">
        <p>모든 상담과 주문은 온라인으로 진행되며, 오프라인 방문 판매는 진행하지 않습니다.</p>
      </InfoSection>
    </InfoPage>
  );
}
