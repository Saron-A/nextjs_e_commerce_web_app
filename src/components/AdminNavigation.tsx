import AdminSidebar from "./admin/AdminSidebar";
import AdminNavbar from "./admin/AdminNavbar";

const AdminNavigation = () => {
  return (
    <div>
      <div className="flex gap-2">
        <AdminSidebar />
        <AdminNavbar />
      </div>
    </div>
  );
};

export default AdminNavigation;
