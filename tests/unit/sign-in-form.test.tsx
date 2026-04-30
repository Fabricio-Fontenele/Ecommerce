import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { pushMock, signInEmailMock, signInSocialMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  signInEmailMock: vi.fn(),
  signInSocialMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/lib/authClient", () => ({
  authClient: {
    signIn: {
      email: signInEmailMock,
      social: signInSocialMock,
    },
  },
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

import SignInForm from "@/app/authentication/components/signInForm";

describe("SignInForm", () => {
  beforeEach(() => {
    pushMock.mockReset();
    signInEmailMock.mockReset();
    signInSocialMock.mockReset();
  });

  it("submits credentials and redirects on success", async () => {
    signInEmailMock.mockImplementation(
      async ({ fetchOptions }: { fetchOptions: { onSuccess: () => void } }) => {
        fetchOptions.onSuccess();
      },
    );

    render(React.createElement(SignInForm));

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(signInEmailMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  it("starts the Google sign-in flow", async () => {
    render(React.createElement(SignInForm));

    fireEvent.click(screen.getByRole("button", { name: "Entrar com Google" }));

    await waitFor(() => {
      expect(signInSocialMock).toHaveBeenCalledWith({
        provider: "google",
      });
    });
  });
});
