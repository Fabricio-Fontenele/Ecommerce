import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/cart/components/cartSummary", () => ({
  default: () => React.createElement("div", null, "Resumo mockado"),
}));

import Orders from "@/app/myOrders/components/orders";

describe("Orders", () => {
  it("renders badges for paid, pending and cancelled orders", () => {
    render(
      React.createElement(Orders, {
        orders: [
          {
            id: "1",
            totalPriceInCents: 1000,
            status: "paid",
            createdAt: "2026-04-29T00:00:00.000Z",
            items: [
              {
                id: "item-1",
                imageUrl: "/image.png",
                productName: "Produto 1",
                productVariantName: "Azul",
                priceInCents: 1000,
                quantity: 1,
              },
            ],
          },
          {
            id: "2",
            totalPriceInCents: 2000,
            status: "pending",
            createdAt: "2026-04-29T00:00:00.000Z",
            items: [
              {
                id: "item-2",
                imageUrl: "/image.png",
                productName: "Produto 2",
                productVariantName: "Preto",
                priceInCents: 2000,
                quantity: 2,
              },
            ],
          },
          {
            id: "3",
            totalPriceInCents: 3000,
            status: "cancelled",
            createdAt: "2026-04-29T00:00:00.000Z",
            items: [
              {
                id: "item-3",
                imageUrl: "/image.png",
                productName: "Produto 3",
                productVariantName: "Branco",
                priceInCents: 3000,
                quantity: 3,
              },
            ],
          },
        ],
      }),
    );

    expect(screen.getByText("Pago")).toBeInTheDocument();
    expect(screen.getByText("Pagamento Pendente")).toBeInTheDocument();
    expect(screen.getByText("Cancelado")).toBeInTheDocument();
  });
});
