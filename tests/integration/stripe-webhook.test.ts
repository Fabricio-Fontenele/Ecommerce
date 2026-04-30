import { beforeEach, describe, expect, it, vi } from "vitest";

type TransactionMock = {
  query: {
    orderTable: {
      findFirst: typeof findOrderMock;
    };
  };
  update: () => {
    set: () => {
      where: typeof updateWhereMock;
    };
  };
};

const constructEventMock = vi.fn();
const findOrderMock = vi.fn();
const updateWhereMock = vi.fn();
const transactionMock = vi.fn();
const consoleErrorMock = vi
  .spyOn(console, "error")
  .mockImplementation(() => undefined);

vi.mock("@/db", () => ({
  db: {
    transaction: transactionMock,
  },
}));

vi.mock("stripe", () => ({
  default: class Stripe {
    webhooks = {
      constructEvent: constructEventMock,
    };
  },
}));

beforeEach(() => {
  constructEventMock.mockReset();
  findOrderMock.mockReset();
  updateWhereMock.mockReset();
  transactionMock.mockReset();
  consoleErrorMock.mockClear();
});

describe("POST /api/stripe/webhook", () => {
  it("returns 400 when stripe signature is missing", async () => {
    const { POST } = await import("@/app/api/stripe/webhook/route");

    const response = await POST(
      new Request("http://localhost", { method: "POST" }),
    );

    expect(response.status).toBe(400);
  });

  it("marks the order as paid after a completed checkout", async () => {
    constructEventMock.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          metadata: {
            orderId: "11111111-1111-4111-8111-111111111111",
          },
        },
      },
    });
    transactionMock.mockImplementation(
      async (callback: (tx: TransactionMock) => Promise<void>) => {
        await callback({
          query: {
            orderTable: {
              findFirst: findOrderMock.mockResolvedValue({
                id: "11111111-1111-4111-8111-111111111111",
                status: "pending",
              }),
            },
          },
          update: () => ({
            set: () => ({
              where: updateWhereMock,
            }),
          }),
        });
      },
    );

    const { POST } = await import("@/app/api/stripe/webhook/route");

    const response = await POST(
      new Request("http://localhost", {
        method: "POST",
        headers: {
          "stripe-signature": "signature",
        },
        body: JSON.stringify({}),
      }),
    );

    expect(response.status).toBe(200);
    expect(updateWhereMock).toHaveBeenCalled();
  });

  it("is idempotent when the order has already been paid", async () => {
    constructEventMock.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          metadata: {
            orderId: "11111111-1111-4111-8111-111111111111",
          },
        },
      },
    });
    transactionMock.mockImplementation(
      async (callback: (tx: TransactionMock) => Promise<void>) => {
        await callback({
          query: {
            orderTable: {
              findFirst: findOrderMock.mockResolvedValue({
                id: "11111111-1111-4111-8111-111111111111",
                status: "paid",
              }),
            },
          },
          update: () => ({
            set: () => ({
              where: updateWhereMock,
            }),
          }),
        });
      },
    );

    const { POST } = await import("@/app/api/stripe/webhook/route");

    const response = await POST(
      new Request("http://localhost", {
        method: "POST",
        headers: {
          "stripe-signature": "signature",
        },
        body: JSON.stringify({}),
      }),
    );

    expect(response.status).toBe(200);
    expect(updateWhereMock).not.toHaveBeenCalled();
  });

  it("returns a controlled error when checkout metadata is invalid", async () => {
    constructEventMock.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          metadata: {},
        },
      },
    });

    const { POST } = await import("@/app/api/stripe/webhook/route");

    const response = await POST(
      new Request("http://localhost", {
        method: "POST",
        headers: {
          "stripe-signature": "signature",
        },
        body: JSON.stringify({}),
      }),
    );

    expect(response.status).toBe(400);
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Stripe webhook received invalid checkout metadata",
      expect.objectContaining({
        sessionId: "cs_test_123",
      }),
    );
  });
});
