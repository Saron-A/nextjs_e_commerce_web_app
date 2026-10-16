import Image from "next/image";
import Link from "next/link";
import { fetchAllProducts } from "@/Lib/productsApi";
import { Category } from "@/types/category";

const CategoriesPage = async () => {
  const products = await fetchAllProducts();

  const categoryIds = products.map((product) => product.category.id);
  const uniqueCategoryIds = [...new Set(categoryIds)]; // Set compare memory addresses, not content
  //this contains only the Id numbers [1,2,3,4,5]

  const categories: Category[] = uniqueCategoryIds
    .map(
      (id) => products.find((product) => product.category.id === id)?.category,
    )
    .filter((category): category is Category => category !== undefined);
  console.log(categories);

  return (
    <div>
      <header>
        <h1>Categories Page</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Slug</th>
            <th>Created</th>
            <th>View</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>
                <div>
                  <img
                    src={category.image}
                    alt={category.name}
                    width="21"
                    height="7"
                    className="object-contain"
                  />
                  <span>{category.name}</span>
                </div>
              </td>
              <td>
                <p>{category.slug}</p>
              </td>
              <td>
                <p>{category.creationAt}</p>
              </td>
              <td>
                <Link href={`/categories/${category.id}`}> Open</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
