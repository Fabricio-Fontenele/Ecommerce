import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getCart } from "@/actions/getCart";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { spacingResponsive } from "@/lib/responsiveUtils";

import CartSummary from "../components/cartSummary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finishOrderbutton";

const ConfirmationPage = async () => {
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

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className={`mx-auto max-w-7xl ${spacingResponsive.page}`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Identificação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm sm:text-base">
                        {formatAddress(cart.shippingAddress)}
                      </p>
                    </CardContent>
                  </Card>
                  <FinishOrderButton />
                </CardContent>
              </Card>
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

export default ConfirmationPage;
