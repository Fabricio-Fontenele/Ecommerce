import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getCart } from "@/actions/getCart";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { spacingResponsive } from "@/lib/responsiveUtils";

import CartSummary from "../components/cartSummary";
import Addresses from "./components/addreses";
const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/login");
  }

  const cart = await getCart();

  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className={`mx-auto max-w-7xl ${spacingResponsive.page}`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <Addresses
                shippingAddresses={shippingAddresses}
                initialCart={cart}
              />
            </div>
            <div className="lg:col-span-1">
              <CartSummary
                subtotalInCents={cartTotalInCents}
                totalInCents={cartTotalInCents}
                products={cart.items.map((item) => ({
                  id: item.id,
                  name: item.productVariant.product.name,
                  variantName: item.productVariant.name,
                  quantity: item.quantity,
                  priceInCents: item.productVariant.priceInCents,
                  imageUrl: item.productVariant.imageUrl,
                }))}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IdentificationPage;
