import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME } from "@/lib/business";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - 믿을 수 있는 상품권 쇼핑몰`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `문화상품권, 컬쳐랜드, 백화점상품권까지 한 번에. ${SITE_NAME}에서 안전하고 빠르게 구매하세요.`,
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
