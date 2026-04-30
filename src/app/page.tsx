import { desc } from "drizzle-orm";

import BrandShowcase from "@/components/common/brandShowcase";
import CategorySelector from "@/components/common/categorySelector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import HeroBanner from "@/components/common/heroBanner";
import ProductList from "@/components/common/productsList";
import PromoBanner from "@/components/common/promoBanner";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { spacingResponsive } from "@/lib/responsiveUtils";

export const revalidate = 300;

const loadProducts = (limit: number) =>
  db.query.productTable.findMany({
    limit,
    with: {
      variants: true,
    },
  });

const Home = async () => {
  let products: Awaited<ReturnType<typeof loadProducts>> = [];
  let newlyCreatedProducts: Awaited<ReturnType<typeof loadProducts>> = [];
  let categories: Awaited<ReturnType<typeof db.query.categoryTable.findMany>> =
    [];

  try {
    [products, newlyCreatedProducts, categories] = await Promise.all([
      loadProducts(16),
      db.query.productTable.findMany({
        orderBy: [desc(productTable.createdAt)],
        limit: 8,
        with: {
          variants: true,
        },
      }),
      db.query.categoryTable.findMany({}),
    ]);
  } catch (error) {
    console.error("Failed to load home page data", error);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 space-y-8 bg-[linear-gradient(180deg,#f6f1ea_0%,#fbf8f4_28%,#f4efe8_68%,#fcfaf7_100%)] pb-10 sm:space-y-10 sm:pb-14 lg:space-y-14 lg:pb-18">
        <section className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <HeroBanner />
          </div>
        </section>

        <section className={spacingResponsive.section}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BrandShowcase />
          </div>
        </section>

        <section id="produtos">
          <ProductList products={products.slice(0, 8)} title="Mais Vendidos" />
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CategorySelector categories={categories} />
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PromoBanner />
          </div>
        </section>

        <section>
          <ProductList products={newlyCreatedProducts} title="Novos Produtos" />
        </section>

        <section>
          <ProductList
            products={products.slice(8, 16)}
            title="Produtos em Destaque"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
