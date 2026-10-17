import { fetchAllProducts } from "@/Lib/productsApi";
import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";

const CategoriesList = async () => {
  const products = await fetchAllProducts();

  const categoryIds = products.map((product) => product.category.id);
  const uniqueCategoryIds = [...new Set(categoryIds)]; // Set compare memory addresses, not content
  //this contains only the Id numbers [1,2,3,4,5]
  const categories = uniqueCategoryIds.map(
    (id) => products.find((product) => product.category.id === id)?.category,
  );
  console.log(categories);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <header className="mb-8 border-b border-gray-200 pb-6 sm:mb-10 sm:pb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Browse by department
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Categories
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            Find products grouped by department and discover something you’ll
            love.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default CategoriesList;
