import { fetchAllProducts } from "@/Lib/productsApi";

const ProductsPage = async () => {
  const data = await fetchAllProducts();

  console.log(data);
  return <div>Products Page</div>;
};

export default ProductsPage;
