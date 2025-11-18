import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Resumo do Carrinho</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="flex justify-between">
          <p className="text-sm sm:text-base">Subtotal:</p>
          <p className="text-muted-foreground text-sm font-medium sm:text-base">
            {formatCentsToBRL(subtotalInCents)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm sm:text-base">Frete:</p>
          <p className="text-sm font-medium text-green-600 sm:text-base">
            Grátis
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-semibold sm:text-base">Total:</p>
          <p className="text-primary text-sm font-bold sm:text-base">
            {formatCentsToBRL(totalInCents)}
          </p>
        </div>
        <div className="py-2 sm:py-3">
          <Separator />
        </div>
        <div className="max-h-96 space-y-4 overflow-y-auto sm:space-y-6">
          {products.map((product) => (
            <div
              className="flex items-center justify-between gap-3"
              key={product.id}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                <div className="relative h-14 w-14 flex-shrink-0 sm:h-16 sm:w-16">
                  <Image
                    src={product.imageUrl}
                    alt={product.variantName}
                    fill
                    sizes="(max-width: 640px) 56px, 64px"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="truncate text-xs font-medium sm:text-sm">
                    {product.name}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {product.variantName}
                  </p>
                </div>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end justify-center gap-1">
                <p className="text-xs font-bold whitespace-nowrap sm:text-sm">
                  {formatCentsToBRL(product.priceInCents)}
                </p>
                <p className="text-muted-foreground text-xs whitespace-nowrap">
                  Qtd: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
