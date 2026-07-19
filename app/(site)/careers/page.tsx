import { InfoPage, InfoSection } from "@/components/site/InfoPage";

export const metadata = { title: "채용" };

const POSITIONS = [
  { title: "상품권 MD", type: "정규직", location: "부산 본사" },
  { title: "고객상담 매니저", type: "정규직", location: "재택 가능" },
  { title: "백엔드 개발자", type: "정규직", location: "부산 본사" },
];

export default function CareersPage() {
  return (
    <InfoPage title="채용" lead="킹상품권과 함께 성장할 동료를 찾습니다.">
      <InfoSection title="채용 포지션">
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
          {POSITIONS.map((p) => (
            <div key={p.title} className="flex items-center justify-between px-4 py-3">
              <span className="font-medium text-ink">{p.title}</span>
              <span>{p.type}</span>
              <span>{p.location}</span>
            </div>
          ))}
        </div>
      </InfoSection>
      <InfoSection title="지원 방법">
        <p>이력서와 포트폴리오를 채용 담당 이메일로 보내주시면 순차적으로 검토 후 연락드립니다.</p>
      </InfoSection>
    </InfoPage>
  );
}
