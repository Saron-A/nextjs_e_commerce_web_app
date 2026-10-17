"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";

interface SimulatedOrder {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  subtotal: number;
  total: number;
  orderDate: string;
  status: string;
}

const CheckoutSuccess = () => {
  const [order, setOrder] = useState<SimulatedOrder | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("lastSimulatedOrder");

      if (savedOrder) {
        const parsedOrder: SimulatedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
      }
    } catch (error) {
      console.error("Failed to read simulated order:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-600">Loading order summary...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Confirmation */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={44}
              className="text-green-600"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-700">
            Simulated checkout completed
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
            Your checkout demonstration is complete. No payment was processed,
            and no real order or shipment was created.
          </p>
        </section>

        {/* Saved order summary */}
        {order ? (
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <Package
                  size={21}
                  className="text-indigo-600"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Saved locally for this demonstration
                </p>
              </div>
            </div>

            {/* Customer details */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">
                Customer Information
              </h3>

              <div className="mt-3 space-y-2 break-words text-sm text-gray-600">
                <p>
                  <strong className="text-gray-800">Name:</strong>{" "}
                  {order.customer.fullName}
                </p>

                <p>
                  <strong className="text-gray-800">Email:</strong>{" "}
                  {order.customer.email}
                </p>

                <p>
                  <strong className="text-gray-800">Phone:</strong>{" "}
                  {order.customer.phone}
                </p>

                <p>
                  <strong className="text-gray-800">Address:</strong>{" "}
                  {order.customer.address}
                </p>

                <p>
                  <strong className="text-gray-800">City:</strong>{" "}
                  {order.customer.city}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="mt-7">
              <h3 className="font-semibold text-gray-900">
                Items in Your Order
              </h3>

              <div className="mt-4 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 py-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-semibold text-gray-900">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-gray-900">
                      ${item.subtotal.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mt-4 border-t border-gray-200 pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-gray-900">Total</span>

                <span className="text-xl font-bold text-indigo-600">
                  ${order.total.toFixed(2)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                This total reflects product prices only. No payment was
                collected.
              </p>
            </div>
          </section>
        ) : (
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-gray-900">
              No saved order summary
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              No simulated checkout summary was found in this browser. You can
              continue shopping to start a new checkout.
            </p>
          </section>
        )}

        {/* Continue shopping */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <ShoppingBag size={19} aria-hidden="true" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
