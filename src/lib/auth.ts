import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { getDb } from "@/db";
import * as schema from "@/db/schema";
import { env } from "@/lib/env";

const createAuth = () =>
  betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        enabled: true,
        clientId: env.googleClientId(),
        clientSecret: env.googleClientSecret(),
      },
    },
    database: drizzleAdapter(getDb(), {
      provider: "pg",
      schema,
    }),
    user: {
      modelName: "userTable",
    },
    session: {
      modelName: "sessionTable",
    },
    account: {
      modelName: "accountTable",
    },
    verification: {
      modelName: "verificationTable",
    },
  });

let authInstance: ReturnType<typeof createAuth> | undefined;

export const getAuth = () => {
  authInstance ??= createAuth();

  return authInstance;
};
