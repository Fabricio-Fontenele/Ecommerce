import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/categorySelector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Partners from "@/components/common/Partners";
import ProductList from "@/components/common/productsList";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";

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
    <>
      <Header />
      <main className="space-y-8 pb-8">
        {/* Banner Principal */}
        <section className="px-5">
          <Image
            src="/banner.svg"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-lg"
            priority
          />
        </section>

        {/* Marcas Parceiras */}
        <section className="space-y-4">
          <h2 className="px-5 font-semibold">Marcas Parceiras</h2>
          <div className="flex justify-between gap-4 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden">
            {Partners.map((partner) => (
              <div
                key={partner.title}
                className="flex min-w-fit flex-col items-center gap-2"
              >
                <Button variant="secondary" size="sm" className="p-3">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.title}
                    height={54}
                    width={54}
                  />
                </Button>
                <span className="text-center text-xs whitespace-nowrap">
                  {partner.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Produtos Mais Vendidos */}
        <section>
          <ProductList products={products.slice(0, 8)} title="Mais Vendidos" />
        </section>

        {/* Seletor de Categorias */}
        <section className="px-5">
          <CategorySelector categories={categories} />
        </section>

        {/* Banner Secundário */}
        <section className="px-5">
          <Image
            src="/banner2.svg"
            alt="Ofertas especiais"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-lg"
          />
        </section>

        {/* Produtos Novos */}
        <section>
          <ProductList products={newlyCreatedProducts} title="Novos Produtos" />
        </section>

        {/* Produtos em Destaque */}
        <section>
          <ProductList
            products={products.slice(8, 16)}
            title="Produtos em Destaque"
          />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
