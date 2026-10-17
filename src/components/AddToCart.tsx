"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
  product: Product;
}

const AddToCart = ({ product }: AddToCartProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:w-auto sm:min-w-48 sm:py-4 sm:text-base"
    >
      <ShoppingCart size={20} strokeWidth={1.8} aria-hidden="true" />
      Add to Cart
    </button>
  );
};

export default AddToCart;
