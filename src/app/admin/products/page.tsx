import Image from "next/image";
import Link from "next/link";
import { fetchAllProducts } from "@/Lib/productsApi";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import AddProductDialog from "@/components/admin/AddProducts";
import DeleteProductDialog from "@/components/admin/DeleteProducts";
import { Pencil, Trash, ExternalLink, Package, Tag } from "lucide-react";

const ProductsPage = async () => {
  console.log("This is the Products page");
  const allProducts = await fetchAllProducts();

  const categoryIds = allProducts.map((product) => product.category.id);
  const uniqueCategoryIds = [...new Set(categoryIds)]; // Set compare memory addresses, not content
  //this contains only the Id numbers [1,2,3,4,5]

  const categories: Category[] = uniqueCategoryIds
    .map(
      (id) =>
        allProducts.find((product) => product.category.id === id)?.category,
    )
    .filter((category): category is Category => category !== undefined);
  console.log(categories);

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Page Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-slate-500">
              Administration / Products
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Products
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create, edit, and manage your catalog inventory.
            </p>
          </div>
          <AddProductDialog categories={categories} />
        </header>
        {/* Summary Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Package size={23} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Products</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {allProducts.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Tag size={23} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Categories</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {categories.length}
              </p>
            </div>
          </div>
        </section>
        {/* Products Table */}
        <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              All Products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A list of products available in your catalog.
            </p>
          </div>

          <div className="w-full">
            <table className="w-full table-fixed text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">
                <tr>
                  <th className="w-[32%] px-2 py-3 font-semibold sm:px-3">
                    Product
                  </th>
                  <th className="w-[17%] px-2 py-3 font-semibold sm:px-3">
                    Category
                  </th>
                  <th className="w-[13%] px-2 py-3 font-semibold sm:px-3">
                    Price
                  </th>
                  <th className="w-[20%] px-2 py-3 font-semibold sm:px-3">
                    Created
                  </th>
                  <th className="w-[18%] px-2 py-3 text-center font-semibold sm:px-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {allProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    {/* Product */}
                    <td className="px-2 py-3 sm:px-3">
                      <div className="flex min-w-0 items-center gap-2">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={40}
                            height={40}
                            className="h-8 w-8 shrink-0 rounded-md border border-slate-200 object-cover sm:h-10 sm:w-10"
                          />
                        ) : (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-400 sm:h-10 sm:w-10">
                            <Package size={16} />
                          </div>
                        )}

                        <span className="min-w-0 break-words font-medium text-slate-900">
                          {product.title}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-2 py-3 sm:px-3">
                      <span className="break-words text-slate-600">
                        {product.category.name}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="break-words px-2 py-3 font-semibold text-slate-900 sm:px-3">
                      ${Number(product.price).toFixed(2)}
                    </td>

                    {/* Created */}
                    <td className="break-words px-2 py-3 text-slate-500 sm:px-3">
                      {new Date(product.creationAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-1 py-3 sm:px-3">
                      <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                        <Link
                          href={`/products/${product.id}`}
                          aria-label={`View ${product.title}`}
                          title="View product"
                          className="rounded-md p-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 sm:p-2"
                        >
                          <ExternalLink size={15} />
                        </Link>

                        <button
                          type="button"
                          aria-label={`Edit ${product.title}`}
                          title="Edit product"
                          className="rounded-md p-1.5 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600 sm:p-2"
                        >
                          <Pencil size={15} />
                        </button>

                        <DeleteProductDialog product={product} />
                      </div>
                    </td>
                  </tr>
                ))}

                {allProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-slate-500"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 px-4 py-4 text-sm text-slate-500">
            Showing {allProducts.length}
            {allProducts.length === 1 ? " product" : " products"}
          </div>
        </section>
      </div>
    </main>
  );
};
export default ProductsPage;
