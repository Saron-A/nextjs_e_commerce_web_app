import Link from "next/link";
import { Search, ShoppingBag, User, ShoppingCart, Tv } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between gap-5 py-3 px-4 border-b border-gray-300">
      <div className="flex gap-4 items-center">
        <Link href="/" className="flex gap-2">
          <ShoppingBag className="p-1 bg-blue-600 text-white border-0 rounded" />
          <span className="font-bold text-xl">Be-xpert Store</span>
        </Link>

        <Link
          href="/"
          className="text-gray-600 text-sm hover:text-black hover:font-semibold"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-gray-600 text-sm hover:text-black hover:font-semibold"
        >
          Products
        </Link>
        <Link
          href="/categories"
          className="text-gray-600 text-sm hover:text-black hover:font-semibold"
        >
          Categories
        </Link>
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
          className="hover:bg-blue-100 hover:text-blue-600 p-2 border-0 rounded-xl"
        >
          <ShoppingCart className="w-5 h-4 text-sm font-thin" />
        </Link>
        <Link
          href="/login"
          className="flex gap-2 hover:bg-blue-100 hover:text-blue-600 p-2 border-0 rounded-xl"
        >
          <User className="w-5 h-4 text-sm font-thin self-center" />
          <span className=" text-sm">Login</span>
        </Link>
        <button className="font-thin hover:bg-blue-100 hover:text-blue-600 p-2 border-0 rounded-xl">
          <Tv className="w-5 h-4 text-sm " />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
