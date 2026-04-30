import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mutateAsyncMock,
  createCheckoutSessionMock,
  redirectToCheckoutMock,
  loadStripeMock,
} = vi.hoisted(() => ({
  mutateAsyncMock: vi.fn(),
  createCheckoutSessionMock: vi.fn(),
  redirectToCheckoutMock: vi.fn(),
  loadStripeMock: vi.fn(),
}));

vi.mock("@stripe/stripe-js", () => ({
  loadStripe: loadStripeMock,
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("@/hooks/mutations/useFinishOrder", () => ({
  useFinishOrder: () => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
  }),
}));

vi.mock("@/actions/createCheckoutSession", () => ({
  createCheckoutSession: createCheckoutSessionMock,
}));

import FinishOrderButton from "@/app/cart/confirmation/components/finishOrderbutton";

describe("FinishOrderButton", () => {
  beforeEach(() => {
    mutateAsyncMock.mockReset();
    createCheckoutSessionMock.mockReset();
    redirectToCheckoutMock.mockReset();
    loadStripeMock.mockReset();
  });

  it("creates the checkout session using only the order id", async () => {
    mutateAsyncMock.mockResolvedValue({
      orderId: "order-1",
    });
    createCheckoutSessionMock.mockResolvedValue({
      id: "cs_test_123",
    });
    loadStripeMock.mockResolvedValue({
      redirectToCheckout: redirectToCheckoutMock,
    });

    render(<FinishOrderButton />);

    fireEvent.click(screen.getByRole("button", { name: "Finalizar compra" }));

    await waitFor(() => {
      expect(createCheckoutSessionMock).toHaveBeenCalledWith({
        orderId: "order-1",
      });
    });
    expect(redirectToCheckoutMock).toHaveBeenCalledWith({
      sessionId: "cs_test_123",
    });
  });
});
