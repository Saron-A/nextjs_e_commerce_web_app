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
    <main className="min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Products Page</h1>
        <p className="mt-2 text-gray-600">
          Browse products and narrow your results using the filters.
        </p>
      </header>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Filters sidebar */}
        <aside className="h-fit w-full rounded-xl border border-gray-300 p-4 md:w-64">
          <h2 className="mb-4 border-b border-gray-300 pb-3 text-lg font-semibold">
            Filters
          </h2>

          {/* Category filter */}
          <section className="mb-6 border-b border-gray-300 pb-5">
            <h3 className="mb-3 font-semibold">CATEGORY</h3>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategoryId === "all"}
                  onChange={(event) =>
                    setSelectedCategoryId(event.target.value)
                  }
                />
                <span>All categories</span>
              </label>

              {uniqueCategories.map((category) => (
                <label key={category.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    value={String(category.id)}
                    checked={selectedCategoryId === String(category.id)}
                    onChange={(event) =>
                      setSelectedCategoryId(event.target.value)
                    }
                  />

                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Price filter */}
          <section>
            <h3 className="mb-3 font-semibold">PRICE RANGE ($)</h3>

            <div className="mb-4">
              <label htmlFor="min" className="mb-1 block text-sm">
                Min
              </label>

              <input
                type="number"
                id="min"
                name="min"
                min="0"
                placeholder="0"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            <div>
              <label htmlFor="max" className="mb-1 block text-sm">
                Max
              </label>

              <input
                type="number"
                id="max"
                name="max"
                min="0"
                placeholder="Any"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </section>
        </aside>

        {/* Filtered products */}
        <section className="min-w-0 flex-1">
          <p className="mb-4 text-gray-600">
            {invalidPriceRange
              ? "Invalid price range"
              : `${filteredProducts.length} products found`}
          </p>

          {invalidPriceRange ? (
            <p className="text-red-600">
              Minimum price cannot be greater than maximum price.
            </p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No products match your selected filters.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductsFilter;
