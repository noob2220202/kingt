import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { hashPassword } from "./auth";
import type {
  Member,
  Order,
  OrderCustomer,
  OrderItem,
  OrderStatus,
  Product,
  StoreData,
} from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

const ORDER_PREFIX = "KG";
export const ADMIN_SEED_EMAIL = "admin@king-gift.local";
export const ADMIN_SEED_PASSWORD = "KingGift!2026#Admin";

const PRODUCTS: Product[] = [
  {
    id: "p-culture-voucher",
    slug: "culture-voucher",
    name: "문화상품권",
    category: "culture",
    faceValue: 10000,
    price: 9500,
    discountRate: 5,
    description: "서점, 영화관, 공연장 등 전국 문화가맹점에서 사용 가능한 대표 상품권입니다.",
    bestseller: true,
    colorFrom: "#f5d36b",
    colorTo: "#e0a72e",
  },
  {
    id: "p-culatureland",
    slug: "culatureland",
    name: "컬쳐랜드상품권",
    category: "culture",
    faceValue: 10000,
    price: 9450,
    discountRate: 5.5,
    description: "온라인 게임, 웹툰, 도서까지 컬쳐랜드 가맹 서비스 전용 상품권입니다.",
    bestseller: true,
    colorFrom: "#8ad0ff",
    colorTo: "#3f8fd6",
  },
  {
    id: "p-happymoney",
    slug: "happymoney",
    name: "해피머니상품권",
    category: "culture",
    faceValue: 10000,
    price: 9400,
    discountRate: 6,
    description: "온라인 쇼핑몰과 콘텐츠 사이트에서 폭넓게 사용되는 해피머니 상품권입니다.",
    bestseller: false,
    colorFrom: "#ffb3c6",
    colorTo: "#ff6f91",
  },
  {
    id: "p-book-culture",
    slug: "book-culture-voucher",
    name: "도서문화상품권",
    category: "culture",
    faceValue: 10000,
    price: 9600,
    discountRate: 4,
    description: "전국 서점 및 도서 관련 가맹점에서 사용할 수 있는 도서 전용 상품권입니다.",
    bestseller: false,
    colorFrom: "#c9e4ca",
    colorTo: "#6fae7d",
  },
  {
    id: "p-google-play",
    slug: "google-play-giftcard",
    name: "구글플레이 기프트카드",
    category: "content",
    faceValue: 10000,
    price: 9700,
    discountRate: 3,
    description: "구글플레이 스토어 앱, 게임, 인앱결제에 사용 가능한 기프트카드입니다.",
    bestseller: true,
    colorFrom: "#a9f5c4",
    colorTo: "#3ddc84",
  },
  {
    id: "p-steam",
    slug: "steam-wallet",
    name: "스팀 지갑 코드",
    category: "content",
    faceValue: 10000,
    price: 9550,
    discountRate: 4.5,
    description: "스팀 게임 구매 및 인게임 결제에 사용할 수 있는 스팀 지갑 코드입니다.",
    bestseller: false,
    colorFrom: "#9fb3c8",
    colorTo: "#2f3b52",
  },
  {
    id: "p-netmarble",
    slug: "netmarble-culture",
    name: "넷마블문화상품권",
    category: "content",
    faceValue: 10000,
    price: 9500,
    discountRate: 5,
    description: "넷마블 게임 캐시 충전 및 문화 가맹점 결제가 모두 가능한 상품권입니다.",
    bestseller: false,
    colorFrom: "#ffd39b",
    colorTo: "#ff8b3d",
  },
  {
    id: "p-itemmania",
    slug: "itemmania-cash",
    name: "아이템매니아 캐시",
    category: "content",
    faceValue: 10000,
    price: 9350,
    discountRate: 6.5,
    description: "아이템매니아에서 게임 아이템 거래에 사용할 수 있는 캐시 상품권입니다.",
    bestseller: false,
    colorFrom: "#d9b8ff",
    colorTo: "#8b4dd6",
  },
  {
    id: "p-shinsegae",
    slug: "shinsegae-giftcard",
    name: "신세계상품권",
    category: "department",
    faceValue: 50000,
    price: 48500,
    discountRate: 3,
    description: "신세계백화점, 이마트 등 신세계 계열 전 매장에서 사용 가능합니다.",
    bestseller: true,
    colorFrom: "#ffe08a",
    colorTo: "#f2b705",
  },
  {
    id: "p-lotte",
    slug: "lotte-giftcard",
    name: "롯데상품권",
    category: "department",
    faceValue: 50000,
    price: 48200,
    discountRate: 3.6,
    description: "롯데백화점, 롯데마트, 롯데시네마 등에서 폭넓게 사용되는 상품권입니다.",
    bestseller: false,
    colorFrom: "#ff9aa2",
    colorTo: "#e0455a",
  },
  {
    id: "p-hyundai",
    slug: "hyundai-department",
    name: "현대백화점상품권",
    category: "department",
    faceValue: 50000,
    price: 48800,
    discountRate: 2.4,
    description: "현대백화점 전 지점 및 온라인몰에서 사용 가능한 프리미엄 상품권입니다.",
    bestseller: false,
    colorFrom: "#bcd4ff",
    colorTo: "#4d7ad6",
  },
  {
    id: "p-emart",
    slug: "emart-giftcard",
    name: "이마트상품권",
    category: "life",
    faceValue: 30000,
    price: 29100,
    discountRate: 3,
    description: "이마트, 이마트 트레이더스에서 생필품 구매 시 바로 사용 가능합니다.",
    bestseller: false,
    colorFrom: "#ffe6a7",
    colorTo: "#f5a623",
  },
  {
    id: "p-starbucks",
    slug: "starbucks-egift",
    name: "스타벅스 이용권",
    category: "cafe",
    faceValue: 10000,
    price: 9700,
    discountRate: 3,
    description: "전국 스타벅스 매장에서 음료 및 상품 구매에 사용할 수 있는 이용권입니다.",
    bestseller: true,
    colorFrom: "#b7e4c7",
    colorTo: "#1e6b3c",
  },
  {
    id: "p-baemin",
    slug: "baemin-giftcard",
    name: "배달의민족 상품권",
    category: "cafe",
    faceValue: 10000,
    price: 9650,
    discountRate: 3.5,
    description: "배달의민족 앱에서 음식 주문 시 현금처럼 사용할 수 있는 상품권입니다.",
    bestseller: false,
    colorFrom: "#b9e5ff",
    colorTo: "#2fa9ff",
  },
];

