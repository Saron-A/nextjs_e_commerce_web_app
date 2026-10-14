"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="flex gap-5 border-1 rounded justify-between px-6 py-8">
      <div>
        <Image
          src={product.images[0]}
          alt={product.slug}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <div>
        <div className="">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            {product.category.name}
          </p>
          <h3 className="font-extrabold">{product.title}</h3>

          <h3 className="text-blue-500 font-bold">${product.price}</h3>
        </div>
        <Link href={`/products/${product.id}`}>
          <button className="px-4 py-2 border-0 rounded bg-blue-500 text-white font-bold hover:bg-blue-700">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
