import { beforeEach, describe, expect, it, vi } from "vitest";

const getRequiredSessionMock = vi.fn();
const findVariantMock = vi.fn();
const onConflictDoUpdateMock = vi.fn();
const valuesMock = vi.fn(() => ({
  onConflictDoUpdate: onConflictDoUpdateMock,
}));
const insertMock = vi.fn(() => ({
  values: valuesMock,
}));
const getOrCreateCartMock = vi.fn();

vi.mock("@/lib/authSession", () => ({
  getRequiredSession: getRequiredSessionMock,
}));

vi.mock("@/lib/cart", () => ({
  getOrCreateCart: getOrCreateCartMock,
}));

vi.mock("@/db", () => ({
  db: {
    query: {
      productVariantTable: {
        findFirst: findVariantMock,
      },
    },
    insert: insertMock,
  },
}));

beforeEach(() => {
  getRequiredSessionMock.mockReset();
  findVariantMock.mockReset();
  valuesMock.mockClear();
  onConflictDoUpdateMock.mockReset();
  insertMock.mockClear();
  getOrCreateCartMock.mockReset();
});

describe("addProductToCart", () => {
  it("upserts the cart item for the authenticated user's cart", async () => {
    getRequiredSessionMock.mockResolvedValue({
      user: { id: "user-1" },
    });
    getOrCreateCartMock.mockResolvedValue({ id: "cart-1" });
    findVariantMock.mockResolvedValue({ id: "variant-1", priceInCents: 1000 });

    const { addProductToCart } = await import("@/actions/addCartProduct");

    await addProductToCart({
      productVariantId: "11111111-1111-4111-8111-111111111111",
      quantity: 2,
    });

    expect(getOrCreateCartMock).toHaveBeenCalledWith("user-1");
    expect(valuesMock).toHaveBeenCalledWith({
      cartId: "cart-1",
      productVariantId: "11111111-1111-4111-8111-111111111111",
      quantity: 2,
    });
    expect(onConflictDoUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Array),
        set: expect.objectContaining({
          quantity: expect.anything(),
        }),
      }),
    );
  });

  it("keeps the same atomic upsert contract on repeated calls", async () => {
    getRequiredSessionMock.mockResolvedValue({
      user: { id: "user-1" },
    });
    getOrCreateCartMock.mockResolvedValue({ id: "cart-1" });
    findVariantMock.mockResolvedValue({ id: "variant-1", priceInCents: 1000 });

    const { addProductToCart } = await import("@/actions/addCartProduct");

    await addProductToCart({
      productVariantId: "11111111-1111-4111-8111-111111111111",
      quantity: 1,
    });
    await addProductToCart({
      productVariantId: "11111111-1111-4111-8111-111111111111",
      quantity: 3,
    });

    expect(onConflictDoUpdateMock).toHaveBeenCalledTimes(2);
    expect(insertMock).toHaveBeenCalledTimes(2);
  });
});
