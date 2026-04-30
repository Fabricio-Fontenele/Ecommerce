import { describe, expect, it } from "vitest";

import { formatAddress } from "@/app/cart/helpers/address";
import { formatCentsToBRL } from "@/helpers/money";
import { getUserInitials } from "@/lib/user";

describe("formatCentsToBRL", () => {
  it("formats cents into BRL", () => {
    expect(formatCentsToBRL(12345)).toBe("R$ 123,45");
  });
});

describe("formatAddress", () => {
  it("includes complement when present", () => {
    expect(
      formatAddress({
        recipientName: "Maria",
        street: "Rua das Flores",
        number: "123",
        complement: "Apto 45",
        neighborhood: "Centro",
        city: "Fortaleza",
        state: "CE",
        zipCode: "60000-000",
      }),
    ).toBe("Rua das Flores, 123, Apto 45, Centro, Fortaleza - CE, 60000-000");
  });

  it("omits complement when absent", () => {
    expect(
      formatAddress({
        recipientName: "Maria",
        street: "Rua das Flores",
        number: "123",
        complement: null,
        neighborhood: "Centro",
        city: "Fortaleza",
        state: "CE",
        zipCode: "60000-000",
      }),
    ).toBe("Rua das Flores, 123, Centro, Fortaleza - CE, 60000-000");
  });
});

describe("getUserInitials", () => {
  it("returns a safe fallback for empty names", () => {
    expect(getUserInitials("")).toBe("U");
    expect(getUserInitials("   ")).toBe("U");
    expect(getUserInitials(null)).toBe("U");
  });

  it("supports single-word and multi-word names", () => {
    expect(getUserInitials("Maria")).toBe("M");
    expect(getUserInitials("Maria Silva")).toBe("MS");
  });
});
