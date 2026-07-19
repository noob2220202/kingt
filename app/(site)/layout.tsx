import { listProducts } from "@/lib/store";
import { CartProvider } from "@/lib/cart-context";
import { QuickViewProvider } from "@/lib/quickview-context";
import { ToastProvider } from "@/components/Toast";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CartDrawer } from "@/components/site/CartDrawer";
import { QuickViewModal } from "@/components/site/QuickViewModal";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await listProducts();

  return (
    <ToastProvider>
      <CartProvider products={products}>
        <QuickViewProvider>
          <PromoBar />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
          <QuickViewModal />
        </QuickViewProvider>
      </CartProvider>
    </ToastProvider>
  );
}
