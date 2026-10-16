import { type ReactNode } from "react";
import AdminNavigation from "@/components/AdminNavigation";
import ProtectedRoute from "@/components/ProtectedRoute";

interface ChildrenState {
  children: ReactNode;
}

const AdminDashboardPage = ({ children }: ChildrenState) => {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminNavigation>{children}</AdminNavigation>
    </ProtectedRoute>
  );
};

export default AdminDashboardPage;
