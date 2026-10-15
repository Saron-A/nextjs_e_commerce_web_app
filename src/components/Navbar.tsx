"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, ShoppingCart, Tv } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";

const Navbar = () => {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.cartItems);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  return (
    <nav className="flex justify-between gap-5 py-3 px-4 border-b border-gray-300">
      <div className="flex gap-4 items-center">
        <Link href="/" className="flex gap-2">
          <ShoppingBag className="p-1 bg-blue-600 text-white border-0 rounded self-center" />
          <span className="font-bold text-xl">Be-xpert Store</span>
        </Link>

        <Link
          href="/"
          className={`hover:text-black hover:font-semibold ${pathname === "/" ? "text-blue-600 border-b-2 border-blue-500 hover:border-b-2 border-black" : "text-gray-600 text-sm"}`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`hover:text-black hover:font-semibold ${pathname === "/products" ? "text-blue-600 border-b-2 border-blue-500 hover:border-b-2 border-black" : "text-gray-600 text-sm"}`}
        >
          Products
        </Link>
        <Link
          href="/categories"
          className={`hover:text-black hover:font-semibold ${pathname === "/categories" ? "text-blue-600 border-b-2 border-blue-500 hover:border-b-2 border-black" : "text-gray-600 text-sm"}`}
        >
          Categories
        </Link>
        {user && user.role === "admin" && (
          <Link
            href="/adminDashboard"
            className={`hover:text-black hover:font-semibold ${pathname === "/categories" ? "text-blue-600 border-b-2 border-blue-500 hover:border-b-2 border-black" : "text-gray-600 text-sm"}`}
          >
            Admin Panel
          </Link>
        )}
      </div>
      <div className="flex gap-4 px-4 py-1 border rounded-4xl w-80 border-gray-400 bg-slate-100">
        <Search className="text-gray-600 self-center text-sm h-5 " />

        <input
          type="text"
          placeholder="Search products..."
          id="product"
          name="search_product"
          className="text-sm placeholder-slate-500"
        />
      </div>
      <div className="flex gap-5 justify-between items-center">
        <Link
          href="/cart"
          className="flex gap-1 hover:bg-blue-100 hover:text-blue-600 px-2 py-4 border-0  rounded-xl"
        >
          <ShoppingCart className="w-5 h-4 text-sm font-thin" />{" "}
          <span className=" rounded-full bg-blue-500 px-1 py-0 text-xs text-white font-bold self-baseline items-start">
            {cartItems.length}
          </span>
        </Link>
        {user ? (
          <>
            <Link href="/profile">
              {user?.avatar && (
                <Image
                  src={user.avatar}
                  alt="user avatar"
                  width="6"
                  height="6"
                  className="w-5 h-5 rounded-full"
                />
              )}
            </Link>
            <button
              onClick={logout}
              className="text-sm text-red-500 p-2 hover:bg-red-50 border-0 rounded-xl"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="flex gap-2 hover:bg-blue-100 hover:text-blue-600 p-2 border-0 rounded-xl"
          >
            <User className="w-5 h-4 text-sm font-thin self-center" />
            <span className=" text-sm">Login</span>
          </Link>
        )}

        <button className="font-thin hover:bg-blue-100 hover:text-blue-600 p-2 border-0 rounded-xl">
          <Tv className="w-5 h-4 text-sm " />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
