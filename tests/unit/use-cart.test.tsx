import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { getCartMock } = vi.hoisted(() => ({
  getCartMock: vi.fn(),
}));

vi.mock("@/actions/getCart", () => ({
  getCart: getCartMock,
}));

import { UseCart } from "@/hooks/queries/useCart";

const createWrapper = () => {
  const queryClient = new QueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    );

  Wrapper.displayName = "UseCartTestWrapper";

  return Wrapper;
};

describe("UseCart", () => {
  beforeEach(() => {
    getCartMock.mockReset();
  });

  it("does not fetch the cart when disabled", () => {
    renderHook(() => UseCart({ enabled: false }), {
      wrapper: createWrapper(),
    });

    expect(getCartMock).not.toHaveBeenCalled();
  });

  it("fetches the cart when enabled", async () => {
    getCartMock.mockResolvedValue({
      items: [],
      totalPriceInCents: 0,
    });

    renderHook(() => UseCart({ enabled: true }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(getCartMock).toHaveBeenCalledTimes(1);
    });
  });
});
