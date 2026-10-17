import Image from "next/image";
import Link from "next/link";
import { fetchProductsById } from "@/Lib/productsApi";
import AddToCart from "@/components/AddToCart";
import Navbar from "@/components/Navbar";

interface ProductDetailsProp {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetails = async ({ params }: ProductDetailsProp) => {
  const { id } = await params;
  const product = await fetchProductsById(id);
  console.log(product);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
          {/* Product Image */}
          <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:min-h-[400px] sm:p-10 lg:min-h-[500px]">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={500}
              height={500}
              className="max-h-[350px] w-full object-contain transition-transform duration-500 hover:scale-105 sm:max-h-[400px] lg:max-h-[450px]"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center py-2 sm:py-4">
            <p className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
              {product.category.name}
            </p>

            <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:mt-5 sm:text-3xl lg:text-4xl">
              {product.title}
            </h1>

            <p className="mt-5 text-2xl font-bold text-blue-600 sm:mt-6 sm:text-3xl">
              ${product.price.toFixed(2)}
            </p>

            <div className="my-6 border-t border-gray-200 sm:my-8" />

            <div>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Product Description
              </h2>

              <p className="text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                {product.description}
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
