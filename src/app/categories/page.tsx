import { fetchAllProducts } from "@/Lib/productsApi";
import CategoryCard from "@/components/CategoryCard";

const CategoriesList = async () => {
  const products = await fetchAllProducts();

  const categoryIds = products.map((product) => product.category.id);
  const uniqueCategoryIds = [...new Set(categoryIds)]; // Set compare memory addresses, not content
  //this contains only the Id numbers [1,2,3,4,5]
  const categories = uniqueCategoryIds.map(
    (id) => products.find((product) => product.category.id === id)?.category,
  );
  console.log(categories);

  return (
    <div>
      <header>
        <h1>Categories</h1>
        <p>Find products grouped by department</p>
      </header>
      <section>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
    </div>
  );
};

export default CategoriesList;
