import { Product } from "@/types/product";
import { Category } from "@/types/category";

// interface ProductsResponse {
//     products: Product[];
//     limit: number;
//     offset: number;
//     total: number;
// }

async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  if (!response.ok) {
    throw new Error(`HTTP ERROR: ${response.status}`);
  }
  const data: Product[] = await response.json();
  return data;
}

async function fetchProductsById(id: string): Promise<Product> {
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/products/${id}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function fetchProductsByCategoryId(id: string) {
  // map the id to all the products with the same category ids
  // return an array of the products

  const allProducts = await fetchAllProducts();
  console.log("All Products", allProducts);
  const productsByCategory = allProducts.filter(
    (product) => String(product.category.id) === id && product,
  );
  console.log("Products of same category", productsByCategory);
  return productsByCategory;
}

export { fetchAllProducts, fetchProductsById, fetchProductsByCategoryId };
