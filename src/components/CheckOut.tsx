"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Package,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";

interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

const CheckoutForm = () => {
  const router = useRouter();

  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  // No shipping fees or taxes are included in this simulation.
  const total = subtotal;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add products before checking out.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a snapshot before clearing the cart.
      const simulatedOrder = {
        customer: { ...customer },
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity,
        })),
        subtotal,
        total,
        orderDate: new Date().toISOString(),
        status: "Simulated checkout",
      };

      // Save the demonstration order separately from the cart.
      localStorage.setItem(
        "lastSimulatedOrder",
        JSON.stringify(simulatedOrder),
      );

      // This action should also clear the cart's localStorage entry.
      clearCart();

      router.push("/checkout/success");
    } catch (err) {
      console.error("Simulated checkout failed:", err);

      setError(
        "We couldn't complete the simulated checkout. Please try again.",
      );

      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
            <ShoppingBag
              size={30}
              className="text-indigo-600"
              aria-hidden="true"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Add some products to your cart before proceeding to checkout.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Continue Shopping
        </Link>

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Almost there
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Enter your details and review your order before completing the
            simulated checkout.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Checkout form */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:col-span-2">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <MapPin
                  size={21}
                  className="text-indigo-600"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  All fields are required.
                </p>
              </div>
            </div>

            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={customer.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={customer.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={25}
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  required
                  minLength={5}
                  maxLength={300}
                  rows={3}
                  value={customer.address}
                  onChange={handleChange}
                  placeholder="Enter your street address and delivery details"
                  className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  minLength={2}
                  maxLength={100}
                  value={customer.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm leading-6 text-amber-900">
                  <strong>Simulated checkout:</strong> No payment will be
                  collected, and no real order or shipment will be created.
                </p>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Visible on smaller screens */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
              >
                <CheckCircle2 size={19} aria-hidden="true" />
                {isSubmitting ? "Processing..." : "Place Simulated Order"}
              </button>
            </form>
          </section>

          {/* Order summary */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <Package
                  size={21}
                  className="text-indigo-600"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Order Summary
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {totalItems} item(s)
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-semibold text-gray-900">
                      {item.product.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-gray-200 pt-5">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">
                  Not calculated
                </span>
              </div>

              <div className="flex justify-between gap-4 border-t border-gray-200 pt-4">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-indigo-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              <p className="text-xs leading-5 text-gray-500">
                The total includes product prices only. Shipping and taxes are
                not implemented.
              </p>
            </div>

            {/* Visible on desktop */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                document.getElementById("checkout-form")?.dispatchEvent(
                  new Event("submit", {
                    bubbles: true,
                    cancelable: true,
                  }),
                );
              }}
              className="mt-6 hidden w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 lg:inline-flex"
            >
              <CheckCircle2 size={19} aria-hidden="true" />
              {isSubmitting ? "Processing..." : "Place Simulated Order"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutForm;
