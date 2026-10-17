"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface ProductsFilterProps {
  products: Product[];
}

const ProductsFilter = ({ products }: ProductsFilterProps) => {
  // Get the categories associated with the products.
  const categories = products.map((product) => product.category);

  // Keep only one category object for each unique category ID.
  const uniqueCategories = [
    ...new Map(categories.map((category) => [category.id, category])).values(),
  ];

  // Store the user's selected filters.
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Check whether the entered price range is valid.
  const invalidPriceRange =
    minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice);

  // Filter products according to the selected category and prices.
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategoryId === "all" ||
      String(product.category.id) === selectedCategoryId;

    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    return matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <main className="min-h-screen py-6 sm:py-8 lg:py-10">
      {/* Page Header */}
      <header className="mb-8 border-b border-gray-200 pb-6 sm:mb-10 sm:pb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Explore our collection
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Our Products
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
          Browse our collection and discover products that match your style and
          budget.
        </p>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        {/* Filters Sidebar */}
        <aside className="h-fit w-full shrink-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6 lg:w-64">
          <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>

            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
              Refine
            </span>
          </div>

          {/* Category Filter */}
          <section className="mb-6 border-b border-gray-200 pb-6">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              Category
            </h3>

            <div className="flex flex-col gap-3">
              <label className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategoryId === "all"}
                  onChange={(event) =>
                    setSelectedCategoryId(event.target.value)
                  }
                  className="h-4 w-4 accent-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                />

                <span
                  className={`text-sm transition-colors ${
                    selectedCategoryId === "all"
                      ? "font-semibold text-indigo-600"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  All categories
                </span>
              </label>

              {uniqueCategories.map((category) => (
                <label
                  key={category.id}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="category"
                    value={String(category.id)}
                    checked={selectedCategoryId === String(category.id)}
                    onChange={(event) =>
                      setSelectedCategoryId(event.target.value)
                    }
                    className="h-4 w-4 accent-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  />

                  <span
                    className={`text-sm transition-colors ${
                      selectedCategoryId === String(category.id)
                        ? "font-semibold text-indigo-600"
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Price Filter */}
          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              Price Range ($)
            </h3>

            <div className="mb-4">
              <label
                htmlFor="min"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Minimum price
              </label>

              <input
                type="number"
                id="min"
                name="min"
                min="0"
                placeholder="0"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="max"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Maximum price
              </label>

              <input
                type="number"
                id="max"
                name="max"
                min="0"
                placeholder="Any"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </section>
        </aside>

        {/* Filtered Products */}
        <section className="min-w-0 flex-1">
          <div className="mb-5 flex min-h-12 flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:px-5">
            <p className="text-sm text-gray-600">
              {invalidPriceRange ? (
                <span className="font-medium text-red-600">
                  Invalid price range
                </span>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-bold text-gray-900">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </>
              )}
            </p>
          </div>

          {invalidPriceRange ? (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
            >
              Minimum price cannot be greater than maximum price.
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                🔎
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                No products found
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                No products match your selected filters. Try adjusting the
                category or price range.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductsFilter;
