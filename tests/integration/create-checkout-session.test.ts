import { beforeEach, describe, expect, it, vi } from "vitest";

const getRequiredSessionMock = vi.fn();
const findOrderMock = vi.fn();
const findOrderItemsMock = vi.fn();
const createCheckoutSessionMock = vi.fn();

vi.mock("@/lib/authSession", () => ({
  getRequiredSession: getRequiredSessionMock,
}));

vi.mock("@/db", () => ({
  db: {
    query: {
      orderTable: {
        findFirst: findOrderMock,
      },
      orderItemTable: {
        findMany: findOrderItemsMock,
      },
    },
  },
}));

vi.mock("stripe", () => ({
  default: class Stripe {
    checkout = {
      sessions: {
        create: createCheckoutSessionMock,
      },
    };
  },
}));

beforeEach(() => {
  getRequiredSessionMock.mockReset();
  findOrderMock.mockReset();
  findOrderItemsMock.mockReset();
  createCheckoutSessionMock.mockReset();
});

describe("createCheckoutSession", () => {
  it("creates a checkout session using only the order metadata", async () => {
    getRequiredSessionMock.mockResolvedValue({
      user: { id: "user-1" },
    });
    findOrderMock.mockResolvedValue({
      id: "22222222-2222-4222-8222-222222222222",
      userId: "user-1",
      status: "pending",
    });
    findOrderItemsMock.mockResolvedValue([
      {
        quantity: 1,
        priceInCents: 5000,
        productVariant: {
          name: "Azul",
          imageUrl: "https://example.com/image.png",
          product: {
            name: "Camiseta",
            description: "Descricao",
          },
        },
      },
    ]);
    createCheckoutSessionMock.mockResolvedValue({
      id: "cs_test_123",
    });

    const { createCheckoutSession } = await import(
      "@/actions/createCheckoutSession"
    );

    await expect(
      createCheckoutSession({
        orderId: "22222222-2222-4222-8222-222222222222",
      }),
    ).resolves.toEqual({
      id: "cs_test_123",
      orderId: "22222222-2222-4222-8222-222222222222",
    });

    expect(createCheckoutSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: {
          orderId: "22222222-2222-4222-8222-222222222222",
        },
      }),
    );
  });

  it("fails when the order has already been paid", async () => {
    getRequiredSessionMock.mockResolvedValue({
      user: { id: "user-1" },
    });
    findOrderMock.mockResolvedValue({
      id: "22222222-2222-4222-8222-222222222222",
      userId: "user-1",
      status: "paid",
    });

    const { createCheckoutSession } = await import(
      "@/actions/createCheckoutSession"
    );

    await expect(
      createCheckoutSession({
        orderId: "22222222-2222-4222-8222-222222222222",
      }),
    ).rejects.toThrow("Order has already been paid");
  });

  it("fails when the order has been cancelled", async () => {
    getRequiredSessionMock.mockResolvedValue({
      user: { id: "user-1" },
    });
    findOrderMock.mockResolvedValue({
      id: "22222222-2222-4222-8222-222222222222",
      userId: "user-1",
      status: "cancelled",
    });

    const { createCheckoutSession } = await import(
      "@/actions/createCheckoutSession"
    );

    await expect(
      createCheckoutSession({
        orderId: "22222222-2222-4222-8222-222222222222",
      }),
    ).rejects.toThrow("Order has been cancelled");
  });
});
