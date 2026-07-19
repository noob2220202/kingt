import { getAdminSession } from "@/lib/adminAuth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <AdminLoginForm />
      </div>
    );
  }

  return <AdminDashboard adminEmail={session.email} />;
}
