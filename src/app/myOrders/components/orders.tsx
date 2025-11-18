"use client";

import CartSummary from "@/app/cart/components/cartSummary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: string;
    createdAt: string;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4 sm:p-6">
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${order.id}`} className="border-none">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full flex-col gap-2 pr-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex flex-col items-start gap-2">
                      {order.status === "paid" && (
                        <Badge className="text-xs">Pago</Badge>
                      )}
                      {order.status === "pending" && (
                        <Badge variant="outline" className="text-xs">
                          Pagamento Pendente
                        </Badge>
                      )}
                      {order.status === "canceled" && (
                        <Badge variant="destructive" className="text-xs">
                          Cancelado
                        </Badge>
                      )}
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Pedido feito em{" "}
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <p className="text-left text-xs font-semibold sm:text-right sm:text-sm">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "itens"}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <CartSummary
                    subtotalInCents={order.totalPriceInCents}
                    totalInCents={order.totalPriceInCents}
                    products={order.items.map((item) => ({
                      id: item.id,
                      name: item.productName,
                      variantName: item.productVariantName,
                      priceInCents: item.priceInCents,
                      quantity: item.quantity,
                      imageUrl: item.imageUrl,
                    }))}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
