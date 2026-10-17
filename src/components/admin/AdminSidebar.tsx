"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Users,
  ExternalLink,
  LogOut,
  LayoutDashboard,
  PackageSearch,
  Tag,
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen  flex flex-0.7 flex-col justify-between py-4 px-6 m-0 bg-slate-800 text-gray-200 ">
      <div className="flex flex-col justify-center gap-5 mt-5">
        <div className="flex gap-1 p-2 mb-4">
          <ShoppingBag className="p-1 bg-blue-600 text-white border-0 rounded self-center w-8 h-8" />
          <h3 className="font-bold text-xl">Be-xpert Store</h3>
        </div>
        <nav className="flex flex-col justify-center gap-3 ">
          <Link
            href="/admin/dashboard"
            className={`flex gap-2 items-center py-2 px-4 rounded-2xl border-0   ${pathname === "/admin/dashboard" && `bg-blue-600 p-1`}  `}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className=""> Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className={`flex gap-2 items-center py-2 px-4  rounded-2xl border-0 ${pathname === "/admin/products" && `bg-blue-600`}  `}
          >
            <PackageSearch className="w-4 h-4" />
            <span>Products</span>
          </Link>
          <Link
            href="/admin/categories"
            className={`flex gap-2 items-center py-2 px-4  rounded-2xl border-0 ${pathname === "/admin/categories" && `bg-blue-600 `}  `}
          >
            <Tag className="w-4 h-4" />
            <span>Categories</span>
          </Link>
          <Link
            href="/admin/users"
            className={`flex gap-2 items-center py-2 px-4  rounded-2xl border-0 ${pathname === "/admin/users" && `bg-blue-600 `}  `}
          >
            <Users className="w-4 h-4" />
            <span>Users</span>
          </Link>
        </nav>
      </div>
      <nav className="flex flex-col gap-2 justify-center mb-5">
        <Link
          href="/"
          className="flex gap-3 items-center  p-1 hover:bg-slate-500"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
        <div className="flex gap-3 items-center  p-1 hover:bg-slate-700 hover:rounded ">
          <LogOut className="w-4 h-4" />
          <button className="self-start">Logout</button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
