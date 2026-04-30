import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  currentCartData,
  mutateAsyncMock,
  pushMock,
  toastErrorMock,
  toastSuccessMock,
} = vi.hoisted(() => ({
  currentCartData: {
    shippingAddress: {
      id: "address-1",
    },
  } as { shippingAddress: { id: string } | null },
  pushMock: vi.fn(),
  toastErrorMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  mutateAsyncMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("sonner", () => ({
  toast: {
    error: toastErrorMock,
    success: toastSuccessMock,
  },
}));

vi.mock("@/hooks/mutations/useUpdateCartShippingAddress", () => ({
  useUpdateCartShippingAddress: () => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
  }),
}));

vi.mock("@/hooks/queries/useShippingAddresses", () => ({
  useShippingAddresses: () => ({
    data: [
      {
        id: "address-1",
        recipientName: "Maria",
        street: "Rua A",
        number: "10",
        complement: null,
        neighborhood: "Centro",
        city: "Fortaleza",
        state: "CE",
        zipCode: "60000-000",
      },
    ],
    isLoading: false,
  }),
}));

vi.mock("@/hooks/queries/useCart", () => ({
  UseCart: () => ({
    data: currentCartData,
  }),
}));

vi.mock("@/app/cart/identification/components/addressForm", () => ({
  default: () => React.createElement("div", null, "Novo Endereco"),
}));

import Addresses from "@/app/cart/identification/components/addreses";

describe("Addresses", () => {
  beforeEach(() => {
    mutateAsyncMock.mockReset();
    pushMock.mockReset();
    toastErrorMock.mockReset();
    toastSuccessMock.mockReset();
    currentCartData.shippingAddress = {
      id: "address-1",
    };
  });

  it("updates the cart shipping address and navigates to confirmation", async () => {
    mutateAsyncMock.mockResolvedValue({ success: true });

    render(<Addresses />);

    fireEvent.click(
      screen.getByRole("button", { name: "Ir para o Pagamento" }),
    );

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        shippingAddressId: "address-1",
      });
      expect(pushMock).toHaveBeenCalledWith("/cart/confirmation");
    });
  });

  it("shows the new address form when the user chooses to add one", async () => {
    currentCartData.shippingAddress = null;

    render(
      <Addresses
        initialCart={{
          id: "cart-1",
          userId: "user-1",
          shippingAddressId: null,
          shippingAddress: null,
          createdAt: new Date(),
          items: [],
          totalPriceInCents: 0,
        }}
      />,
    );

    fireEvent.click(
      screen.getByRole("radio", { name: "Adicionar novo endereço" }),
    );

    await waitFor(() => {
      expect(screen.getByText("Novo Endereco")).toBeInTheDocument();
    });
  });
});
