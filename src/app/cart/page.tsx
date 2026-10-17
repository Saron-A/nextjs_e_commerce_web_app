"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/store/cartStore";
import { Divide } from "lucide-react";

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  console.log("Cart Items", cartItems);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-gray-500 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {/* Empty Cart */}
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
              <div className="text-5xl mb-4">🛒</div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mb-6">
                Looks like you haven&apos;t added anything yet.
              </p>

              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-28 h-28 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="h-24 w-24 object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-gray-800 text-lg line-clamp-2">
                          {item.product.title}
                        </h2>

                        <p className="text-gray-500 text-sm capitalize mt-1">
                          {item.product.category.name}
                        </p>

                        <p className="text-blue-600 font-bold text-lg mt-2">
                          ${item.product.price}
                        </p>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-9 h-9 bg-gray-50 hover:bg-gray-100 text-lg font-bold text-gray-700"
                          >
                            −
                          </button>

                          <span className="w-10 text-center font-semibold text-gray-800">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-9 h-9 bg-gray-50 hover:bg-gray-100 text-lg font-bold text-gray-700"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="inline-block text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Order Summary
                  </h2>

                  <div className="flex justify-between text-gray-500 mb-3">
                    <span>Items</span>
                    <span className="font-medium text-gray-800">
                      {totalItems}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-500 mb-4">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-800">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      Total
                    </span>

                    <span className="text-xl font-bold text-blue-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <Link href="/checkout">
                    <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                      Checkout
                    </button>
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full mt-3 border border-red-200 text-red-500 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
