import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "킹상품권 - 믿을 수 있는 상품권 쇼핑몰",
    template: "%s | 킹상품권",
  },
  description:
    "문화상품권, 컬쳐랜드, 백화점상품권까지 한 번에. 킹상품권에서 안전하고 빠르게 구매하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
