import { Product, NewProduct } from "@/types/product";
import { Category } from "@/types/category";
import { AuthUser } from "@/types/authUser";

interface NewProductProps {
  product: NewProduct;
  user: AuthUser;
}

interface ProductProps {
  product: Product;
  user: AuthUser;
}

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

async function createProduct({ product, user }: NewProductProps) {
  console.log("Product payload:", JSON.stringify(product, null, 2));
  console.log("Images:", product.images[0]);
  console.log("Is images an array:", Array.isArray(product.images));

  const response = await fetch("https://api.escuelajs.co/api/v1/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Backend Error", errorData);
    throw new Error(`Failed to create product`);
  }

  const data = response.json();
  return data;
}

async function deleteProductById({ product, user }: ProductProps) {
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/products/${product.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    },
  );
  if (!response.ok) {
    console.error("Failed to delete this product", response.status);
    return;
  }
  const data = response.json();
  console.log("deletion status", data);
  return data;
}

export {
  fetchAllProducts,
  fetchProductsById,
  fetchProductsByCategoryId,
  createProduct,
  deleteProductById,
};
