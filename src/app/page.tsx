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

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    limit: 8,
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 space-y-6 pb-8 sm:space-y-8 sm:pb-12 lg:space-y-12 lg:pb-16">
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
