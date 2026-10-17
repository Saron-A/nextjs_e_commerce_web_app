"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { ArrowRight } from "lucide-react";

interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <article className="group justify-self-center self-center w-full flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        className="flex h-52 items-center justify-center overflow-hidden bg-gray-50 p-5 sm:h-56"
      >
        <Image
          src={product.images[0]}
          alt={product.slug}
          width={250}
          height={250}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
          {product.category.name}
        </p>

        <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-900 transition-colors group-hover:text-blue-600 sm:text-lg">
          {product.title}
        </h3>

        <p className="mt-3 text-xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>

        {/* View Product Button */}
        <Link
          href={`/products/${product.id}`}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          View Product
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
