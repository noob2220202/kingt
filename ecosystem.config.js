// 킹상품권 - pm2 실행 설정 (복드림 상품권과 같은 방식)
// - 사이트마다 pm2 앱 하나 + 고유 PORT 하나를 씁니다.
// - 도메인 연결/HTTPS는 Caddy가 담당합니다(Caddyfile.snippet 참고).
//   각 앱은 127.0.0.1:<PORT> 에서만 듣고, Caddy가 도메인 -> 포트로 reverse_proxy 합니다.
// - 포트는 같은 서버의 복드림(9011, 9015~9027)과 겹치지 않게 9028부터 씁니다.
//
// 사이트를 추가할 때는 아래 블록을 복사해서 name / PORT / STORE_FILE 을 바꾸고,
// Caddyfile.snippet 에도 도메인 블록을 하나 추가하면 됩니다.
// STORE_FILE 을 사이트별로 다르게 주면 주문/회원 데이터가 사이트(포트)별로 분리됩니다.
module.exports = {
  apps: [
    {
      // 사이트 1: 킹상품권 (대표자 전민재)
      name: "king-ticket-shop",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 9028,
        ADMIN_SESSION_SECRET: "change-this-to-a-long-random-value",
        // STORE_FILE 미지정 시 .data/store.json (기존 데이터 그대로 사용)
        // BUSINESS_CEO_NAME: "전민재",
      },
    },
  ],
};
