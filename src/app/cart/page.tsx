"use client";

import { Product } from "@/types/product";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/store/cartStore";
import { Divide } from "lucide-react";

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  return (
    <div>
      <Navbar />
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.product.id}>
              <h3>{item.product.title}</h3>
            </div>
          ))
        ) : (
          <div>
            <p>No items in the cart yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
