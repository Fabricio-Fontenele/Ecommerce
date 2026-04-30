import { headers } from "next/headers";

import { ACTION_ERROR_MESSAGES } from "@/lib/actionErrors";
import { auth } from "@/lib/auth";

export const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
};

export const getRequiredSession = async () => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error(ACTION_ERROR_MESSAGES.unauthorized);
  }

  return session;
};
