"use client";

import { productTable, productVariantTable } from "@/db/schema";
import { gridResponsive } from "@/lib/responsiveUtils";

import ProductItem from "./productItem";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="px-4 text-base font-semibold sm:px-6 sm:text-lg lg:px-8 lg:text-xl">
        {title}
      </h3>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={gridResponsive.products}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
