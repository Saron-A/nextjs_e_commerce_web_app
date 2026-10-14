import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/category";

interface CategoryProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <article>
      <Image
        src={category.image}
        alt={category.name}
        width="60"
        height="60"
        className="object-contain"
      />
      <div>
        <h3>{category.name}</h3>
        <Link href={`/categories/${category.id}`}>browse </Link>
      </div>
    </article>
  );
};

export default CategoryCard;
