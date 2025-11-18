import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link
      href={`/productVariant/${firstVariant.slug}`}
      className="group flex flex-col gap-3 sm:gap-4"
    >
      <div className="bg-accent relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div
        className={cn("flex flex-col gap-1 sm:gap-1.5", textContainerClassName)}
      >
        <p className="line-clamp-2 truncate text-xs font-medium sm:text-sm">
          {product.name}
        </p>
        <p className="text-muted-foreground line-clamp-1 truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold sm:text-base">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
