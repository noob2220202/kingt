# 킹상품권 (King Gift Card Shop)

문화상품권/백화점상품권/콘텐츠 기프트카드를 판매하는 쇼핑몰입니다. Next.js App
Router + TypeScript + Tailwind CSS v4로 구현했으며, 별도 DB 없이 JSON 파일
(`.data/store.json`)로 상태를 영속화합니다.

## 기술 스택

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- 백엔드: Next.js Route Handler (`app/api/**`) — 별도 서버 없음
- 데이터 저장: `.data/store.json` (최초 실행 시 자동 시드, `.gitignore` 처리됨)
- 인증: scrypt 비밀번호 해시 + HMAC 서명 httpOnly 세션 쿠키 (8시간 만료)

## 시작하기

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다. 처음 API가 호출되는 시점에
`.data/store.json`이 없으면 자동으로 생성되고 상품/주문/회원/관리자 계정이
시드됩니다.

## 관리자 어드민

- 접속 경로: **`/admin`**
- 시드 관리자 계정
  - 이메일: `admin@king-gift.local`
  - 비밀번호: `KingGift!2026#Admin`
- 로그인 후 대시보드에서 통계 카드(총 주문 수 / 매출 합계 / 결제대기 / 전체
  회원 수), 상태별 필터 칩, 통합 검색, 주문 상태 변경(드롭다운), 주문 삭제가
  가능합니다.
- 모든 어드민 API(`app/api/admin/**`)는 서버에서 세션 쿠키를 검증하며,
  미인증 요청은 401을 반환합니다.
- 세션 서명 키는 `ADMIN_SESSION_SECRET` 환경변수로 주입합니다. 설정하지
  않으면 개발용 기본값이 사용되므로, **운영 배포 시 반드시 별도의 긴 임의
  문자열로 설정**해야 합니다.

## 백엔드 구조

```
app/api/products/route.ts            상품 목록 조회 (공개)
app/api/orders/route.ts              주문 생성 (공개, 체크아웃)
app/api/admin/login/route.ts         관리자 로그인
app/api/admin/logout/route.ts        관리자 로그아웃
app/api/admin/session/route.ts       세션 확인
app/api/admin/stats/route.ts         대시보드 통계 (인증 필요)
app/api/admin/orders/route.ts        주문 목록 조회 (인증 필요)
app/api/admin/orders/[id]/route.ts   주문 상태 변경 / 삭제 (인증 필요)

lib/store.ts       JSON 파일 기반 데이터 액세스 + 최초 시드
lib/auth.ts        scrypt 해시, HMAC 세션 토큰 발급/검증
lib/adminAuth.ts   Route Handler에서 세션 검증 헬퍼
```

주문번호는 `KG-YYYYMMDD-순번` 형식으로 발급되며, 같은 날짜의 최대 순번 + 1로
충돌 없이 채번됩니다.

## 검증

```bash
npm run lint
npm run build
```

E2E는 Playwright로 다음 시나리오를 직접 실행해 확인했습니다 (테스트 전용이며
`package.json`/커밋에는 포함하지 않았습니다): 미인증 접근 시 로그인 폼만
노출, 잘못된 비밀번호 에러, 정상 로그인, 통계 카드 4개, 상태 칩 필터링,
검색, 상태 드롭다운 변경 + 토스트, 삭제 confirm + 토스트, 로그아웃 후
재인증 요구, 그리고 실제 체크아웃 주문이 어드민에 반영되는 흐름까지 확인.

## 배포 (pm2 + Caddy, 복드림과 같은 방식)

사이트마다 pm2 앱 하나 + 고유 포트 하나를 띄우고, 도메인/HTTPS는 Caddy가
`reverse_proxy`로 연결합니다. 앱은 `127.0.0.1:<PORT>`에서만 듣습니다.

| 사이트 | pm2 이름 | 포트 | 도메인 |
| --- | --- | --- | --- |
| 1. 킹상품권 (대표자 정무성, 010-2245-1756) | `king-ticket-shop` | 9028 | `no1.ticketking.store` |

```bash
git pull
npm install
npm run build
pm2 restart ecosystem.config.js   # 최초 배포라면: pm2 start ecosystem.config.js
pm2 save
```

Caddy: `Caddyfile.snippet`의 블록을 `/etc/caddy/Caddyfile`에 추가하고
`sudo systemctl reload caddy`. DNS는 `no1.ticketking.store` A 레코드를
`119.205.221.171`로 연결합니다. Cloudflare를 쓰면
DNS only(회색 구름)로 둬야 인증서가 자동 발급됩니다.

사이트 추가: `ecosystem.config.js`의 앱 블록을 복사해 `name`/`PORT`/`STORE_FILE`
(예: `store-9029.json`)을 바꾸고, `Caddyfile.snippet`에 도메인 블록을 추가합니다.
`STORE_FILE`을 사이트별로 다르게 주면 주문/회원 데이터가 분리됩니다.

운영 환경에서는 `ADMIN_SESSION_SECRET` 값을 반드시 실제 비밀 값으로 교체하세요.
