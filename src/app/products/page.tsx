import { fetchAllProducts } from "@/Lib/productsApi";
import ProductsFilter from "@/app/products/ProductsFilter";
import Navbar from "@/components/Navbar";

const ProductsPage = async () => {
  const products = await fetchAllProducts();

  const hostnames = [
    ...new Set(
      products.flatMap((product) =>
        product.images.map((image) => {
          try {
            return new URL(image).hostname;
          } catch {
            return null;
          }
        }),
      ),
    ),
  ].filter(Boolean);

  console.log("Unique image hostnames:", hostnames);
  console.log(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <ProductsFilter products={products} />
      </main>
    </div>
  );
};

export default ProductsPage;
