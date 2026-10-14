"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface AddToCartProps {
  product: Product;
}

const AddToCart = ({ product }: AddToCartProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return <button onClick={() => addToCart(product)}>Add To cart</button>;
};

export default AddToCart;
