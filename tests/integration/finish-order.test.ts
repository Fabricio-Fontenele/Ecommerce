import { beforeEach, describe, expect, it, vi } from "vitest";

type TransactionMock = {
  delete: () => {
    where: typeof deleteWhereMock;
  };
  update: () => {
    set: () => {
      where: typeof updateWhereMock;
    };
  };
  insert: () => {
    values: typeof insertValuesMock;
  };
};

const getRequiredSessionMock = vi.fn();
const getCartWithItemsMock = vi.fn();
const getCartTotalPriceInCentsMock = vi.fn();
const findPendingOrderMock = vi.fn();
const transactionMock = vi.fn();
const deleteWhereMock = vi.fn();
const updateWhereMock = vi.fn();
const insertOrderReturningMock = vi.fn();
const insertValuesMock = vi.fn();

vi.mock("@/lib/authSession", () => ({
  getRequiredSession: getRequiredSessionMock,
}));

vi.mock("@/lib/cart", () => ({
  getCartWithItems: getCartWithItemsMock,
  getCartTotalPriceInCents: getCartTotalPriceInCentsMock,
}));

vi.mock("@/db", () => ({
  db: {
    query: {
      orderTable: {
        findFirst: findPendingOrderMock,
      },
    },
    transaction: transactionMock,
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: insertOrderReturningMock,
      })),
    })),
  },
}));

beforeEach(() => {
  getRequiredSessionMock.mockReset();
  getCartWithItemsMock.mockReset();
  getCartTotalPriceInCentsMock.mockReset();
  findPendingOrderMock.mockReset();
  transactionMock.mockReset();
  deleteWhereMock.mockReset();
  updateWhereMock.mockReset();
  insertOrderReturningMock.mockReset();
  insertValuesMock.mockReset();
});

describe("finishOrder", () => {
  it("creates a new pending order snapshot without clearing the cart", async () => {
    getRequiredSessionMock.mockResolvedValue({
      user: { id: "user-1", email: "user@example.com" },
    });
    getCartWithItemsMock.mockResolvedValue({
      id: "cart-1",
      shippingAddress: {
        id: "address-1",
        zipCode: "60000-000",
        country: "Brasil",
        phone: "(85) 99999-9999",
        cpfOrCnpj: "123.456.789-10",
        city: "Fortaleza",
        complement: null,
        neighborhood: "Centro",
        number: "10",
        recipientName: "Maria",
        state: "CE",
        street: "Rua A",
      },
      items: [
        {
          quantity: 2,
          productVariant: {
            id: "variant-1",
            priceInCents: 5000,
          },
        },
      ],
    });
    getCartTotalPriceInCentsMock.mockReturnValue(10000);
    findPendingOrderMock.mockResolvedValue(undefined);
    insertOrderReturningMock.mockResolvedValue([{ id: "order-1" }]);

    const { finishOrder } = await import("@/actions/finishOrder");

    await expect(finishOrder()).resolves.toEqual({
      orderId: "order-1",
    });
  });

  it("reuses the latest pending order and refreshes its snapshot", async () => {
    getRequiredSessionMock.mockResolvedValue({
      user: { id: "user-1", email: "user@example.com" },
    });
    getCartWithItemsMock.mockResolvedValue({
      id: "cart-1",
      shippingAddress: {
        id: "address-1",
        zipCode: "60000-000",
        country: "Brasil",
        phone: "(85) 99999-9999",
        cpfOrCnpj: "123.456.789-10",
        city: "Fortaleza",
        complement: null,
        neighborhood: "Centro",
        number: "10",
        recipientName: "Maria",
        state: "CE",
        street: "Rua A",
      },
      items: [
        {
          quantity: 1,
          productVariant: {
            id: "variant-1",
            priceInCents: 2500,
          },
        },
      ],
    });
    getCartTotalPriceInCentsMock.mockReturnValue(2500);
    findPendingOrderMock.mockResolvedValue({ id: "order-1" });
    transactionMock.mockImplementation(
      async (callback: (tx: TransactionMock) => Promise<void>) => {
        await callback({
          delete: () => ({
            where: deleteWhereMock,
          }),
          update: () => ({
            set: () => ({
              where: updateWhereMock,
            }),
          }),
          insert: () => ({
            values: insertValuesMock,
          }),
        });
      },
    );

    const { finishOrder } = await import("@/actions/finishOrder");

    await expect(finishOrder()).resolves.toEqual({
      orderId: "order-1",
    });
    expect(deleteWhereMock).toHaveBeenCalled();
    expect(updateWhereMock).toHaveBeenCalled();
    expect(insertValuesMock).toHaveBeenCalled();
  });
});
