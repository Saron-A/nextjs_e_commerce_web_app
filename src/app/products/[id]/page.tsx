import Image from "next/image";
import Link from "next/link";
import { fetchProductsById } from "@/Lib/productsApi";
import AddToCart from "@/components/AddToCart";

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
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex min-h-[450px] items-center justify-center rounded-xl border bg-white p-10">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
            className="max-h-[400px] w-full object-contain"
          />
        </div>

        <div>
          <p className="text-sm uppercase text-slate-400">
            {product.category.name}
          </p>

          <h1 className="mt-3 text-4xl font-bold">{product.title}</h1>

          <p className="mt-6 text-2xl font-bold">${product.price.toFixed(2)}</p>

          <p className="mt-6 leading-7 text-slate-600">{product.description}</p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
