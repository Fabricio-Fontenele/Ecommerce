import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getCart } from "@/actions/getCart";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";

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
    <div>
      <Header />
      <div className="space-y-4 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm">{formatAddress(cart.shippingAddress)}</p>
              </CardContent>
            </Card>
            <FinishOrderButton />
          </CardContent>
        </Card>
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
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default ConfirmationPage;
