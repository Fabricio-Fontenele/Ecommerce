const getRequiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
};

export const env = {
  databaseUrl: () => getRequiredEnv("DATABASE_URL"),
  stripeSecretKey: () => getRequiredEnv("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: () => getRequiredEnv("STRIPE_WEBHOOK_SECRET"),
  stripePublishableKey: () =>
    getRequiredEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
  appUrl: () => getRequiredEnv("NEXT_PUBLIC_APP_URL"),
  googleClientId: () => getRequiredEnv("GOOGLE_CLIENT_ID"),
  googleClientSecret: () => getRequiredEnv("GOOGLE_CLIENT_SECRET"),
};
