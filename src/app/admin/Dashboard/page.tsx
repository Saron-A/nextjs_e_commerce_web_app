import Link from "next/link";
import Image from "next/image";
import { fetchAllProducts } from "@/Lib/productsApi";
import { fetchAllUsers } from "@/Lib/usersApi";
import {
  Package,
  Tag,
  Users,
  ShoppingCart,
  ShoppingBag,
  Plus,
  ExternalLink,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import AddProductDialog from "@/components/admin/AddProducts";
import type { ComponentType } from "react";
import { Category } from "@/types/category";

const DashboardPage = async () => {
  let allProducts: Product[] = [];
  let allUsers: User[] = [];
  try {
    allProducts = await fetchAllProducts();
    allUsers = await fetchAllUsers();
  } catch (err) {
    console.log(err);
  }

  const categoryIds = allProducts.map((product) => product.category.id);
  const uniqueCategoryIds = [...new Set(categoryIds)]; // Set compare memory addresses, not content
  //this contains only the Id numbers [1,2,3,4,5]
  const categories: Category[] = uniqueCategoryIds.flatMap((id) => {
    const category = allProducts.find(
      (product) => product.category.id === id,
    )?.category;
    return category ? [category] : [];
  });

  const recentProducts = allProducts
    .sort((a, b) => Date.parse(b.creationAt) - Date.parse(a.creationAt))
    .slice(0, 15);

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard </h1>
            <p className="mt-1 text-sm text-slate-500">
              Welcome back! Here&apos;s an overview of your store.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <ExternalLink size={16} /> Visit Store
          </Link>
        </header>
        {/* Activity Cards */}
        <section
          aria-label="Store statistics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {/* Products */}
          <article className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500"> Total Products </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {allProducts.length}
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Package size={22} />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Products in your catalog
            </p>
          </article>
          {/* Categories */}
          <article className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Categories </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {categories.length}
                </p>
              </div>
              <div className="rounded-lg bg-violet-50 p-3 text-violet-600">
                <Tag size={22} />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Categories in your catalog
            </p>
          </article>
          {/* Users */}
          <article className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500"> Total Users </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {allUsers.length}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                <Users size={22} />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">Registered users</p>
          </article>
        </section>
        {/* Products and Quick Actions */}
        <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
          {/* Recent Products */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white xl:col-span-2">
            <header className="flex items-center justify-between gap-3 border-b border-slate-200 p-5">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Recent Products
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recently added products in your store.
                </p>
              </div>
              <Link
                href="/admin/products"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View All
              </Link>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-5 py-3 font-medium"> </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                            {product.images?.[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <ShoppingBag
                                size={18}
                                className="text-slate-400"
                              />
                            )}
                          </div>
                          <span className="max-w-[180px] truncate text-sm font-medium text-slate-800">
                            {product.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {product.category?.name ??
                          product.category?.slug ??
                          "Uncategorized"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-800">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                        {Number.isNaN(Date.parse(product.creationAt))
                          ? "—"
                          : new Date(product.creationAt).toLocaleDateString(
                              "en",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/products/${product.id}`}
                          aria-label={`View ${product.title}`}
                          className="inline-flex rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                        >
                          <ArrowUpRight size={17} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {recentProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-10 text-center text-sm text-slate-500"
                      >
                        No products available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <footer className="border-t border-slate-200 px-5 py-3 text-sm text-slate-500">
              <p>
                Showing {recentProducts.length} of {allProducts.length}
                products
              </p>
            </footer>
          </section>
          {/* Quick Actions */}
          <aside className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-900">Quick Actions </h2>
            <p className="mt-1 text-sm text-slate-500">Manage your store. </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {/* Add Product */}
              <div className="flex min-h-32 flex-col items-start justify-between gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Package size={20} />
                </div>
                <AddProductDialog categories={categories} />
              </div>
              {/* Manage Categories */}
              <Link
                href="/admin/categories"
                className="flex min-h-32 flex-col justify-between gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
              >
                <div className="w-fit rounded-lg bg-violet-50 p-2 text-violet-600">
                  <Tag size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Manage Categories
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Organize products
                  </p>
                </div>
              </Link>
              {/* View Users */}
              <Link
                href="/admin/users"
                className="flex min-h-32 flex-col justify-between gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
              >
                <div className="w-fit rounded-lg bg-emerald-50 p-2 text-emerald-600">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    View Users
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Manage accounts</p>
                </div>
              </Link>
              {/* Visit Store */}
              <Link
                href="/"
                className="flex min-h-32 flex-col justify-between gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
              >
                <div className="w-fit rounded-lg bg-amber-50 p-2 text-amber-600">
                  <ExternalLink size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Visit Store
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Browse storefront
                  </p>
                </div>
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
