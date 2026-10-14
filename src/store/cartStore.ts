"use client";
import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
}

const useCartStore = create<CartState>()((set) => ({
  cartItems: [],
  addToCart: (product: Product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      const newItem = {
        product,
        quantity: 1,
      };

      return {
        cartItems: [...state.cartItems, newItem],
      };
    }),
}));

export { useCartStore };
