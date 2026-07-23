export type ProductCategory =
  | "culture"
  | "content"
  | "department"
  | "life"
  | "cafe";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  faceValue: number;
  price: number;
  discountRate: number;
  description: string;
  badge?: string;
  bestseller: boolean;
  colorFrom: string;
  colorTo: string;
  /** Optional path under /public, e.g. "/products/culture-voucher.jpg". Falls back to the illustrated card mockup when unset. */
  image?: string;
}

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "preparing"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customer: OrderCustomer;
  items: OrderItem[];
  totalAmount: number;
}

export interface Member {
  email: string;
  name: string;
  phone: string;
  joinedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  role: "admin";
}

export interface StoreData {
  orders: Order[];
  members: Member[];
  admins: AdminUser[];
}
