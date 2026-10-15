"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { loginUser, fetchAllUsers } from "@/Lib/usersApi";
import { ShoppingBag } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import Navbar from "@/components/Navbar";

const LoginForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    const user: User = {
      email: form.email,
      password: form.password,
    };

    try {
      const allUsers = await fetchAllUsers();
      console.log(allUsers);

      const response = await loginUser({ user });
      console.log(response);
      //response returns an object with data and userInfo destructed

      if (response.status === 201) {
        console.log("User successfully created");
      }
      setSuccess("Login Successful!");
      const authenticatedUser = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
        avatar: response.avatar,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      };

      setUser(authenticatedUser);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
        <section className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900"
            >
              <ShoppingBag className="p-1 bg-blue-600 text-white border-0 rounded self-center" />
              Be-xpert Store
            </Link>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Sign in to access your account and continue shopping.
            </p>
          </div>

          {/* Login card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="loginEmail"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="loginEmail"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="loginPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="loginPassword"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>

              {/* Error message */}
              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Success message */}
              {success && (
                <p
                  role="status"
                  className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  {success}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Register link */}
            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Your shopping journey starts here.
          </p>
        </section>
      </main>
    </div>
  );
};

export default LoginForm;
