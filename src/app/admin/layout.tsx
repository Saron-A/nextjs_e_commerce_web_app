import AdminNavigation from "@/components/AdminNavigation";
import AdminDashboard from "@/components/AdminDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminDashboardPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminNavigation />
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default AdminDashboardPage;
