export function formatKrw(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const CATEGORY_LABELS: Record<string, string> = {
  culture: "문화상품권",
  content: "콘텐츠/게임",
  department: "백화점상품권",
  life: "마트/생활",
  cafe: "카페/외식",
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending_payment: "결제대기",
  paid: "결제완료",
  preparing: "배송준비",
  shipping: "배송중",
  delivered: "배송완료",
  cancelled: "취소",
};

export const ORDER_STATUSES = [
  "pending_payment",
  "paid",
  "preparing",
  "shipping",
  "delivered",
  "cancelled",
] as const;

export const ORDER_STATUS_BADGE_CLASSES: Record<string, string> = {
  pending_payment: "bg-warning-bg text-warning",
  paid: "bg-info-bg text-info",
  preparing: "bg-info-bg text-info",
  shipping: "bg-progress-bg text-progress",
  delivered: "bg-success-bg text-success",
  cancelled: "bg-danger-bg text-danger",
};
