import { Suspense } from "react";
import { Product } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    return <p>product not found</p>;
  }
  const product: Product = await res.json();
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link className="inline-block mb-4 text-sm underline" href={"/"}>
        Back to products
      </Link>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mt-4 md:mt-0">{product.title}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold mt-2">${product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductContent params={params} />
    </Suspense>
  );
}
