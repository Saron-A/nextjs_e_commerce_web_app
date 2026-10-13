import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-between gap-5 p-4">
      <Link href="/" className="p-1">
        <span className="bg-blue-500 font-extrabold text-xl text-white p-2 border-0 rounded">
          Mini
        </span>{" "}
        <span className="font-semibold"> Shopping</span>
      </Link>
      <div className="flex justify-end gap-5">
        <Link
          href="/"
          className="text-blue-500 font-semibold p-2 hover:bg-blue-50 rounded- border-0"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-blue-500 font-semibold p-2 hover:bg-blue-50 rounded- border-0"
        >
          Products
        </Link>
        <Link
          href="/cart"
          className="text-blue-500 font-semibold p-2 hover:bg-blue-50 rounded- border-0"
        >
          Cart
        </Link>
        <Link
          href="/login"
          className="text-blue-500 font-semibold p-2 hover:bg-blue-50 rounded- border-0"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
