import { Product } from "./types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="p-4 mt-2 rounded-lg border">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          className="w-full h-48 object-contain"
        />
        <h2 className="text-sm font-bold">{product.title}</h2>
        <p className="text-sm text-gray-500">Category : {product.category}</p>
        <span className="text-sm text-gray-500">Rating : {product.rating}</span>
        <p className="text-sm text-gray-500">Price : ${product.price}</p>
      </Link>
    </div>
  );
}
