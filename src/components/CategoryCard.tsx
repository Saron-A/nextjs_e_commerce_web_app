import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/category";

interface CategoryProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="flex h-44 items-center justify-center bg-gray-100 p-6 transition-colors duration-300 group-hover:bg-blue-50 sm:h-48">
        <img
          src={category.image}
          alt={category.name}
          width="60"
          height="60"
          className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-28 sm:w-28"
        />
      </div>

      <div className="flex flex-1 flex-col items-start gap-4 p-5 sm:p-6">
        <h3 className="text-lg font-semibold capitalize text-gray-900 transition-colors duration-300 group-hover:text-blue-500 sm:text-xl">
          {category.name}
        </h3>

        <Link
          href={`/categories/${category.id}`}
          className="mt-auto inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Browse
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
};

export default CategoryCard;