function orderNumberDatePart(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function buildOrderNumber(existingOrders: Order[], date: Date): string {
  const datePart = orderNumberDatePart(date);
  const todayPrefix = `${ORDER_PREFIX}-${datePart}-`;
  let maxSeq = 0;
  for (const order of existingOrders) {
    if (order.orderNumber.startsWith(todayPrefix)) {
      const seq = parseInt(order.orderNumber.slice(todayPrefix.length), 10);
      if (!Number.isNaN(seq) && seq > maxSeq) maxSeq = seq;
    }
  }
  const nextSeq = maxSeq + 1;
  return `${todayPrefix}${String(nextSeq).padStart(3, "0")}`;
}

function daysAgo(n: number, hour = 10, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function buildSeedOrders(): Order[] {
  const seedSpecs: {
    daysAgo: number;
    status: OrderStatus;
    customer: OrderCustomer;
    items: { product: Product; quantity: number }[];
  }[] = [
    {
      daysAgo: 0,
      status: "pending_payment",
      customer: {
        name: "김도윤",
        phone: "010-2231-9087",
        email: "doyoon.kim@example.com",
        address: "서울특별시 마포구 월드컵로 12, 101동 803호",
      },
      items: [{ product: PRODUCTS[0], quantity: 2 }],
    },
    {
      daysAgo: 0,
      status: "paid",
      customer: {
        name: "이서연",
        phone: "010-4482-1195",
        email: "seoyeon.lee@example.com",
        address: "부산광역시 해운대구 센텀중앙로 55, 트윈타워 1204호",
      },
      items: [
        { product: PRODUCTS[1], quantity: 1 },
        { product: PRODUCTS[4], quantity: 1 },
      ],
    },
    {
      daysAgo: 1,
      status: "preparing",
      customer: {
        name: "박지훈",
        phone: "010-7723-4410",
        email: "jihoon.park@example.com",
        address: "인천광역시 연수구 송도과학로 32, 101호",
      },
      items: [{ product: PRODUCTS[8], quantity: 1 }],
    },
    {
      daysAgo: 3,
      status: "shipping",
      customer: {
        name: "최수아",
        phone: "010-5561-2298",
        email: "sua.choi@example.com",
        address: "대구광역시 수성구 동대구로 45, 402호",
      },
      items: [{ product: PRODUCTS[12], quantity: 3 }],
    },
    {
      daysAgo: 4,
      status: "delivered",
      customer: {
        name: "정민재",
        phone: "010-3390-7724",
        email: "minjae.jung@example.com",
        address: "광주광역시 서구 상무중앙로 76, 상무빌딩 5층",
      },
      items: [{ product: PRODUCTS[9], quantity: 1 }],
    },
    {
      daysAgo: 6,
      status: "delivered",
      customer: {
        name: "한소영",
        phone: "010-9982-6631",
        email: "soyoung.han@example.com",
        address: "대전광역시 유성구 대학로 99, 201동 1502호",
      },
      items: [
        { product: PRODUCTS[5], quantity: 1 },
        { product: PRODUCTS[6], quantity: 1 },
      ],
    },
    {
      daysAgo: 9,
      status: "cancelled",
      customer: {
        name: "오태양",
        phone: "010-1123-8845",
        email: "taeyang.oh@example.com",
        address: "경기도 성남시 분당구 판교역로 235, 6층",
      },
      items: [{ product: PRODUCTS[10], quantity: 1 }],
    },
    {
      daysAgo: 12,
      status: "delivered",
      customer: {
        name: "윤하은",
        phone: "010-6674-3321",
        email: "haeun.yoon@example.com",
        address: "울산광역시 남구 삼산로 100, 아이파크 1301호",
      },
      items: [{ product: PRODUCTS[2], quantity: 2 }],
    },
    {
      daysAgo: 16,
      status: "delivered",
      customer: {
        name: "임건우",
        phone: "010-8845-1102",
        email: "geonwoo.lim@example.com",
        address: "경상남도 창원시 성산구 창이대로 674, 302호",
      },
      items: [{ product: PRODUCTS[3], quantity: 1 }],
    },
    {
      daysAgo: 20,
      status: "paid",
      customer: {
        name: "강나윤",
        phone: "010-2298-5567",
        email: "nayoon.kang@example.com",
        address: "세종특별자치시 한누리대로 402, 101동 705호",
      },
      items: [{ product: PRODUCTS[13], quantity: 2 }],
    },
  ];

  const orders: Order[] = [];
  for (const spec of seedSpecs) {
    const items: OrderItem[] = spec.items.map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
    }));
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const createdAt = daysAgo(spec.daysAgo, 10 + orders.length % 8, (orders.length * 7) % 60);
    const orderNumber = buildOrderNumber(orders, new Date(createdAt));
    orders.push({
      id: randomUUID(),
      orderNumber,
      createdAt,
      status: spec.status,
      customer: spec.customer,
      items,
      totalAmount,
    });
  }
  return orders;
}

