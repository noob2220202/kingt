"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { StatCard } from "./StatCard";
import {
  ORDER_STATUSES,
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_STATUS_LABELS,
  formatDateTime,
  formatKrw,
} from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/types";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pendingCount: number;
  memberCount: number;
}

export function AdminDashboard({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  async function loadData() {
    setLoading(true);
    try {
      const [ordersRes, statsRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/stats"),
      ]);
      if (ordersRes.status === 401 || statsRes.status === 401) {
        router.refresh();
        return;
      }
      const ordersData = await ordersRes.json();
      const statsData = await statsRes.json();
      setOrders(ordersData.orders);
      setStats(statsData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      showToast("상태 변경에 실패했습니다.", "error");
      return;
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast("주문 상태가 변경되었습니다.");
    const statsRes = await fetch("/api/admin/stats");
    if (statsRes.ok) setStats(await statsRes.json());
  }

  async function handleDelete(orderId: string, orderNumber: string) {
    if (!window.confirm(`주문번호 ${orderNumber}을(를) 삭제하시겠습니까?`)) return;
    const res = await fetch(`/api/admin/orders/${orderId}`, { method: "DELETE" });
    if (!res.ok) {
      showToast("주문 삭제에 실패했습니다.", "error");
      return;
    }
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast("주문이 삭제되었습니다.");
    const statsRes = await fetch("/api/admin/stats");
    if (statsRes.ok) setStats(await statsRes.json());
  }

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    for (const status of ORDER_STATUSES) {
      counts[status] = orders.filter((o) => o.status === status).length;
    }
    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (!query) return true;
      return (
        o.orderNumber.toLowerCase().includes(query) ||
        o.customer.name.toLowerCase().includes(query) ||
        o.customer.email.toLowerCase().includes(query) ||
        o.customer.phone.toLowerCase().includes(query)
      );
    });
  }, [orders, statusFilter, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">킹상품권 관리자</h1>
          <p className="text-sm text-ink-muted">{adminEmail}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-canvas-subtle"
        >
          로그아웃
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="총 주문 수" value={stats ? `${stats.totalOrders}건` : "-"} />
        <StatCard
          label="매출 합계"
          value={stats ? formatKrw(stats.totalRevenue) : "-"}
          highlight
        />
        <StatCard label="결제대기" value={stats ? `${stats.pendingCount}건` : "-"} />
        <StatCard label="전체 회원 수" value={stats ? `${stats.memberCount}명` : "-"} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            statusFilter === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-surface hover:bg-canvas-subtle"
          }`}
        >
          전체 ({statusCounts.all ?? 0})
        </button>
        {ORDER_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              statusFilter === status
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface hover:bg-canvas-subtle"
            }`}
          >
            {ORDER_STATUS_LABELS[status]} ({statusCounts[status] ?? 0})
          </button>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="주문번호, 이름, 이메일, 연락처로 검색"
          className="w-full max-w-md rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-border bg-canvas-subtle text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">주문번호</th>
              <th className="px-4 py-3 font-medium">주문자</th>
              <th className="px-4 py-3 font-medium">주문 상품</th>
              <th className="px-4 py-3 font-medium">금액</th>
              <th className="px-4 py-3 font-medium">주문일시</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-muted">
                  불러오는 중...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-muted">
                  조건에 맞는 주문이 없습니다.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customer.name}</span>
                      <span className="text-xs text-ink-muted">{order.customer.phone}</span>
                      <span className="text-xs text-ink-muted">{order.customer.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      {order.items.map((item) => (
                        <span key={item.productId}>
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                      <span className="text-xs text-ink-muted">{order.customer.address}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatKrw(order.totalAmount)}</td>
                  <td className="px-4 py-3 text-ink-muted">
                    {formatDateTime(order.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
                        ORDER_STATUS_BADGE_CLASSES[order.status]
                      }`}
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {ORDER_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(order.id, order.orderNumber)}
                      className="text-xs font-medium text-danger hover:underline"
                    >
                      주문 삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
