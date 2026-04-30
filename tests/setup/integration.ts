import { beforeEach, vi } from "vitest";

beforeEach(() => {
  process.env.DATABASE_URL = "postgres://test:test@localhost:5432/ecommerce";
  process.env.GOOGLE_CLIENT_ID = "google-client-id";
  process.env.GOOGLE_CLIENT_SECRET = "google-client-secret";
  process.env.STRIPE_SECRET_KEY = "sk_test_123";
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_test_123";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
  process.env.NEXT_PUBLIC_APP_URL = "http://127.0.0.1:3000";
  vi.clearAllMocks();
});
