import Image from "next/image";
import Link from "next/link";
import { fetchAllProducts } from "@/Lib/productsApi";
import { Product } from "@/types/product";
import AddProductDialog from "@/components/admin/AddProducts";
import { Pencil, Trash, ExternalLink } from "lucide-react";

const ProductsPage = async () => {
  console.log("This is the Products page");
  const allProducts = await fetchAllProducts();

  const categoryIds = allProducts.map((product) => product.category.id);
  const uniqueCategoryIds = [...new Set(categoryIds)]; // Set compare memory addresses, not content
  //this contains only the Id numbers [1,2,3,4,5]
  const categories = uniqueCategoryIds.map(
    (id) => allProducts.find((product) => product.category.id === id)?.category,
  );
  return (
    <main>
      <header>
        <div>
          <h2>Products page</h2>
          <p>Create, Edit and manage your catalog inventory</p>
        </div>
        <AddProductDialog
          categories={categories.filter(
            (category): category is Product["category"] =>
              category !== undefined,
          )}
        />
      </header>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created_at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div>
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width="21"
                    height="7"
                  />
                  <span>{product.title}</span>
                </div>
              </td>
              <td>
                <p>{product.category.slug}</p>
              </td>
              <td>
                <p>${product.price}</p>
              </td>
              <td>
                <p>{product.creationAt}</p>
              </td>
              <td>
                <div>
                  <Link href={`/products/${product.id}`}>
                    <ExternalLink />
                  </Link>

                  <Pencil />
                  <Trash />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
export default ProductsPage;