function deriveMembers(orders: Order[]): Member[] {
  const byEmail = new Map<string, Member>();
  const sorted = [...orders].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  for (const order of sorted) {
    const existing = byEmail.get(order.customer.email);
    if (!existing) {
      byEmail.set(order.customer.email, {
        email: order.customer.email,
        name: order.customer.name,
        phone: order.customer.phone,
        joinedAt: order.createdAt,
      });
    }
  }
  return Array.from(byEmail.values());
}

function buildSeedData(): StoreData {
  const orders = buildSeedOrders();
  return {
    products: PRODUCTS,
    orders,
    members: deriveMembers(orders),
    admins: [
      {
        id: randomUUID(),
        email: ADMIN_SEED_EMAIL,
        passwordHash: hashPassword(ADMIN_SEED_PASSWORD),
        role: "admin",
      },
    ],
  };
}

let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    const seeded = buildSeedData();
    await fs.writeFile(DATA_FILE, JSON.stringify(seeded, null, 2), "utf-8");
  }
}

async function readStore(): Promise<StoreData> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as StoreData;
}

async function writeStore(data: StoreData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function withStore<T>(fn: (data: StoreData) => Promise<T> | T): Promise<T> {
  const task = writeQueue.then(async () => {
    const data = await readStore();
    const result = await fn(data);
    await writeStore(data);
    return result;
  });
  writeQueue = task.catch(() => undefined);
  return task;
}

export async function listProducts(): Promise<Product[]> {
  const data = await readStore();
  return data.products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const data = await readStore();
  return data.products.find((p) => p.slug === slug);
}

export interface CreateOrderInput {
  customer: OrderCustomer;
  items: { productId: string; quantity: number }[];
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  return withStore((data) => {
    const items: OrderItem[] = input.items.map(({ productId, quantity }) => {
      const product = data.products.find((p) => p.id === productId);
      if (!product) throw new Error(`Unknown product: ${productId}`);
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      };
    });
    if (items.length === 0) throw new Error("주문할 상품이 없습니다.");

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const now = new Date();
    const order: Order = {
      id: randomUUID(),
      orderNumber: buildOrderNumber(data.orders, now),
      createdAt: now.toISOString(),
      status: "pending_payment",
      customer: input.customer,
      items,
      totalAmount,
    };
    data.orders.push(order);

    if (!data.members.some((m) => m.email === order.customer.email)) {
      data.members.push({
        email: order.customer.email,
        name: order.customer.name,
        phone: order.customer.phone,
        joinedAt: order.createdAt,
      });
    }

    return order;
  });
}

export async function listOrders(): Promise<Order[]> {
  const data = await readStore();
  return [...data.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getStats(): Promise<{
  totalOrders: number;
  totalRevenue: number;
  pendingCount: number;
  memberCount: number;
}> {
  const data = await readStore();
  const totalOrders = data.orders.length;
  const totalRevenue = data.orders
    .filter((o) => o.status !== "cancelled" && o.status !== "pending_payment")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingCount = data.orders.filter((o) => o.status === "pending_payment").length;
  const memberCount = data.members.length;
  return { totalOrders, totalRevenue, pendingCount, memberCount };
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | null> {
  return withStore((data) => {
    const order = data.orders.find((o) => o.id === id);
    if (!order) return null;
    order.status = status;
    return order;
  });
}

export async function deleteOrder(id: string): Promise<boolean> {
  return withStore((data) => {
    const idx = data.orders.findIndex((o) => o.id === id);
    if (idx === -1) return false;
    data.orders.splice(idx, 1);
    return true;
  });
}

export async function findAdminByEmail(email: string) {
  const data = await readStore();
  return data.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
}
