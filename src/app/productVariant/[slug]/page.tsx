import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/productsList";
import { db } from "@/db";
import { productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { spacingResponsive, textResponsive } from "@/lib/responsiveUtils";

import ProductActions from "./components/productActions";
import VariantSelector from "./components/variantSelector";

export const revalidate = 300;

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          category: true,
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: (product, { and, ne }) =>
      and(
        eq(product.categoryId, productVariant.product.categoryId),
        ne(product.id, productVariant.product.id),
      ),
    limit: 8,
    with: {
      variants: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-2 lg:gap-12 lg:px-8">
            <div className="bg-accent relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl">
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
              <div>
                <h1 className={`${textResponsive.h2} mb-2`}>
                  {productVariant.product.name}
                </h1>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  {productVariant.color}
                </p>
                <p className={`${textResponsive.h2} text-primary`}>
                  {formatCentsToBRL(productVariant.priceInCents)}
                </p>
              </div>

              <VariantSelector
                selectedVariant={productVariant.slug}
                variants={productVariant.product.variants}
              />

              <ProductActions productVariantId={productVariant.id} />

              <div className="border-t pt-4">
                <h3 className="mb-3 text-base font-semibold sm:text-lg">
                  Descrição
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {productVariant.product.description}
                </p>
              </div>
            </div>
          </div>

          <div className={spacingResponsive.section}>
            <ProductList title="Produtos similares" products={likelyProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductVariantPage;
