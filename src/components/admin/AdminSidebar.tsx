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
    <aside className="min-h-screen flex flex-col justify-between py-4 px-6 w-fit m-0 bg-slate-800 text-gray-200">
      <div className="flex flex-col justify-center gap-5 mt-5">
        <div className="flex gap-1 p-2 mb-4">
          <ShoppingBag className="p-1 bg-blue-600 text-white border-0 rounded self-center w-8 h-8" />
          <h3 className="font-bold text-xl">Be-xpert Store</h3>
        </div>
        <nav className="flex flex-col justify-center gap-3 ">
          <Link
            href="/admin/"
            className={`flex gap-2 items-center  hover:bg-slate-500 ${pathname === "/admin/products" && `bg-blue-600 p-1`}  `}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className=""> Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className={`flex gap-2 items-center p-1 hover:bg-slate-500 ${pathname === "/admin/products" && `bg-blue-600`}  `}
          >
            <PackageSearch className="w-4 h-4" />
            <span>Products</span>
          </Link>
          <Link
            href="/admin/categories"
            className="flex gap-2 items-center  p-1 hover:bg-slate-500"
          >
            <Tag className="w-4 h-4" />
            <span>Categories</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex gap-2 items-center  px-1 py-2 hover:bg-slate-500"
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
