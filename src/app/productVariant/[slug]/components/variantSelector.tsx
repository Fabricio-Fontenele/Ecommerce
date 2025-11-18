import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  selectedVariant?: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  variants,
  selectedVariant,
}: VariantSelectorProps) => {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold sm:text-base">Variações</h3>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {variants.map((variant) => (
          <Link
            href={`/productVariant/${variant.slug}`}
            key={variant.id}
            className={`rounded-xl transition-all sm:rounded-2xl ${
              selectedVariant === variant.slug
                ? "border-primary ring-primary border-2 border-solid ring-2 ring-offset-2"
                : "hover:border-muted border-2 border-transparent"
            }`}
          >
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
              <Image
                src={variant.imageUrl}
                alt={variant.name}
                fill
                sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 80px"
                className="rounded-xl object-cover sm:rounded-2xl"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;
