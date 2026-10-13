import { fetchAllProducts } from "@/Lib/productsApi";
import ProductCard from "@/components/ProductCard";

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
    <div className="min-h-screen">
      <h1>Products Page</h1>
      <div className="grid grid-cols-3 gap-10 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
