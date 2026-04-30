import { expect, test } from "@playwright/test";

test("authentication page renders both auth entry points", async ({ page }) => {
  await page.goto("/authentication");

  await expect(page.getByRole("tab", { name: "Entrar" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Criar Conta" })).toBeVisible();
});

test("checkout cancel page renders a recovery action", async ({ page }) => {
  await page.goto("/checkout/cancel");

  await expect(page.getByText("Pagamento não realizado")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Voltar ao carrinho" }),
  ).toBeVisible();
});

test("home renders for visitors without a persisted cart", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Mais Vendidos")).toBeVisible();
  await expect(page.getByAltText("Logo")).toBeVisible();
});
