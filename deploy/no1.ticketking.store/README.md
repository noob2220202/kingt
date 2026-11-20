# no1.ticketking.store 배포 가이드 (Caddy + pm2)

| 항목 | 값 |
| --- | --- |
| 도메인 | `no1.ticketking.store` |
| 서버 IP | `119.205.221.171` |
| 앱 경로 | `/var/www/no1.ticketking.store` (1번 사이트와 별도 체크아웃) |
| 내부 포트 | `127.0.0.1:3001` (1번 사이트는 3000) |
| pm2 이름 | `ticketking-no1` |
| 대표자 / 고객센터 | 정무성 / 010-2245-1756 |

> 1번 사이트와 **폴더를 따로** 씁니다. 사이트 이름은 빌드할 때 박혀 들어가고, 주문
> 데이터(`.data/store.json`)도 폴더 기준이라 같은 폴더를 쓰면 주문이 섞입니다.

---

## 0. DNS (도메인 업체 관리 화면)

| 타입 | 호스트 | 값 |
| --- | --- | --- |
| A | `no1` | `119.205.221.171` |
| A (선택) | `www.no1` | `119.205.221.171` |

확인: `dig +short no1.ticketking.store` → `119.205.221.171` 이 나와야 다음 단계 진행.
(DNS가 안 잡힌 상태로 Caddy를 띄우면 인증서 발급이 실패합니다.)

## 1. 서버 기본 준비 (처음 한 번만, Ubuntu 기준)

```bash
ssh root@119.205.221.171

# Node.js 20 + pm2
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git
npm install -g pm2

# Caddy
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update && apt-get install -y caddy

# 방화벽 (ufw 쓰는 경우) — 80/443 열고 3000/3001은 외부에 열지 않음
ufw allow 22 && ufw allow 80 && ufw allow 443 && ufw enable
```

> 호스팅사(카페24/가비아/NHN 등) 콘솔에 별도 방화벽/보안그룹이 있으면 거기서도
> **80, 443** 인바운드를 열어야 합니다.

## 2. 앱 설치

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/noob2220202/kingt.git no1.ticketking.store
cd no1.ticketking.store
git checkout <배포할 브랜치>

cp deploy/no1.ticketking.store/env.production.example .env.production
nano .env.production
```

`.env.production`에서 채울 것:

- `ADMIN_SESSION_SECRET` — `openssl rand -hex 32` 결과 붙여넣기 (**필수**)
- `BUSINESS_REG_NO`, `BUSINESS_ADDRESS`, `BUSINESS_MAIL_ORDER_REG_NO` — **정무성 대표
  본인 명의** 사업자 정보. 아직 없으면 빈 값으로 두면 화면에서 숨겨집니다.
  (줄 자체를 지우면 1번 사이트 사업자번호·주소가 기본값으로 나오니 지우지 마세요.)

```bash
npm ci
npm run build
pm2 start deploy/no1.ticketking.store/ecosystem.config.js
pm2 save
pm2 startup          # 출력되는 명령을 그대로 한 번 실행 (재부팅 시 자동 시작)

curl -I http://127.0.0.1:3001   # 200 나오면 OK
```

## 3. Caddy 설정

**이 서버에 Caddy를 처음 쓰는 경우**

```bash
cp deploy/no1.ticketking.store/Caddyfile /etc/caddy/Caddyfile
mkdir -p /var/log/caddy && chown caddy:caddy /var/log/caddy
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

**이미 1번 사이트가 Caddy로 돌고 있는 경우** — 기존 파일을 덮어쓰지 말고 블록만 추가:

```bash
cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak
cat deploy/no1.ticketking.store/Caddyfile >> /etc/caddy/Caddyfile
mkdir -p /var/log/caddy && chown caddy:caddy /var/log/caddy
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

> 80/443을 nginx·apache가 이미 쓰고 있으면 Caddy가 못 뜹니다.
> `ss -ltnp | grep -E ':80|:443'` 로 확인 후 기존 웹서버를 내리거나 그쪽에 설정해야 합니다.

확인:

```bash
journalctl -u caddy -n 50 --no-pager   # "certificate obtained successfully" 보이면 OK
curl -I https://no1.ticketking.store
```

## 4. 관리자

- 주소: `https://no1.ticketking.store/admin`
- 초기 계정: `admin@king-gift.local` / `KingGift!2026#Admin` (코드에 공개된 값이므로
  운영 전 변경 필요)
- 최초 실행 시 `.data/store.json`에 **샘플 주문 10건**이 자동 생성됩니다. 실제 오픈
  전에 어드민에서 삭제하세요.

## 5. 업데이트 / 운영 명령

```bash
cd /var/www/no1.ticketking.store
git pull
npm ci
npm run build
pm2 restart ticketking-no1

pm2 logs ticketking-no1      # 앱 로그
pm2 status
systemctl status caddy
```

`.env.production` 값을 바꿨을 때도 `npm run build` 후 restart 해야 반영됩니다.

## 문제 해결

| 증상 | 원인 / 조치 |
| --- | --- |
| HTTPS 인증서 발급 실패 | DNS 미반영, 80/443 막힘, 다른 웹서버가 포트 점유 |
| 502 Bad Gateway | 앱이 안 떠 있음 → `pm2 logs ticketking-no1` |
| 사이트에 1번 사이트 사업자번호가 보임 | `.env.production`에서 `BUSINESS_REG_NO=` 줄이 빠짐 → 추가 후 재빌드 |
| 어드민 로그인이 계속 풀림 | `ADMIN_SESSION_SECRET` 미설정 |
