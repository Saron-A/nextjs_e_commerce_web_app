import Image from "next/image";
import Link from "next/link";
import { fetchAllProducts } from "@/Lib/productsApi";
import { Category } from "@/types/category";
import { FolderOpen, ArrowUpRight, Tag } from "lucide-react";

const CategoriesPage = async () => {
  const products = await fetchAllProducts();

  const categoryIds = products.map((product) => product.category.id);
  const uniqueCategoryIds = [...new Set(categoryIds)]; // Set compare memory addresses, not content
  //this contains only the Id numbers [1,2,3,4,5]

  const categories: Category[] = uniqueCategoryIds
    .map(
      (id) => products.find((product) => product.category.id === id)?.category,
    )
    .filter((category): category is Category => category !== undefined);
  console.log(categories);

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Page Header */}
        <header>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Tag size={16} /> <span>Administration</span> <span>/</span>
            <span>Categories</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Categories</h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse and manage your product categories.
          </p>
        </header>
        {/* Category Summary */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-violet-50 p-3 text-violet-600">
              <FolderOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Categories</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {categories.length}
              </p>
            </div>
          </div>
        </section>
        {/* Categories Table */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <header className="border-b border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">All Categories</h2>
            <p className="mt-1 text-sm text-slate-500">
              A list of categories available in your store.
            </p>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-4 py-4 font-medium">Slug</th>
                  <th className="px-4 py-4 font-medium">Created</th>
                  <th className="px-6 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50">
                    {/* Category Name and Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Tag size={20} className="text-slate-400" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-slate-800">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    {/* Slug */}
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                        {category.slug}
                      </span>
                    </td>
                    {/* Creation Date */}
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                      {Number.isNaN(Date.parse(category.creationAt))
                        ? "—"
                        : new Date(category.creationAt).toLocaleDateString(
                            "en",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                    </td>
                    {/* View Action */}
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/categories/${category.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Open <ArrowUpRight size={15} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <FolderOpen
                        size={28}
                        className="mx-auto text-slate-300"
                      />
                      <p className="mt-3 text-sm font-medium text-slate-700">
                        No categories found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Categories will appear here when available.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <footer className="border-t border-slate-200 px-6 py-4 text-sm text-slate-500">
            Showing {categories.length}
            {categories.length === 1 ? "category" : "categories"}
          </footer>
        </section>
      </div>
    </main>
  );
};

export default CategoriesPage;
