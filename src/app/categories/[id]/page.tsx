import Link from "next/link";
import { fetchProductsByCategoryId } from "@/Lib/productsApi";
import Navbar from "@/components/Navbar";

interface CategoryDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryDetails = async ({ params }: CategoryDetailsProps) => {
  const { id } = await params;
  const products = await fetchProductsByCategoryId(id);
  console.log(products);

  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <section>
        <header>{products[0].category.name}</header>
        <section>
          {products &&
            products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <article>
                  <h3>{product.title}</h3>
                </article>
              </Link>
            ))}
        </section>
      </section>
    </div>
  );
};

export default CategoryDetails;
