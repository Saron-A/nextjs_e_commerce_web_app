import Link from "next/link";
import { fetchProductsByCategoryId } from "@/Lib/productsApi";
import Navbar from "@/components/Navbar";

interface CategoryDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryDetails = async ({ params }: CategoryDetailsProps) => {
  const { id } = await params;
  const products = await fetchProductsByCategoryId(id);
  console.log(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <header className="border-b border-gray-200 pb-6 sm:pb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Explore our collection
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {products[0].category.name}
          </h1>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Discover products in this category.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products &&
            products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6"
              >
                <article className="flex h-full flex-col gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-48 w-full rounded-lg bg-gray-50 object-contain p-4 transition-transform duration-300 group-hover:scale-105 sm:h-56"
                  />
                  <h3 className="text-base font-semibold leading-6 text-gray-800 transition-colors group-hover:text-blue-600 sm:text-lg">
                    {product.title}
                  </h3>

                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-blue-600">
                    View product
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </article>
              </Link>
            ))}
        </section>
      </section>
    </div>
  );
};

export default CategoryDetails;
