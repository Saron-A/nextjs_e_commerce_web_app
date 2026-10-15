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
    <div>
      <Navbar />
      <ProductsFilter products={products} />
    </div>
  );
};

export default ProductsPage;
