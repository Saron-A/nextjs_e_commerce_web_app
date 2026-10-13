import { Product } from "@/types/product";

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

export { fetchAllProducts, fetchProductsById };
