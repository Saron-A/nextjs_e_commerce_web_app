import Link from "next/link";
import Image from "next/image";
import { fetchAllProducts } from "@/Lib/productsApi";
import { fetchAllUsers } from "@/Lib/usersApi";
import {
  Package,
  Tag,
  Users,
  ShoppingCart,
  Plus,
  ExternalLink,
} from "lucide-react";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import AddProductDialog from "@/components/admin/AddProducts";
import type { ComponentType } from "react";

const DashboardPage = async () => {
  let allProducts: Product[] = [];
  let allUsers: User[] = [];
  try {
    allProducts = await fetchAllProducts();
    allUsers = await fetchAllUsers();
  } catch (err) {
    console.log(err);
  }

  const categoryIds = allProducts.map((product) => product.category.id);
  const uniqueCategoryIds = [...new Set(categoryIds)]; // Set compare memory addresses, not content
  //this contains only the Id numbers [1,2,3,4,5]
  const categories = uniqueCategoryIds.map(
    (id) => allProducts.find((product) => product.category.id === id)?.category,
  );
  const AddProductDialogWithCategories =
    AddProductDialog as unknown as ComponentType<{
      categories: Product["category"][];
    }>;

  const recentProducts = allProducts
    .sort((a, b) => Date.parse(b.creationAt) - Date.parse(a.creationAt))
    .slice(0, 15);

  return (
    <div>
      <header>
        <h1>Good morning, Admin</h1>
        <p>Here&apos;s what&apos;s happening with your store today.</p>
      </header>
      <main>
        <section>
          <article>
            <Package />
            <p>Total Products</p>
            <span>{allProducts.length}</span>
          </article>

          <article>
            <Tag />
            <p>Total categories</p>
            <span>{categories.length}</span>
          </article>

          <article>
            <Users />
            <p>Total Users</p>
            <span>{allUsers.length}</span>
          </article>
        </section>
        <section>
          <section>
            <header>
              <h3>Recent Products</h3>
              <Link href="/admin/products">View ALL</Link>
            </header>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Created_at</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
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
                      <Link href={`/products/${product.id}`}> Go </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section>
            <h3>Quick Action</h3>
            <div>
              <AddProductDialog
                categories={categories.filter(
                  (category): category is Product["category"] =>
                    category !== undefined,
                )}
              />
              <Link href="/admin/categories">
                <Tag />
                <p>Manage Categories</p>
              </Link>
              <Link href="/admin/users">
                <Users />
                <p>View Users</p>
              </Link>
              <Link href="/">
                <ExternalLink />
                <p>Browse Store</p>
              </Link>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
