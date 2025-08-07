import Image from "next/image";

import Header from "@/components/common/header";
import ProductsList from "@/components/common/productsList";
import { db } from "@/db";
export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <div className="space-y-6 px-5">
        <Image
          src="/banner.svg"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="mt-5 h-auto w-full"
        />
        <ProductsList products={products} title="Produtos em destaque" />
        <Image
          src="/banner2.svg"
          alt="Seja automatico"
          width={0}
          height={0}
          sizes="100vw"
          className="mt-5 h-auto w-full"
        />
      </div>
    </>
  );
}
