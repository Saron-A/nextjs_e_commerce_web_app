import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">BE-XPERT</Link>
      <div>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
