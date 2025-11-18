import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import Header from "@/components/common/header";
import ProductItem from "@/components/common/productItem";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";
import {
  gridResponsive,
  spacingResponsive,
  textResponsive,
} from "@/lib/responsiveUtils";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className={`mx-auto max-w-7xl ${spacingResponsive.page}`}>
          <h2 className={`${textResponsive.h2} mb-6 sm:mb-8`}>
            {category.name}
          </h2>
          {products.length > 0 ? (
            <div className={gridResponsive.products}>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  textContainerClassName="max-w-full"
                />
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground py-12 text-center">
              <p className="text-base sm:text-lg">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
