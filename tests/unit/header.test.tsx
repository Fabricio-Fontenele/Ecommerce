import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { useSessionMock, cartMock } = vi.hoisted(() => ({
  useSessionMock: vi.fn(),
  cartMock: vi.fn(),
}));

vi.mock("@/lib/authClient", () => ({
  authClient: {
    useSession: useSessionMock,
    signOut: vi.fn(),
  },
}));

vi.mock("@/components/common/cart", () => ({
  default: ({ enabled }: { enabled?: boolean }) => {
    cartMock(enabled);
    return React.createElement("div", null, "Cart mock");
  },
}));

import Header from "@/components/common/header";

describe("Header", () => {
  beforeEach(() => {
    useSessionMock.mockReset();
    cartMock.mockReset();
  });

  it("passes disabled cart fetching for anonymous users", () => {
    useSessionMock.mockReturnValue({
      data: null,
    });

    render(<Header />);

    expect(cartMock).toHaveBeenCalledWith(false);
  });

  it("renders a safe avatar fallback for empty names", () => {
    useSessionMock.mockReturnValue({
      data: {
        user: {
          name: "   ",
          email: "user@example.com",
          image: null,
        },
      },
    });

    render(<Header />);
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("U")).toBeInTheDocument();
    expect(screen.getByText("Usuário")).toBeInTheDocument();
  });
});
