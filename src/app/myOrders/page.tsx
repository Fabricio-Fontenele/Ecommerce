import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Header from "@/components/common/header";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { spacingResponsive, textResponsive } from "@/lib/responsiveUtils";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/login");
  }
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className={`mx-auto max-w-7xl ${spacingResponsive.page}`}>
          <h1 className={`${textResponsive.h2} mb-6 sm:mb-8`}>Meus Pedidos</h1>
          {orders.length > 0 ? (
            <Orders
              orders={orders.map((order) => ({
                id: order.id,
                totalPriceInCents: order.totalPriceInCents,
                status: order.status,
                createdAt: order.createdAt.toISOString(),
                items: order.items.map((item) => ({
                  id: item.id,
                  imageUrl: item.productVariant.imageUrl,
                  productName: item.productVariant.product.name,
                  productVariantName: item.productVariant.name,
                  priceInCents: item.priceInCents,
                  quantity: item.quantity,
                })),
              }))}
            />
          ) : (
            <div className="text-muted-foreground py-12 text-center">
              <p className="text-base sm:text-lg">
                Você ainda não tem pedidos.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyOrdersPage;
