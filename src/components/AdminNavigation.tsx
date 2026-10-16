import type { ReactNode } from "react";
import AdminSidebar from "./admin/AdminSidebar";
import AdminNavbar from "./admin/AdminNavbar";

interface AdminNavigationProps {
  children: ReactNode;
}

const AdminNavigation = ({ children }: AdminNavigationProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar />
        <main className="flex-1 bg-slate-50 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminNavigation;
